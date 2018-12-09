let browser;
// Loading the needed dependencies
const https = require('https');
const _id = require('shortid');
const fs = require('fs');

// Configuration files -- For organization
const pinterest = require('../config/pinterest');

require('../browser')().then((b) => {
    browser = b;
}).catch(err => console.log(err));

const baseUrl = pinterest.defaultQueryString;
const blockedResources = pinterest.blockedResources;

/* Setting a new method to the String prototype
To check if there is any invalid character on the user query */
String.prototype.isValid = function() {
    // TODO: Improve
    return !!this || typeof this === 'string' ? true : false;
}

// Function to download a file (of any type) through a HTTPS request
const download  = (url, destination) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    https.get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
            file.close( resolve(true));
        });
    })
    .on('error', error => {
        fs.unlink(destination);
        reject(error.message);
    });
});

// Self explanatory
const getRandomImage = (images) => {
    return images[Math.floor(Math.random() * images.length)];
}

// Function that returns a set of images from any specified website
// NOTE: A LOT! of await requests as we pass through the headless browser commands
// So that's gonna take a while -- Looking for some ways to improve the request's speed.

const searchForImages = async (url) => {
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

/* Setting up an array of routes that are gonna be used
In our main index.js file to set up the fastify routes and documentation */
const routes = [
    {
        method: 'GET',
        url: '/images/:query',
        schema: {
            queryString: {
                query: { type: 'string' }
            },
            params: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'Parâmetro de busca da imagem.'
                    }
                }
            },
            response: {
                200: {
                    description: 'Sucesso da requisição.',
                    type: 'object',
                    properties: {
                        image: {
                            type: 'string'
                        }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            const { query: imageQuery } = request.params;
            
            if(imageQuery.isValid()) {

                const image = getRandomImage(await searchForImages(baseUrl + imageQuery));

                reply
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ image });
            } else {
                reply
                    .code(403)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ error: 'Não deixe o campo de pesquisa em branco.' });
            } // else
        } // handler
    }, // object
    {
        method: 'GET',
        url: '/images/:query/download',
        schema: {
            queryString: {
                query: { type: 'string' }
            },
            params: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'Parâmetro de busca da imagem.'
                    }
                }
            },
            response: {
                200: {
                    description: 'Download da imagem realizado com sucesso.',
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string'
                        }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            const { query: imageQuery } = request.params;

            if(imageQuery.isValid()) {
                let downloaded = undefined;
                let filename = `${imageQuery}-${_id.generate()}`

                const image = getRandomImage(await searchForImages(baseUrl + imageQuery));

                downloaded = await download(image, `./downloads/${filename}.jpg`);

                if(downloaded) {
                    reply
                        .code(200)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({ status: 'Imagem baixada com sucesso.' });
                } else {
                    reply
                        .code(403)
                        .header('Content-Type', 'application/json; charset=utf-8')
                        .send({ error: 'Não foi possível baixar a imagem' });
                }
            } else {
                reply
                    .code(403)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ error: 'Não deixe o campo de pesquisa em branco.' });
            } // else
        } // handler
    } // object
] // array

module.exports = routes;