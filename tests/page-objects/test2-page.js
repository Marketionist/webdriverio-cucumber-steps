'use strict';

// #############################################################################

let test2Page = {

    pageTest2: 'http://localhost:8001/test2.html',
    textGold: 'Gold',
    textIndigo: 'Indigo',
    dropdownColors: '#dropdown-colors',
    blockDropdownColor: '#block-dropdown-color',
    inputColors: '#input-colors',
    blockInputColor: '#block-input-color',
    urlTest1: 'http://localhost:8001/test1.html',
    pathTest1: '/test1.html',
    loginTest2: 'testUser',
    passwordTest2: '1111',
    inputUsername: '#input-username',
    inputPassword: '//*[@id="input-password"]',
    buttonLogin: '#login',
    blockCredentials: '#block-credentials',
    input: 'input',
    cookieTest: 'test2=true',
    bodyTest: '{"items":3,"item1":"nice","item2":true,"item3":[1,2,3]}',
    headersTest: '{"Content-Type":"application/json",' +
        '"Authorization":"Bearer EfGh2345"}',
    urlTestRequest: 'http://localhost:8001/post',
    updateText: function () {
        document.getElementById('text-test').innerHTML = 'Text to test ' +
            'script execution';
    }

};

module.exports = test2Page;
