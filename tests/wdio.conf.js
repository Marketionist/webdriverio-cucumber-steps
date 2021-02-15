'use strict';

const path = require('path');
// Add testing server to provide pages for tests
let { nodeTestingServer } = require('node-testing-server');

// Settings for node testing server
nodeTestingServer.config = {
    hostname: 'localhost',
    port: 8001,
    logsEnabled: 0,
    pages: {
        '/test1.html': `<title>Test1 Page</title><a id="link-test2-page" href="
            http://localhost:8001/test2.html">Test2 page</a>
            <style>
                #block-menu {
                    width: 20%;
                    height: 20%;
                    z-index: 9999;
                    background-color: #FFD700;
                }
            </style>
            <script>
                window.onload = function () {
                    document.querySelector('h1').addEventListener("mouseover", function () {
                        document.getElementById("text-test").innerHTML = 'Test 1 sample text';
                    });
                    document.querySelector('h1').addEventListener("mouseout", function () {
                        document.getElementById("text-test").innerHTML = '';
                    });
                    document.querySelector('#button-menu-right-click').addEventListener("contextmenu", function () {
                        document.getElementById("text-test").innerHTML = '';
                        const blockMenuContainer = document.getElementById("block-menu-container");
                        const blockMenu = document.createElement('div');
                        blockMenu.setAttribute('id', 'block-menu');
                        blockMenu.innerHTML = 'Menu goes here...';
                        blockMenuContainer.insertBefore(blockMenu, blockMenuContainer.firstChild);
                    });
                }
            </script>
            <h1>Test1 page</h1>
            <p id="text-test"></p>
            <p>
                <label for="image">Upload image:</label>
                <input type="file" name="image" accept="image/png, .jpeg, .jpg, image/gif">
                <input type="submit" value="Upload">
            </p>
            <p id="block-menu-container">
                <button id="button-menu-right-click">Right click menu</button>
            </p>`,
        '/test2.html': `<title>Test2 Page</title>
            <script>
                window.onload = function () {
                    document.getElementById("login").addEventListener("click", function () {
                        document.getElementById("block-credentials").innerHTML = document
                            .getElementById("input-username").value + document
                            .getElementById("input-password").value;
                    });
                    document.getElementById("input-colors").addEventListener("input", function () {
                        document.getElementById("block-input-color").innerHTML = document
                            .getElementById("input-colors").value;
                    });
                    document.getElementById("dropdown-colors").addEventListener("change", function () {
                        document.getElementById("block-dropdown-color").innerHTML = document
                            .getElementById("dropdown-colors").value;
                    });
                }
            </script>
            <h1>Test2 page</h1>
            <p>Credentials are: <span id="block-credentials"></span></p>
            <form>
                Sign in:<br>
                <input id="input-username" type="text" name="input-username" placeholder="Username" value=""><br>
                <input id="input-password" type="password" name="input-password" placeholder="Password" value=""><br>
            </form>
            <button id="login">Sign in</button>
            <p>Typed in input color is: <span id="block-input-color"></span></p>
            <form>
                Colors:<br>
                <input id="input-colors" type="text" value=""><br>
                <input type="submit" value="Submit">
            </form>
            <p>Selected dropdown color is: <span id="block-dropdown-color"></span></p>
            <select id="dropdown-colors" name="colors">
                <option value="default color">Default color</option>
                <option value="black">Black</option>
                <option value="grey">Grey</option>
                <option value="white">White</option>
                <option value="red">Red</option>
                <option value="crimson">Crimson</option>
                <option value="magenta">Magenta</option>
                <option value="blue">Blue</option>
                <option value="aqua">Aqua</option>
                <option value="cyan">Cyan</option>
                <option value="indigo">Indigo</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="Gold">Gold</option>
                <option value="orange">Orange</option>
            </select>`,
        '/test-iframe.html': `<title>Test Page with iframe</title>
            <h1>Test page with iframe</h1>
            <iframe src="test1.html" id="iframe-test1" name="test iframe" width="400" height="300" align="left">
                <p>Your browser does not support iframes</p>
            </iframe>`,
        '/test-alert.html': `<title>Test Page with alert</title>
            <script>
                window.onload = function () {
                    document.getElementById("button-launch-alert").addEventListener("click", function () {
                        let alertStatus;
                        if (confirm("Accept (OK) or Dismiss (Cancel) - press a button!") == true) {
                            alertStatus = "Alert was accepted!";
                        } else {
                            alertStatus = "Alert was canceled!";
                        }
                        document.getElementById("block-alert-status").innerHTML = alertStatus;
                    });
                }
            </script>
            <h1>Test page with alert</h1>
            <button id="button-launch-alert">Launch alert</button>
            <p id="block-alert-status"></p>`,
        '/test-loader.html': `<title>Test Page with loader</title>
            <style>
                #loader {
                    width: 70%;
                    height: 70%;
                    position: fixed;
                    z-index: 9999;
                    background-color: #FFD700;
                }
            </style>
            <script>
                function insertAfter(referenceNode, newNode) {
                    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
                }
                function showLoader (idValue, timeToSpin = 5000) {
                    const blockLoader = document.createElement('div');
                    blockLoader.setAttribute('id', idValue);
                    document.body.insertBefore(blockLoader, document.body.firstChild);
                    setTimeout(function () {
                        document.getElementById(idValue).remove();
                    }, timeToSpin);
                }
                function showContentWithDelay (timeDelay = 5000) {
                    const title = document.querySelector('h1');
                    let blockContent = document.createElement('p');
                    blockContent.setAttribute('id', 'block-content');
                    blockContent.innerHTML = 'This is a test content on a page with loader';
                    setTimeout(function () {
                        insertAfter(title, blockContent);
                    }, timeDelay);
                }
                document.addEventListener('DOMContentLoaded', () => {
                    const timeout1 = 6000;
                    const timeout2 = 8000;
                    showLoader('loader', timeout1);
                    showContentWithDelay(timeout2);
                });
            </script>
            <h1>Test page with loader</h1>`
    }
};

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        path.join(__dirname, 'features', '**', '*.feature')
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5,
        //
        browserName: 'chrome',
        'goog:chromeOptions': {
            ignoreDefaultArgs: ['--enable-automation'],
            args: [
                '--disable-infobars',
                '--window-size=1280,800',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
            ]
        }
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'trace',
    outputDir: path.join(__dirname, 'logs'),
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service,
    //   @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: 'http://localhost:8080',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: [],
    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Whether or not retried specfiles should be retried immediately or deferred
    // to the end of the queue specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: ['spec'],
    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> module used for processing required features
        requireModule: [],
        // <boolean< Treat ambiguous definitions as errors
        failAmbiguousDefinitions: true,
        // <boolean> invoke formatters without executing steps
        // dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> Enable this config to treat undefined definitions as
        // warnings
        ignoreUndefinedDefinitions: false,
        // <string[]> ("extension:module") require files with the given
        // EXTENSION after requiring MODULE (repeatable)
        name: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <string[]> (file/dir) require files before executing features
        require: [
            path.join(__dirname, '..', 'index.js'),
            // './src/steps/given.js',
            // './src/steps/then.js',
            // './src/steps/when.js',
            // Or search a (sub)folder for JS files with a wildcard
            // works since version 1.1 of the wdio-cucumber-framework
            // './src/**/*.js',
        ],
        // <string> specify a custom snippet syntax
        snippetSyntax: undefined,
        // <boolean> fail if there are any undefined or pending steps
        strict: true,
        // <string> (expression) only execute the features or scenarios with
        // tags matching the expression, see
        // https://docs.cucumber.io/tag-expressions/
        tagExpression: 'not @Pending',
        // <boolean> add cucumber tags to feature or scenario name
        tagsInTitle: false,
        // <number> timeout for step definitions
        timeout: 20000,
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        // Start node testing server
        return nodeTestingServer.start();
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    beforeSuite: function (suite) {
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     * stepData and world are Cucumber framework specific
     */
    beforeHook: function (test, context/*, stepData, world*/) {
    },
    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
     * afterEach in Mocha)
     * stepData and world are Cucumber framework specific
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }/*, stepData, world*/) {
    },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test, context) {
    },
    //
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName command name
     * @param {Array} args arguments that command would receive
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Runs after a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) ends.
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    afterSuite: function (suite) {
    },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: function (exitCode, config, capabilities, results) {
        // Stop node testing server
        return Promise.resolve(nodeTestingServer.stop());
    },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    onReload: function (oldSessionId, newSessionId) {
    },
    //
    // Cucumber specific hooks
    beforeFeature: function (uri, feature, scenarios) {
    },
    beforeScenario: function (uri, feature, scenario, sourceLocation) {
    },
    beforeStep: function ({ uri, feature, step }, context) {
    },
    afterStep: function ({ uri, feature, step }, context, { error, result, duration, passed, retries }) {
    },
    afterScenario: function (uri, feature, scenario, result, sourceLocation) {
    },
    afterFeature: function (uri, feature, scenarios) {
    }
};
