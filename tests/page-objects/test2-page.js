'use strict';

// #############################################################################

let test2Page = {

    cookieTest: 'test2=true',
    bodyTest: '{"items":3,"item1":"nice","item2":true,"item3":[1,2,3]}',
    headersTest: '{"Content-Type":"application/json",' +
        '"Authorization":"Bearer EfGh2345"}',
    urlTestRequest: 'http://localhost:8001/post'

};

module.exports = test2Page;
