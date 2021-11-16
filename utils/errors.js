'use strict';

module.exports = {
    SELECTOR_NOT_DEFINED: 'Something is wrong with selector, maybe it is not ' +
        'defined in Page Object:',
    DATA_NOT_DEFINED: 'Something is wrong with data, maybe it is not ' +
        'defined in Page Object:',
    ELEMENT_NOT_DISPLAYED: 'Failed while waiting for element to be displayed:',
    ELEMENT_NOT_PRESENT: 'expected element to be present:',
    ELEMENT_PRESENT: 'expected element not to be present:',
    NO_ELEMENT: 'Can not get the element from the current page:',
    NO_TITLE: 'Can not get title of the current page',
    NO_URL: 'Can not get URL of the current page',
    ATTRIBUTE_NOT_INCLUDES: 'expected element\'s attribute to include value:',
    TITLE_NOT_EQUAL: 'Expected title to be "%text%" but found "%title%"',
    TITLE_NOT_CONTAINS: 'Expected title to contain "%text%" but found "%title%"',
    ELEMENTS_NUMBER_NOT_EQUAL: 'Expected to find %number% of ' +
        '"%page%"."%element%" but found:'
};
