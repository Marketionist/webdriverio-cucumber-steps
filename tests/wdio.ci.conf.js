'use strict';

let { config } = require('./wdio.conf.js');

config.capabilities = [{
    maxInstances: 5,
    browserName: 'chrome',
    'goog:chromeOptions': {
        ignoreDefaultArgs: ['--enable-automation'],
        args: [
            '--headless',
            '--disable-infobars',
            '--window-size=1280,800',
            '--no-sandbox',
            '--disable-gpu',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
        ]
    }
}];

exports.config = config;
