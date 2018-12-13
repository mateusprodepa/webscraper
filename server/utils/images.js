let browser;

require('../browser')().then((b) => {
    browser = b;
}).catch(err => console.log(err));

const pinterest = require('../config/pinterest');
const blockedResources = pinterest.blockedResources;

exports.getRandomImage = (images) => {
    return images[Math.floor(Math.random() * images.length)];
}

exports.searchForImages = async (url) => {
    let images = [];

    const page = await browser.newPage();
    const { viewport } = require('../config/chromium');

    await page.setViewport(viewport);
    await page.setRequestInterception(true);

    // Uncomment only for debugging purposes.
    // await page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    /* We're actually just ignoring all the CSS from the page
    To improve the load speed. -- That reduces the load time for about 10 seconds
    In a 1920 x 1080 viewport browser returning about 30 images per request
    In a connection of 890 kbp/s or so... */

    page.on('request', (request) => {
        const requestUrl = request.url();
        const resourceType = request.resourceType();

        if(requestUrl.includes('https://i.pinimg.com/236x')) {
            images.push(requestUrl);
        }

        if(blockedResources.indexOf(resourceType) != -1) {
            request.abort();
        } else {
            request.continue();
        }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForNavigation({waitUntil: 'domcontentloaded'})
    // const images = await page.evaluate(() => {
    //     return Array.from(document.images, e => e.src)
    // });

    await page.close();

    return images;
}
