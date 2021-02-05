'use strict';
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then

// #############################################################################

const { Given, When, Then } = require('cucumber');

// #### Given steps ############################################################

Given(
    /^(?:I|user) (?:go|goes) to URL "([^"]*)?"$/,
    async function (url) {
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

// #### When steps #############################################################

// #### Then steps #############################################################

Then(
    /the title should be "([^"]*)"$/,
    async function (expectedTitle) {
        /**
         * The title of the current browser window
         * @type {String}
         */
        const title = await browser.getTitle();

        await expect(title).toEqual(
            expectedTitle,
            `Expected title to be "${expectedTitle}" but found "${title}"`
        );
    }
);
