'use strict';
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then

// #############################################################################

const path = require('path');
const { Given, When, Then } = require('cucumber');
const { readDirectories, createRequest } = require('js-automation-tools');

const spacesToIndent = 4;

const isCalledExternally = __dirname.includes('node_modules');

const pageObjectsFolderPathes = 'PO_FOLDER_PATH' in process.env ?
    process.env.PO_FOLDER_PATH.replace(/\s+/g, '').split(',') :
    [path.join('tests', 'page-objects')];

const fullPageObjectsFolderPathes = isCalledExternally ?
    pageObjectsFolderPathes.map((pageObjectsFolderPath) => {
        return path.join(__dirname, '..', '..', pageObjectsFolderPath)
    }) :
    pageObjectsFolderPathes.map((pageObjectsFolderPath) => {
        return path.join(__dirname, pageObjectsFolderPath)
    });

// Require all Page Object files in directory
let pageObjects = {};

/**
 * Requires Page Object files
 * @returns {Array} allRequiredPageObjects
 */
async function requirePageObjects () {
    const allPageObjectFiles = await readDirectories(
        fullPageObjectsFolderPathes);
    const allRequiredPageObjects = allPageObjectFiles.filter(
        (value) => {
            return value.includes('.js');
        }
    ).map((file) => {
        const fileName = path.basename(file, '.js');

        pageObjects[fileName] = require(file);

        return file;
    });

    console.log(
        '\nPage Objects from PO_FOLDER_PATH:',
        `\n${JSON.stringify(pageObjects, null, spacesToIndent)}\n\n`
    );

    return allRequiredPageObjects;
}

requirePageObjects();

/**
 * Parses cookie
 * @param {String} cookie name and value separated by "=" (for ex. "test=true")
 * @returns {Array} array with parsed cookie name and cookie value
 */
function parseCookie (cookie) {
    try {
        const cookieParsed = cookie.split('=').map((value) => {
            return value.replace(';', '');
        });

        return cookieParsed;
    } catch (error) {
        throw new Error('Problem with setting cookie for ' +
            `"${cookie}" - please set it as cookie name and ` +
            `value separated by "=" (for example "test=1"): ${error}`);
    }
}

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

Given(
    /^(?:I|user) (?:go|goes) to "([a-zA-Z0-9_-]+)"."([a-zA-Z0-9_-]+)"$/,
    async function (page, element) {
        await browser.url(pageObjects[page][element]);
    }
);

Given(
    /^(?:I|user) (?:go|goes) to ([a-zA-Z0-9_-]+) from ([a-zA-Z0-9_-]+)(?:| page)$/,
    async function (element, page) {
        await browser.url(pageObjects[page][element]);
    }
);

Given(
    /^(?:I|user) (?:set|sets) cookie "([^"]*)?"$/,
    async function (cookie) {
        const cookieParsed = parseCookie(cookie);

        try {
            await browser.setCookies({
                name: cookieParsed[0],
                value: cookieParsed[1]
                // The below options are optional
                // path: '/foo', // The cookie path. Defaults to "/"
                // domain: '.example.com', // The domain the cookie is visible to.
                // Defaults to the current browsing context’s active document’s URL domain
                // secure: true, // Whether the cookie is a secure cookie. Defaults to false
                // httpOnly: true, // Whether the cookie is an HTTP only cookie. Defaults to false
                // expiry: 1551393875 // When the cookie expires, specified in seconds since Unix Epoch
            });
        } catch (error) {
            throw new Error(`Problem with setting cookie for "${cookie}" ` +
                '- please set it as cookie name and value separated by "=" ' +
                `(for example "test=1"): ${error}`);
        }
    }
);

Given(
    /^(?:I|user) (?:set|sets) cookie "([a-zA-Z0-9_-]+)"."([a-zA-Z0-9_-]+)"$/,
    async function (page, element) {
        const cookieParsed = parseCookie(pageObjects[page][element]);

        try {
            await browser.setCookies({
                name: cookieParsed[0],
                value: cookieParsed[1]
            });
        } catch (error) {
            throw new Error('Problem with setting cookie for ' +
                `"${page}"."${element}" - please set it as cookie name and ` +
                `value separated by "=" (for example "test=1"): ${error}`);
        }
    }
);

Given(
    /^(?:I|user) (?:set|sets) cookie ([a-zA-Z0-9_-]+) from ([a-zA-Z0-9_-]+)(?:| page)$/,
    async function (element, page) {
        const cookieParsed = parseCookie(pageObjects[page][element]);

        try {
            await browser.setCookies({
                name: cookieParsed[0],
                value: cookieParsed[1]
            });
        } catch (error) {
            throw new Error('Problem with setting cookie for ' +
                `"${page}"."${element}" - please set it as cookie name and ` +
                `value separated by "=" (for example "test=1"): ${error}`);
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
