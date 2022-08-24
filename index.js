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
    Given = require('@cucumber/cucumber').Given;
    When = require('@cucumber/cucumber').When;
    Then = require('@cucumber/cucumber').Then;
} catch (error) {
    console.log('Using older version of cucumber (< 7)');
    Given = require('cucumber').Given;
    When = require('cucumber').When;
    Then = require('cucumber').Then;
}

const spacesToIndent = 4;

const isCalledExternally = __dirname.includes('node_modules');

const pageObjectsFolderPathes = 'PO_FOLDER_PATH' in process.env ?
    process.env.PO_FOLDER_PATH.replace(/\s+/g, '').split(',') :
    [path.join('tests', 'page-objects')];

const fullPageObjectsFolderPathes = isCalledExternally ?
    pageObjectsFolderPathes.map((pageObjectsFolderPath) => {
        return path.join(__dirname, '..', '..', pageObjectsFolderPath);
    }) :
    pageObjectsFolderPathes.map((pageObjectsFolderPath) => {
        return path.join(__dirname, pageObjectsFolderPath);
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
 * Gets proper data for further actions
 * @param {String} page
 * @param {String} elem
 * @returns {Object} data
 */
async function getData (page, elem) {
    const data = pageObjects[page][elem];

    if (!data) {
        throw new ReferenceError(`${errors.DATA_NOT_DEFINED} "${page}"."${elem}"`);
    }

    return data;
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

/**
 * Sets path to the file for uploading
 * @param {String} pathToFile - path (relative to the project root folder)
 * @param {Object} inputFileUpload - element
 */
async function setPathToFile (pathToFile, inputFileUpload) {
    const pathToFileFull = path.join(__dirname, pathToFile);

    await browser.executeAsync(
        // Assign style to elem in the browser
        (elem, done) => {
            elem.style.display = 'block';
            return done(elem.style.display);
        },
        // Pass in element so we don't need to query it again in the browser
        inputFileUpload
    );

    await inputFileUpload.waitForDisplayed();

    await inputFileUpload.setValue(pathToFileFull);
}

/**
 * Gets URL of the current page
 * @returns {String} URL
 */
async function getCurrentPageUrl () {
    try {
        const pageUrl = await browser.getUrl();

        return pageUrl;
    } catch (error) {
        throw new Error(`${errors.NO_URL} ${error}`);
    }
}

/**
 * Replaces all substrings in a string
 * @param {String} string - string to change
 * @param {Object} mapObject - object with substrings to replace in keys and replace values in values
 * @returns {String} new string
 */
function replaceMultipleSubstrings (string, mapObject) {
    let regularExpression = new RegExp(Object.keys(mapObject).join('|'), 'gi');

    return string.replace(regularExpression, function (matched) {
        return mapObject[matched.toLowerCase()];
    });
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
        const url = await getData(page, element);

        await browser.url(url);
    }
);

Given(
    'I/user go(es) to {word} from {word}( page)',
    async function (element, page) {
        const url = await getData(page, element);

        await browser.url(url);
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
        const cookie = await getData(page, element);
        const cookieParsed = parseCookie(cookie);

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
        const cookie = await getData(page, element);
        const cookieParsed = parseCookie(cookie);

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
        const body = await getData(page, element);

        await createRequest(method, reqUrl, '', body);
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {string}.{string} with body ' +
        '{string}.{string}',
    async function (method, page1, element1, page2, element2) {
        const reqUrl = await getData(page1, element1);
        const body = await getData(page2, element2);

        await createRequest(
            method,
            reqUrl,
            '',
            body
        );
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {word} from {word}( page) with ' +
        'body {word} from {word}( page)',
    async function (method, element1, page1, element2, page2) {
        const reqUrl = await getData(page1, element1);
        const body = await getData(page2, element2);

        await createRequest(
            method,
            reqUrl,
            '',
            body
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
        const headers = await getData(page1, element1);
        const body = await getData(page2, element2);

        await createRequest(
            method,
            reqUrl,
            headers,
            body
        );
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {string}.{string} with headers' +
        ' {string}.{string} and body {string}.{string}',
    // eslint-disable-next-line
    async function (method, page1, element1, page2, element2, page3, element3) {
        const reqUrl = await getData(page1, element1);
        const headers = await getData(page2, element2);
        const body = await getData(page3, element3);

        await createRequest(
            method,
            reqUrl,
            headers,
            body
        );
    }
);

Given(
    // eslint-disable-next-line
    'I/user send(s) {string} request to {word} from {word}( page) with ' +
        'headers {word} from {word}( page) and body {word} from {word}( page)',
    // eslint-disable-next-line
    async function (method, element1, page1, element2, page2, element3, page3) {
        const reqUrl = await getData(page1, element1);
        const headers = await getData(page2, element2);
        const body = await getData(page3, element3);

        await createRequest(
            method,
            reqUrl,
            headers,
            body
        );
    }
);

// #### When steps #############################################################

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with l: {string} in {string}.{string} and ' +
    'p: {string} in {string}.{string} and click(s) {string}.{string}',
    // eslint-disable-next-line max-params
    async function (
        login, page1, element1, password, page2, element2, page3, element3
    ) {
        const inputLogin = await getElement(page1, element1);
        const inputPassword = await getElement(page2, element2);
        const buttonLogin = await getElement(page3, element3);

        await waitForElement(inputPassword);
        await inputLogin.addValue(login);
        await inputPassword.addValue(password);
        await buttonLogin.click();
    }
);

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with l: {string} in {word} from {word}( page) and ' +
    'p: {string} in {word} from {word}( page) and click(s) ' +
    '{word} from {word}( page)',
    // eslint-disable-next-line max-params
    async function (
        login, element1, page1, password, element2, page2, element3, page3
    ) {
        const inputLogin = await getElement(page1, element1);
        const inputPassword = await getElement(page2, element2);
        const buttonLogin = await getElement(page3, element3);

        await waitForElement(inputPassword);
        await inputLogin.addValue(login);
        await inputPassword.addValue(password);
        await buttonLogin.click();
    }
);

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with l: {string}.{string} in {string}.{string} and ' +
    'p: {string}.{string} in {string}.{string} and click(s) {string}.{string}',
    // eslint-disable-next-line max-params
    async function (
        page1,
        element1,
        page2,
        element2,
        page3,
        element3,
        page4,
        element4,
        page5,
        element5
    ) {
        const login = await getData(page1, element1);
        const inputLogin = await getElement(page2, element2);
        const password = await getData(page3, element3);
        const inputPassword = await getElement(page4, element4);
        const buttonLogin = await getElement(page5, element5);

        await waitForElement(inputPassword);
        await inputLogin.addValue(login);
        await inputPassword.addValue(password);
        await buttonLogin.click();
    }
);

When(
    // eslint-disable-next-line cucumber/expression-type
    'I/user log(s) in with l: {word} from {word}( page) in {word} from {word}( page) and ' +
    'p: {word} from {word}( page) in {word} from {word}( page) and click(s) ' +
    '{word} from {word}( page)',
    // eslint-disable-next-line max-params
    async function (
        element1,
        page1,
        element2,
        page2,
        element3,
        page3,
        element4,
        page4,
        element5,
        page5
    ) {
        const login = await getData(page1, element1);
        const inputLogin = await getElement(page2, element2);
        const password = await getData(page3, element3);
        const inputPassword = await getElement(page4, element4);
        const buttonLogin = await getElement(page5, element5);

        await waitForElement(inputPassword);
        await inputLogin.addValue(login);
        await inputPassword.addValue(password);
        await buttonLogin.click();
    }
);

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

When('I/user wait(s) for {int} ms', async function (timeToWait) {
    await browser.pause(timeToWait);
});

When('I/user wait(s) and click(s) {string}.{string}', async function (
    page, element
) {
    const elem = await getElement(page, element);
    const timeToWait = 300;

    try {
        await browser.pause(timeToWait);
        await elem.click();
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}"
            ${JSON.stringify(error, null, spacesToIndent)}`);
    }
});

When('I/user wait(s) and click(s) {word} from {word}( page)', async function (
    element, page
) {
    const elem = await getElement(page, element);
    const timeToWait = 300;

    try {
        await browser.pause(timeToWait);
        await elem.click();
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}"
            ${JSON.stringify(error, null, spacesToIndent)}`);
    }
});

When('I/user wait(s) up to {int} ms for {string}.{string} to appear', async function (
    timeToWait, page, element
) {
    const elem = await getElement(page, element);

    await elem.waitForExist({
        timeout: timeToWait,
        timeoutMsg: `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}" up to ${timeToWait} ms`
    });

});

When('I/user wait(s) up to {int} ms for {word} from {word}( page) to appear', async function (
    timeToWait, element, page
) {
    const elem = await getElement(page, element);

    await elem.waitForExist({
        timeout: timeToWait,
        timeoutMsg: `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}" up to ${timeToWait} ms`
    });
});

When('I/user click(s) {string}.{string} if present', async function (
    page, element
) {
    const elem = await getElement(page, element);
    const isPresent = await elem.isExisting();

    if (isPresent) {
        // Click only if element is present
        await elem.click();
    }
});

When('I/user click(s) {word} from {word}( page) if present', async function (
    element, page
) {
    const elem = await getElement(page, element);
    const isPresent = await elem.isExisting();

    if (isPresent) {
        // Click only if element is present
        await elem.click();
    }
});

When('I/user double click(s) {string}.{string}', async function (
    page, element
) {
    const elem = await getElement(page, element);

    try {
        await waitForElement(elem);
        await elem.doubleClick();
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}"
            ${JSON.stringify(error, null, spacesToIndent)}`);
    }
});

When('I/user double click(s) {word} from {word}( page)', async function (
    element, page
) {
    const elem = await getElement(page, element);

    try {
        await waitForElement(elem);
        await elem.doubleClick();
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}"
            ${JSON.stringify(error, null, spacesToIndent)}`);
    }
});

When('I/user type(s) {string} in {string}.{string}', async function (
    text, page, element
) {
    const elem = await getElement(page, element);

    await elem.addValue(text);
});

When('I/user type(s) {string} in {word} from {word}( page)', async function (
    text, element, page
) {
    const elem = await getElement(page, element);

    await elem.addValue(text);
});

When('I/user type(s) {string}.{string} in {string}.{string}', async function (
    page1, element1, page2, element2
) {
    const text = await getData(page1, element1);
    const elem = await getElement(page2, element2);

    await elem.addValue(text);
});

When(
    'I/user type(s) {word} from {word}( page) in {word} from {word}( page)',
    async function (element1, page1, element2, page2) {
        const text = await getData(page1, element1);
        const elem = await getElement(page2, element2);

        await elem.addValue(text);
    }
);

When('I/user clear(s) {string}.{string} and type(s) {string}', async function (
    page, element, text
) {
    const elem = await getElement(page, element);

    await elem.setValue(text);
});

When(
    'I/user clear(s) {word} from {word}( page) and type(s) {string}',
    async function (element, page, text) {
        const elem = await getElement(page, element);

        await elem.setValue(text);
    }
);

When(
    'I/user clear(s) {string}.{string} and type(s) {string}.{string}',
    async function (page1, element1, page2, element2) {
        const elem = await getElement(page1, element1);
        const text = await getData(page2, element2);

        await elem.setValue(text);
    }
);

When(
    'I/user clear(s) {word} from {word}( page) and type(s) {word} from {word}( page)',
    async function (element1, page1, element2, page2) {
        const elem = await getElement(page1, element1);
        const text = await getData(page2, element2);

        await elem.setValue(text);
    }
);

When('I/user select(s) {string} in {string}.{string}', async function (
    text, page, element
) {
    const dropdown = await getElement(page, element);

    try {
        await dropdown.selectByVisibleText(text);
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}"
            ${JSON.stringify(error, null, spacesToIndent)}`);
    }
});

When('I/user select(s) {string} in {word} from {word}( page)', async function (
    text, element, page
) {
    const dropdown = await getElement(page, element);

    try {
        await dropdown.selectByVisibleText(text);
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page}"."${element}"
            ${JSON.stringify(error, null, spacesToIndent)}`);
    }
});

When('I/user select(s) {string}.{string} in {string}.{string}', async function (
    page1, element1, page2, element2
) {
    const text = await getData(page1, element1);
    const dropdown = await getElement(page2, element2);

    try {
        await dropdown.selectByVisibleText(text);
    } catch (error) {
        throw new Error(`${errors.NO_ELEMENT} "${page2}"."${element2}"
            ${JSON.stringify(error, null, spacesToIndent)}`);
    }
});

When(
    'I/user select(s) {word} from {word}( page) in {word} from {word}( page)',
    async function (element1, page1, element2, page2) {
        const text = await getData(page1, element1);
        const dropdown = await getElement(page2, element2);

        try {
            await dropdown.selectByVisibleText(text);
        } catch (error) {
            throw new Error(`${errors.NO_ELEMENT} "${page2}"."${element2}"
                ${JSON.stringify(error, null, spacesToIndent)}`);
        }
    }
);

When(
    'I/user move(s) to {string}.{string}',
    async function (page, element) {
        const elem = await getElement(page, element);

        await elem.moveTo();
    }
);

When(
    'I/user move(s) to {word} from {word}( page)',
    async function (element, page) {
        const elem = await getElement(page, element);

        await elem.moveTo();
    }
);

When(
    'I/user move(s) to {string}.{string} with an offset of x: {int}px, y: {int}px',
    async function (page, element, offsetX, offsetY) {
        const elem = await getElement(page, element);

        await elem.moveTo({ xOffset: offsetX, yOffset: offsetY });
    }
);

When(
    'I/user move(s) to {word} from {word}( page) with an offset of x: {int}px, y: {int}px',
    async function (element, page, offsetX, offsetY) {
        const elem = await getElement(page, element);

        await elem.moveTo({ xOffset: offsetX, yOffset: offsetY });
    }
);

When('I/user switch(es) to {string}.{string} frame', async function (
    page, element
) {
    const elem = await getElement(page, element);

    await browser.switchToFrame(elem);
});

When('I/user switch(es) to {word} frame from {word}( page)', async function (
    element, page
) {
    const elem = await getElement(page, element);

    await browser.switchToFrame(elem);
});

When(
    'I/user wait(s) up to {int} ms and switch(es) to {string}.{string} frame',
    async function (
        timeToWait, page, element
    ) {
        const elem = await getElement(page, element);

        await elem.waitForExist({
            timeout: timeToWait,
            timeoutMsg: `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}" up to ${timeToWait} ms`
        });
        await browser.switchToFrame(elem);
    }
);

When(
    'I/user wait(s) up to {int} ms and switch(es) to {word} frame from {word}( page)',
    async function (
        timeToWait, element, page
    ) {
        const elem = await getElement(page, element);

        await elem.waitForExist({
            timeout: timeToWait,
            timeoutMsg: `${errors.ELEMENT_NOT_PRESENT} "${page}"."${element}" up to ${timeToWait} ms`
        });
        await browser.switchToFrame(elem);
    }
);

When('I/user switch(es) to main frame', async function () {
    await browser.switchToParentFrame();
});

When('I/user set(s) {string} file path in {string}.{string}', async function (
    pathToFile, page, element
) {
    const inputFileUpload = await getElement(page, element);

    await setPathToFile(pathToFile, inputFileUpload);
});

When('I/user set(s) {string} file path in {word} from {word}( page)', async function (
    pathToFile, element, page
) {
    const inputFileUpload = await getElement(page, element);

    await setPathToFile(pathToFile, inputFileUpload);
});

When(
    'I/user set(s) {string}.{string} file path in {string}.{string}',
    async function (page1, element1, page2, element2) {
        const pathToFile = await getData(page1, element1);
        const inputFileUpload = await getElement(page2, element2);

        await setPathToFile(pathToFile, inputFileUpload);
    }
);

When(
    'I/user set(s) {word} from {word}( page) file path in {word} from {word}( page)',
    async function (element1, page1, element2, page2) {
        const pathToFile = await getData(page1, element1);
        const inputFileUpload = await getElement(page2, element2);

        await setPathToFile(pathToFile, inputFileUpload);
    }
);

When('I/user execute(s) {string}.{string} function', async function (
    page, element
) {
    const functionToExecute = await getData(page, element);

    await browser.execute(functionToExecute);
});

When('I/user execute(s) {word} function from {word}( page)', async function (
    element, page
) {
    const functionToExecute = await getData(page, element);

    await browser.execute(functionToExecute);
});

When(
    'I/user drag(s)-and-drop(s) {string}.{string} to {string}.{string}',
    async function (
        page1, element1, page2, element2
    ) {
        const elemToDrag = getElement(page1, element1);
        const elemToDropTo = getElement(page2, element2);

        await elemToDrag.dragAndDrop(elemToDropTo);
    }
);

When(
    'I/user drag(s)-and-drop(s) {word} from {word}( page) to {word} from {word}( page)',
    async function (
        element1, page1, element2, page2
    ) {
        const elemToDrag = getElement(page1, element1);
        const elemToDropTo = getElement(page2, element2);

        await elemToDrag.dragAndDrop(elemToDropTo);
    }
);

When('I/user accept(s) browser alert', async function () {
    await browser.acceptAlert();
});

When('I/user dismiss(es) browser alert', async function () {
    await browser.dismissAlert();
});

When(
    'I/user open(s) {string} in new browser window',
    async function (url) {
        const window = await browser.createWindow('tab');

        await browser.switchToWindow(window.handle);
        await browser.navigateTo(url);
    }
);

When(
    'I/user open(s) {string}.{string} in new browser window',
    async function (page, element) {
        const url = await getData(page, element);
        const window = await browser.createWindow('tab');

        await browser.switchToWindow(window.handle);
        await browser.navigateTo(url);
    }
);

When(
    'I/user open(s) {word} from {word}( page) in new browser window',
    async function (element, page) {
        const url = await getData(page, element);
        const window = await browser.createWindow('tab');

        await browser.switchToWindow(window.handle);
        await browser.navigateTo(url);
    }
);

When('I/user close(s) current browser window', async function () {
    await browser.closeWindow();
});

When('I/user press(es) {string}', async function (text) {
    const keys = text.split(' ');

    await browser.keys(keys);
});

When('I/user set(s) PAGE_URL environment variable', async function () {
    process.env.PAGE_URL = await getCurrentPageUrl();

    console.log(`process.env.PAGE_URL: ${process.env.PAGE_URL}`);
});

When('I/user go(es) to PAGE_URL', async function () {
    await browser.navigateTo(process.env.PAGE_URL);
});

When('I/user debug(s)', async function () {
    await browser.debug();
});

// #### Then steps #############################################################

Then(
    'the title should be {string}',
    async function (text) {
        /**
         * The title of the current browser window
         * @type {String}
         */
        const title = await browser.getTitle();

        await expect(title).toEqual(
            text,
            replaceMultipleSubstrings(
                errors.TITLE_NOT_EQUAL,
                { '%text%': text, '%title%': title }
            )
        );
    }
);

Then('the title should contain {string}', async function (text) {
    const title = await browser.getTitle();

    await expect(title).toContain(
        text,
        replaceMultipleSubstrings(
            errors.TITLE_NOT_CONTAINS,
            { '%text%': text, '%title%': title }
        )
    );
});

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

Then('{int} {string}.{string} should be present', async function (
    number, page, element
) {
    const selector = await getData(page, element);
    const numberOfElements = await $$(selector);

    await expect(numberOfElements).toHaveLength(
        number,
        `${replaceMultipleSubstrings(
            errors.ELEMENTS_NUMBER_NOT_EQUAL,
            {
                '%number%': number,
                '%page%': page,
                '%element%': element
            }
        )} ${numberOfElements}`
    );
});

Then('{int} {word} from {word}( page) should be present', async function (
    number, element, page
) {
    const selector = await getData(page, element);
    const numberOfElements = await $$(selector);

    await expect(numberOfElements).toHaveLength(
        number,
        `${replaceMultipleSubstrings(
            errors.ELEMENTS_NUMBER_NOT_EQUAL,
            {
                '%number%': number,
                '%page%': page,
                '%element%': element
            }
        )} ${numberOfElements}`
    );
});

Then('{string}.{string} should not be present', async function (
    page, element
) {
    const selector = await getData(page, element);
    const numberOfElements = await $$(selector);

    await expect(numberOfElements).toHaveLength(
        0, `${errors.ELEMENT_PRESENT} "${page}"."${element}"`
    );
});

Then('{word} from {word}( page) should not be present', async function (
    element, page
) {
    const selector = await getData(page, element);
    const numberOfElements = await $$(selector);

    await expect(numberOfElements).toHaveLength(
        0, `${errors.ELEMENT_PRESENT} "${page}"."${element}"`
    );
});

Then('{string}.{string} text should be {string}', async function (
    page, element, text
) {
    const elem = await getElement(page, element);

    await expect(elem).toHaveText(text);
});

Then('{word} from {word}( page) text should be {string}', async function (
    element, page, text
) {
    const elem = await getElement(page, element);

    await expect(elem).toHaveText(text);
});

Then('{string}.{string} text should be {string}.{string}', async function (
    page1, element1, page2, element2
) {
    const elem = await getElement(page1, element1);
    const text = await getData(page2, element2);

    await expect(elem).toHaveText(text);
});

Then(
    '{word} from {word}( page) text should be {word} from {word}( page)',
    async function (element1, page1, element2, page2) {
        const elem = await getElement(page1, element1);
        const text = await getData(page2, element2);

        await expect(elem).toHaveText(text);
    }
);

Then('{string}.{string} text should contain {string}', async function (
    page, element, text
) {
    const elem = await getElement(page, element);

    await expect(elem).toHaveTextContaining(text);
});

Then('{word} from {word}( page) text should contain {string}', async function (
    element, page, text
) {
    const elem = await getElement(page, element);

    await expect(elem).toHaveTextContaining(text);
});

Then('{string}.{string} text should contain {string}.{string}', async function (
    page1, element1, page2, element2
) {
    const elem = await getElement(page1, element1);
    const text = await getData(page2, element2);

    await expect(elem).toHaveTextContaining(text);
});

Then(
    '{word} from {word}( page) text should contain {word} from {word}( page)',
    async function (element1, page1, element2, page2) {
        const elem = await getElement(page1, element1);
        const text = await getData(page2, element2);

        await expect(elem).toHaveTextContaining(text);
    }
);

Then('URL should be {string}', async function (url) {
    await expect(browser).toHaveUrl(url);
});

Then('URL should be {string}.{string}', async function (page, element) {
    const url = await getData(page, element);

    await expect(browser).toHaveUrl(url);
});

Then('URL should be {word} from {word}( page)', async function (
    element, page
) {
    const url = await getData(page, element);

    await expect(browser).toHaveUrl(url);
});

Then('URL should contain {string}', async function (url) {
    await expect(browser).toHaveUrlContaining(url);
});

Then('URL should contain {string}.{string}', async function (
    page, element
) {
    const url = await getData(page, element);

    await expect(browser).toHaveUrlContaining(url);
});

Then('URL should contain {word} from {word}( page)', async function (
    element, page
) {
    const url = await getData(page, element);

    await expect(browser).toHaveUrlContaining(url);
});

Then('{string}.{string} attribute {string} should contain {string}',
    async function (page, element, attribute, attributeValue) {
        const elem = await getElement(page, element);

        await expect(elem).toHaveAttributeContaining(
            attribute,
            attributeValue,
            `${errors.ATTRIBUTE_NOT_INCLUDES} "${page}"."${element}" -> "${attribute}" to include "${attributeValue}"`
        );
    }
);

Then('{word} from {word}( page) attribute {string} should contain {string}',
    async function (element, page, attribute, attributeValue) {
        const elem = await getElement(page, element);

        await expect(elem).toHaveAttributeContaining(
            attribute,
            attributeValue,
            `${errors.ATTRIBUTE_NOT_INCLUDES} "${page}"."${element}" -> "${attribute}" to include "${attributeValue}"`
        );
    }
);

module.exports = {
    waitForElement: waitForElement
};
