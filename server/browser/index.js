const puppeteer = require('puppeteer');
const { log } = require('../utils/log');

module.exports = async () => {
    // Try turning headless to false if you wanna debug.
    const browser = await puppeteer.launch({ headless: true });
    return browser;
}
