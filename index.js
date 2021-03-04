'use strict';
/* eslint new-cap: 0 */ // --> OFF for Given, When, Then

// #############################################################################

const path = require('path');
const { readDirectories, createRequest } = require('js-automation-tools');
const errors = require('./utils/errors.js');
let Given;
let When;
let Then;

try {
    Given = require('cucumber').Given;
    When = require('cucumber').When;
    Then = require('cucumber').Then;
} catch (error) {
    console.log('Using \'@cucumber/cucumber\'');
    Given = require('@cucumber/cucumber').Given;
    When = require('@cucumber/cucumber').When;
    Then = require('@cucumber/cucumber').Then;
}

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
 * Gets proper element for further actions
 * @param {String} page
 * @param {String} elem
 * @returns {Object} element
 */
async function getElement (page, elem) {
    const locator = pageObjects[page][elem];

    try {
        const element = await $(locator);

        return element;
    } catch (error) {
        throw new ReferenceError(`${errors.SELECTOR_NOT_DEFINED} "${page}"."${elem}" ${error}`);
    }
}

/**
 * Waits for element before executing further actions
 * @param {Object} element
 * @returns {Object} element
 */
async function waitForElement (element) {
    try {
        // Wait for element to be displayed
        await element.waitForDisplayed();
        // Wait for element to be clickable
        await element.waitForClickable();
        // Scroll to specific element
        await element.scrollIntoView();

        return element;
    } catch (error) {
        throw new ReferenceError(
            `${errors.ELEMENT_NOT_DISPLAYED} ` +
                `${JSON.stringify(element.selector, null, spacesToIndent)}: ` +
                `${error}`
        );
    }
}

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
    'I/user go(es) to URL {string}',
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
    'I/user go(es) to {string}.{string}',
    async function (page, element) {
        await browser.url(pageObjects[page][element]);
    }
);

Given(
    'I/user go(es) to {word} from {word}( page)',
    async function (element, page) {
        await browser.url(pageObjects[page][element]);
    }
);

Given(
    'I/user set(s) cookie {string}',
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
    'I/user set(s) cookie {string}.{string}',
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
    'I/user set(s) cookie {word} from {word}( page)',
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

Given(
    'I/user print(s) cookies',
    async function () {
        const cookies = await browser.getCookies();

        console.log(`Cookies: ${JSON.stringify(cookies, null, spacesToIndent)}`);
    }
);

Given(
    'I/user send(s) {string} request to {string} with body {string}',
    async function (method, reqUrl, body) {
        await createRequest(method, reqUrl, '', body);
    }
);

Given(
    'I/user send(s) {string} request to {string} with body {string}.{string}',
    async function (method, reqUrl, page, element) {
        await createRequest(method, reqUrl, '', pageObjects[page][element]);
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {string}.{string} with body ' +
        '{string}.{string}',
    async function (method, page1, element1, page2, element2) {
        await createRequest(
            method,
            pageObjects[page1][element1],
            '',
            pageObjects[page2][element2]
        );
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {word} from {word}( page) with ' +
        'body {word} from {word}( page)',
    async function (method, element1, page1, element2, page2) {
        await createRequest(
            method,
            pageObjects[page1][element1],
            '',
            pageObjects[page2][element2]
        );
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {string} with headers {string} and ' +
        'body {string}',
    async function (method, reqUrl, headers, body) {
        await createRequest(method, reqUrl, headers, body);
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {string} with headers ' +
        '{string}.{string} and body {string}.{string}',
    // eslint-disable-next-line
    async function (method, reqUrl, page1, element1, page2, element2) {
        await createRequest(
            method,
            reqUrl,
            pageObjects[page1][element1],
            pageObjects[page2][element2]
        );
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {string}.{string} with headers' +
        ' {string}.{string} and body {string}.{string}',
    // eslint-disable-next-line
    async function (method, page1, element1, page2, element2, page3, element3) {
        await createRequest(
            method,
            pageObjects[page1][element1],
            pageObjects[page2][element2],
            pageObjects[page3][element3]
        );
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {word} from {word}( page) with ' +
        'headers {word} from {word}( page) and body {word} from {word}( page)',
    // eslint-disable-next-line
    async function (method, element1, page1, element2, page2, element3, page3) {
        await createRequest(
            method,
            pageObjects[page1][element1],
            pageObjects[page2][element2],
            pageObjects[page3][element3]
        );
    }
);

// #### When steps #############################################################

When('I/user reload(s) the page', async function () {
    await browser.refresh();
});

When('I/user click(s) {string}.{string}', async function (page, element) {
    const elem = await getElement(page, element);

    try {
        await waitForElement(elem);
        await elem.click();
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}": ${error}`);
    }
});

When(
    'I/user click(s) {word} from {word}( page)',
    async function (element, page) {
        const elem = await getElement(page, element);

        try {
            await waitForElement(elem);
            await elem.click();
        } catch (error) {
            throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}": ${error}`);
        }
    }
);

When('I/user right click(s) {string}.{string}', async function (page, element) {
    const elem = await getElement(page, element);

    try {
        await waitForElement(elem);
        await elem.click({ button: 'right' });
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}": ${error}`);
    }
});

When(
    'I/user right click(s) {word} from {word}( page)',
    async function (element, page) {
        const elem = await getElement(page, element);

        try {
            await waitForElement(elem);
            await elem.click({ button: 'right' });
        } catch (error) {
            throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}": ${error}`);
        }
    }
);

// #### Then steps #############################################################

Then(
    'the title should be {string}',
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

Then('{string}.{string} should be present', async function (page, element) {
    const elem = await getElement(page, element);

    await expect(elem).toBeDisplayed(
        `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}"`
    );
});

Then(
    '{word} from {word}( page) should be present',
    async function (element, page) {
        const elem = await getElement(page, element);

        await expect(elem).toBeDisplayed(
            `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}"`
        );
    }
);
