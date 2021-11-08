# webdriverio-cucumber-steps
Cucumber steps (step definitions) written with WebdriverIO for end-to-end (e2e) tests

[![Actions Status](https://github.com/Marketionist/webdriverio-cucumber-steps/workflows/Build%20and%20Test/badge.svg)](https://github.com/Marketionist/webdriverio-cucumber-steps/actions)
[![npm version](https://img.shields.io/npm/v/webdriverio-cucumber-steps.svg)](https://www.npmjs.com/package/webdriverio-cucumber-steps)
[![NPM License](https://img.shields.io/npm/l/webdriverio-cucumber-steps.svg)](https://github.com/Marketionist/webdriverio-cucumber-steps/blob/main/LICENSE)

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
            <td rowspan=5><p>6.x</p><p>7.x</p></td>
            <td rowspan=5><p>5.x, 6.x</p><p>7.x</p></td>
        </tr>
        <tr>
            <td>13.x</td>
        </tr>
        <tr>
            <td>14.x</td>
        </tr>
        <tr>
            <td>15.x</td>
        </tr>
        <tr>
            <td>16.x</td>
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
your Page Objects folder when running tests:
```
PO_FOLDER_PATH='tests/my-custom-page-objects' node_modules/.bin/wdio tests/wdio.conf.js
```

> You can specify multiple Page Object folders by separating them with commas:
> `PO_FOLDER_PATH='main/my-custom1,login/my-custom2,auth,create/my-custom3'`

Also you can just add `test:e2e` command to `scripts` in `package.json`:
```
{
  // ...
  "scripts": {
    "test:e2e": "PO_FOLDER_PATH='tests/my-custom-page-objects' node_modules/.bin/wdio tests/wdio.conf.js",
    // ...
```
and then launch tests with:
```
npm run test:e2e
```

## List of predefined steps
### Given steps
1. `I/user go(es) to URL "..."` - open a site (by its URL provided in "" as a
string - for example: `"https://github.com/Marketionist"`) in the current
browser window/tab.
2. `I/user go(es) to "..."."..."` - open a site (by its URL provided as a string
in **"page"."object"**) in the current browser window/tab.
- `I/user go(es) to ... from ...` - open a site (by its URL provided as a string
in **object** from **page**) in the current browser window/tab.
3. `I/user set(s) cookie "..."` - set cookie for the current domain (cookie
provided in "" as a string - for example: `"my_test_cookie1=11"`).
- `I/user set(s) cookie "..."."..."` - set cookie for the current domain (cookie
provided as a string in **"page"."object"**).
- `I/user set(s) cookie ... from ...` - set cookie for the current domain
(cookie provided as a string in **object** from **page**).
4. `I/user print(s) cookies` - output all cookies that are currently set.
5. `I/user send(s) "..." request to "..." with body "..."` - send request
(request method provided in "" as a string - for example: `POST`) to URL
(provided in "" as a string - for example: `"http://httpbin.org/post"`) with
body (provided in "" as JSON - for example: `"{ \"test1\": 1, \"test2\": 2 }"`).
> GET request will be sent with default header `'Content-Type': 'text/html'`,
> all other requests will be sent with default header
> `'Content-Type': 'application/json'`.
- `I/user send(s) "..." request to "..." with body "..."."..."` - send request
(request method provided in "" as a string - for example: `POST`) to URL
(provided in "" as a string - for example: `"http://httpbin.org/post"`) with
body (provided in **"page"."object"**).
- `I/user send(s) "..." request to "..."."..." with body "..."."..."` - send
request (request method provided in "" as a string - for example: `POST`) to URL
(provided in **"page"."object"**) with body (provided in **"page"."object"**).
- `I/user send(s) "..." request to ... from ... with body ... from ...` - send
request (request method provided in "" as a string - for example: `POST`) to URL
(provided in **object** from **page**) with body (provided in **object** from
**page**).
6. `I/user send(s) "..." request to "..." with headers "..." and body "..."` -
send request (request method provided in "" as a string - for example: `POST`)
to URL (provided in "" as a string - for example: `"http://httpbin.org/post"`)
with headers (provided in "" as JSON - for example:
`"{ \"Content-Type\": \"application/json\", \"Authorization\": \"Bearer aBcD1234\" }"`
) and body (provided in "" as JSON - for example:
`"{ \"test1\": 1, \"test2\": 2 }"`).
- `I/user send(s) "..." request to "..." with headers "..."."..." and body "..."."..."` -
send request (request method provided in "" as a string - for example: `POST`)
to URL (provided in "" as a string - for example: `"http://httpbin.org/post"`)
with headers (provided in **"page"."object"**) and body (provided in
**"page"."object"**).
- `I/user send(s) "..." request to "..."."..." with headers "..."."..." and body "..."."..."` -
send request (request method provided in "" as a string - for example: `POST`)
to URL (provided in **"page"."object"**) with headers (provided in
**"page"."object"**) and body (provided in **"page"."object"**).
- `I/user send(s) "..." request to ... from ... with headers ... from ... and body ... from ...` -
send request (request method provided in "" as a string - for example: `POST`)
to URL (provided in **object** from **page**) with headers (provided in
**object** from **page**) and body (provided in **object** from **page**).

### When steps
7. `I/user log(s) in with l: "..." in "..."."..." and p: "..." in
"..."."..." and click(s) "..."."..."` - log in to any site with login (provided
in "" as a string), login/username input (provided in **page1**.**object1** as
CSS selector), password (provided in "" as a string), password input (provided
in **page2**.**object2** as CSS or XPath selector), login button (provided in
**page3**.**object3** as CSS or XPath selector).
- `I/user log(s) in with l: "..." in ... from ... and p: "..." in ...
from ... and click(s) ... from ...` - log in to any site with login (provided
in "" as a string), login/username input (provided in **object1** from **page1**
as CSS or XPath selector), password (provided in "" as a string), password input
(provided in **object2** from **page2** as CSS or XPath selector), login button
(provided in **object3** from **page3** as CSS or XPath selector).
- `I/user log(s) in with l: "..."."..." in "..."."..." and p: "..."."..." in
"..."."..." and click(s) "..."."..."` - log in to any site with login (provided
in **page1**.**object1** as CSS or XPath selector), login/username input
(provided in **page2**.**object2** as CSS or XPath selector), password (provided
in **page3**.**object3** as CSS or XPath selector), password input (provided in
**page4**.**object4** as CSS or XPath selector), login button (provided in
**page5**.**object5** as CSS or XPath selector).
- `I/user log(s) in with l: ... from ... in ... from ... and p: ... from ... in
... from ... and click(s) ... from ...` - log in to any site with login
(provided in **object1** from **page1** as CSS or XPath selector),
login/username input (provided in **object2** from **page2** as CSS or XPath
selector), password (provided in **object3** from **page3** as CSS or XPath
selector), password input (provided in **object4** from **page4** as CSS or
XPath selector), login button (provided in **object5** from **page5** as CSS or
XPath selector).
8. `I/user reload(s) the page` - reload current page.
9. `I/user click(s) "..."."..."` - click on any element (provided in
**"page"."object"** as CSS or XPath selector).
- `I/user click(s) ... from ...` - click on any element (provided in **object**
from **page** as CSS or XPath selector).
10. `I/user right click(s) "..."."..."` - right click on any element (provided in
**"page"."object"** as CSS or XPath selector).
- `I/user right click(s) ... from ...` - right click on any element (provided in
**object** from **page** as CSS or XPath selector).
11. `I/user wait(s) for ... ms` - wait for provided amount of time (in
milliseconds).
12. `I/user wait(s) and click(s) "..."."..."` - wait for 300 ms and then click
on any element (provided in **"page"."object"** as CSS or XPath selector).
- `I/user wait(s) and click(s) ... from ...` - wait for 300 ms and then click on
any element (provided in **object** from **page** as CSS or XPath selector).
13. `I/user wait(s) up to ... ms for "..."."..." to appear` - wait up to
provided amount of time (in milliseconds) for any element (provided in
**"page"."object"** as CSS or XPath selector) to appear.
- `I/user wait(s) up to ... ms for ... from ... to appear` - wait up to provided
amount of time (in milliseconds) for any element (provided in **object** from
**page** as CSS or XPath selector) to appear.
14. `I/user click(s) "..."."..." if present` - click on any element (provided in
**"page"."object"** as CSS or XPath selector) only if it is present on the page.
- `I/user click(s) ... from ... if present` - click on any element (provided in
**object** from **page** as CSS or XPath selector) only if it is present on the
page.
15. `I/user double click(s) "..."."..."` - double click on any element (provided
in **"page"."object"** as CSS or XPath selector).
- `I/user double click(s) ... from ...` - double click on any element (provided
in **object** from **page** as CSS or XPath selector).
16. `I/user type(s) "..." in "..."."..."` - type any text (provided in "" as a
string) in the input field (provided in **"page"."object"** as CSS or XPath
selector).
- `I/user type(s) "..." in ... from ...` - type any text (provided in "" as a
string) in the input field (provided in **object** from **page** as CSS
selector).
- `I/user type(s) "..."."..." in "..."."..."` - type any text (provided in
**"page1"."object1"**) in the input field (provided in **"page2"."object2"** as
CSS selector).
- `I/user type(s) ... from ... in ... from ...` - type any text (provided in
**object1** from **page1**) in the input field (provided in **object2** from
**page2** as CSS or XPath selector).
17. `I/user clear(s) "..."."..." and type(s) "..."` - clear the input field
(provided in **"page"."object"** as CSS or XPath selector) and type any text
(provided in "" as a string).
- `I/user clear(s) ... from ... and type(s) "..."` - clear the input field
(provided in **object** from **page** as CSS or XPath selector) and type any
text (provided in "" as a string).
- `I/user clear(s) "..."."..." and type(s) "..."."..."` - clear the input field (provided in **"page1"."object1"** as CSS or XPath selector) and type any text
(provided in **"page2"."object2"**).
- `I/user clear(s) ... from ... and type(s) ... from ...` - clear the input
field (provided in **object1** from **page1** as CSS or XPath selector) and type
any text (provided in **object2** from **page2**).
18. `I/user select(s) "..." in "..."."..."` - select any option by text
(provided in "" as a string) in the dropdown (provided in **"page"."object"** as
CSS or XPath selector).
- `I/user select(s) "..." in ... from ...` - select any option by text (provided
in "" as a string) in the dropdown (provided in **object** from **page** as CSS
or XPath selector).
- `I/user select(s) "..."."..." in "..."."..."` - select any option by text
(provided in **"page1"."object1"**) in the dropdown (provided in
**"page2"."object2"** as CSS or XPath selector).
- `I/user select(s) ... from ... in ... from ...` - select any option by text
(provided in **object1** from **page1**) in the dropdown (provided in
**object2** from **page2** as CSS or XPath selector).
19. `I/user move(s) to "..."."..."` - move the mouse pointer over any element
(hover with cursor an element provided in **"page"."object"** as CSS or XPath
selector).
- `I/user move(s) to ... from ...` - move the mouse pointer over any element
(hover with cursor an element provided in **object** from **page** as CSS or
XPath selector).
20. `I/user move(s) to "..."."..." with an offset of x: ...px, y: ...px` - move
the mouse pointer over any element (hover with cursor an element provided in
**"page"."object"** as CSS or XPath selector) with an offset of x: ...px,
y: ...px.
- `I/user move(s) to ... from ... with an offset of x: ...px, y: ...px` - move
the mouse pointer over any element (hover with cursor an element provided in
**object** from **page** as CSS or XPath selector) with an offset of x: ...px,
y: ...px.
21. `I/user switch(es) to "..."."..." frame` - switch the context to iframe
(provided in **"page"."object"** as CSS or XPath selector).
- `I/user switch(es) to ... frame from ...` - switch the context to iframe
(provided in **object** from **page** as CSS or XPath selector).
22. `I/user wait(s) up to ... ms and switch(es) to "..."."..." frame` - wait up
to provided amount of time (in milliseconds) for the iframe to load and then
switch the context to that iframe (provided in **"page"."object"** as CSS or
XPath selector).
- `I/user wait(s) up to ... ms and switch(es) to ... frame from ...` - wait up
to provided amount of time (in milliseconds) for the iframe to load and then
switch the context to that iframe (provided in **object** from **page** as CSS
or XPath selector).
23. `I/user switch(es) to main frame` - switch the context back to default
(initial) frame.
24. `I/user set(s) "..." file path in "..."."..."` - set a file path (provided
in "" as a string) in the input (provided in **"page"."object"** as CSS or XPath
selector). This step can be used to upload files and images.
- `I/user set(s) "..." file path in ... from ...` - set a file path (provided in
"" as a string) in the input (provided in **object** from **page** as CSS
selector).
- `I/user set(s) "..."."..." file path in "..."."..."` - set a file path
(provided in **"page1"."object1"**) in the input (provided in
**"page2"."object2"** as CSS or XPath selector).
- `I/user set(s) ... from ... file path in ... from ...` - set a file path
(provided in **object1** from **page1**) in the input (provided in
**object2** from **page2** as CSS or XPath selector).
25. `I/user execute(s) "..."."..." function` - execute script (JavaScript
function) provided in **"page"."object"**.
- `I/user execute(s) ... function from ...` - execute script (JavaScript
function) provided in **object** from **page**.
26. `I/user drag(s)-and-drop(s) "..."."..." to "..."."..."` - drag-and-drop
element (provided in **"page1"."object1"** as CSS or XPath selector) to another
element (provided in **"page2"."object2"** as CSS or XPath selector).
- `I/user drag(s)-and-drop(s) ... from ... to ... from ...` - drag-and-drop
element (provided in **object1** from **page1** as CSS or XPath selector) to
another element (provided in **object2** from **page2** as CSS or XPath selector
).
27. `I/user accept(s) browser alert` - accept (OK) browser alert.
28. `I/user dismiss(es) browser alert` - dismiss (Cancel) browser alert.
29. `I/user open(s) "..." in new browser window` - open a site (by its URL
provided in "" as a string - for example: `"https://github.com/Marketionist"`)
in the new browser window/tab.
- `I/user open(s) "..."."..." in new browser window` - open a site (by its URL
provided in **"page"."object"**) in the new browser window/tab.
- `I/user open(s) ... from ... in new browser window` - open a site (by its URL
provided in **object** from **page**) in the new browser window/tab.

### Then steps
30. `the title should be "..."` - verify that title of the current browser
window/tab equals to the text (provided in "" as a string).
31. `"..."."..." should be present` - verify that element (provided in
**"page"."object"** as CSS or XPath selector) is present on the page.
- `... from ... should be present` - verify that element (provided in
**object** from **page** as CSS or XPath selector) is present on the page.
32. `"..."."..." should not be present` - verify that element (provided in
**"page"."object"** as CSS or XPath selector) is not present on the page.
- `... from ... should not be present` - verify that element (provided in
**object** from **page** as CSS or XPath selector) is not present on the page.
33. `"..."."..." text should be "..."` - verify that text of the element
(provided in **"page"."object"** as CSS or XPath selector) equals to the text
(provided in "" as a string).
- `... from ... text should be "..."` - verify that text of the element
(provided in **object** from **page** as CSS or XPath selector) equals to the
text (provided in "" as a string).
- `"..."."..." text should be "..."."..."` - verify that text of the element
(provided in **"page1"."object1"** as CSS or XPath selector) equals to the text
(provided in **"page2"."object2"**).
- `... from ... text should be ... from ...` - verify that text of the
element (provided in **object1** from **page1** as CSS or XPath selector) equals
to the text (provided in **object2** from **page2**).
34. `"..."."..." text should contain "..."` - verify that text of the element
(provided in **"page"."object"** as CSS or XPath selector) contains the text
(provided in "" as a string).
- `... from ... text should contain "..."` - verify that text of the element
(provided in **object** from **page** as CSS or XPath selector) contains the
text (provided in "" as a string).
- `"..."."..." text should contain "..."."..."` - verify that text of the
element (provided in **"page1"."object1"** as CSS or XPath selector) contains
the text (provided in **"page2"."object2"**).
- `... from ... text should contain ... from ...` - verify that text
of the element (provided in **object1** from **page1** as CSS or XPath selector)
contains the text (provided in **object2** from **page2**).
35. `URL should contain "..."` - verify that URL of the current page contains
the text (provided in "" as a string).
- `URL should contain "..."."..."` - verify that URL of the current page
contains the text (provided in **"page"."object"**).
- `URL should contain ... from ...` - verify that URL of the current page
contains the text (provided in **object** from **page**).

## Contributing
You are welcome to contribute to this repository - please see
[CONTRIBUTING.md](https://github.com/Marketionist/webdriverio-cucumber-steps/blob/main/CONTRIBUTING.md)
to help you get started. It is not mandatory, so you can just create a pull
request and we will help you refine it along the way.

## Thanks
If this package was helpful to you, please give it a **★ Star** on
[GitHub](https://github.com/Marketionist/webdriverio-cucumber-steps).
