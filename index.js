'use strict';

// #############################################################################

const { Given, When, Then } = require('cucumber');

Given(
    /^(?:I|user) (?:go|goes) to URL "([^"]*)?"$/,
    async (url) => {
        /**
         * The URL to navigate to
         * @type {String}
         */        
        try {
            return await browser.url(url);
        } catch (err) {
            throw new Error(err);
        }
    }
);
