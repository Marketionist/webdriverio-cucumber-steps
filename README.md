# webdriverio-cucumber-steps
Cucumber steps (step definitions) written with WebdriverIO for end-to-end (e2e) tests

## Supported versions
<table>
    <thead>
        <tr>
            <th><a href="http://nodejs.org/" rel="nofollow" target="_blank">Node.js</a></th>
            <th><a href="https://github.com/webdriverio/webdriverio" rel="nofollow" target="_blank">WebdriverIO</a></th>
            <th><a href="https://github.com/cucumber/cucumber-js" rel="nofollow" target="_blank">Cucumber</a></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>12.x</td>
            <td rowspan=3>6.x</td>
            <td rowspan=3>5.x, 6.x</td>
        </tr>
        <tr>
            <td>13.x</td>
        </tr>
        <tr>
            <td>14.x</td>
        </tr>
    </tbody>
</table>

## Table of contents

* [Installation](#installation)
* [Importing steps and running tests](#importing-steps-and-running-tests)
* [List of predefined steps](#list-of-predefined-steps)
  * [Given steps](#given-steps)
  * [When steps](#when-steps)
  * [Then steps](#then-steps)
* [Contributing](#contributing)
* [Thanks](#thanks)

## Installation
If you want to start writing tests as fast as possible, here are the commands
you'll need to execute:
```
npm init --yes
npm install webdriverio-cucumber-steps @wdio/cli @wdio/cucumber-framework @wdio/local-runner @wdio/selenium-standalone-service @wdio/spec-reporter chromedriver wdio-chromedriver-service --save-dev
node node_modules/webdriverio-cucumber-steps/utils/prepare.js
```

Then just see the [list of predefined steps](#list-of-predefined-steps) and
start writing tests (in `tests/*.feature`) and adding Page Objects
(in `tests/page-objects/*.js`).

Run the tests with:
```
node_modules/.bin/wdio tests/wdio.conf.js
```

## Importing steps and running tests
To get access to all Cucumber steps defined in this package just add the
path to this package in `wdio.conf.js` configuration file inside `cucumberOpts`
in `require` (pathes to all external and internal step definitions should be
specified inside the array in `require`):
```
const path = require('path');

exports.config = {
    // ...
    specs: [
        path.join(__dirname, '**', '*.feature')
    ],
    // ...
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    // ...
    //
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // ...
        require: [
            path.join(__dirname, '..', 'node_modules', 'webdriverio-cucumber-steps', 'index.js'),
            // './src/steps/given.js',
            // './src/steps/then.js',
            // './src/steps/when.js',
            // Or search a (sub)folder for JS files with a wildcard
            // works since version 1.1 of the wdio-cucumber-framework
            // './src/**/*.js',
        ],
        // ...
```
and then launch tests with:
```
node_modules/.bin/wdio tests/wdio.conf.js
```

If you store your Page Objects not in `tests/page-objects` folder, then
`PO_FOLDER_PATH` environment variable has to be specified to show the path to
your Page Objects folder:
```
PO_FOLDER_PATH='tests/my-custom-page-objects' node_modules/.bin/wdio tests/wdio.conf.js
```

> You can specify multiple Page Object folders by separating them with commas:
> `PO_FOLDER_PATH='main/my-custom1,login/my-custom2,auth,create/my-custom3'`

Also you can just add `test-e2e` command to `scripts` in `package.json`:
```
{
  // ...
  "scripts": {
    "test-e2e": "PO_FOLDER_PATH='tests/my-custom-page-objects' node_modules/.bin/wdio tests/wdio.conf.js",
    // ...
```
and then launch tests with:
```
npm run test-e2e
```

## List of predefined steps
### Given steps
1. `I/user go(es) to URL "..."` - open a site (by its URL provided in "" as a
string - for example: `"https://github.com/Marketionist"`) in the current
browser window/tab.

### Then steps
2. `the title should be "..."` - verify that title of the current browser
window/tab equals to the text (provided in "" as a string).

## Contributing
You are welcome to contribute to this repository - please see
[CONTRIBUTING.md](https://github.com/Marketionist/webdriverio-cucumber-steps/blob/master/CONTRIBUTING.md)
to help you get started. It is not mandatory, so you can just create a pull
request and we will help you refine it along the way.

## Thanks
If this package was helpful to you, please give it a **★ Star** on
[GitHub](https://github.com/Marketionist/webdriverio-cucumber-steps).
