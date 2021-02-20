Feature: Running Cucumber with TestCafe - test 'user ...' steps feature 2
  As a user of WebdriverIO
  I should be able to use Cucumber step definitions
  to run my end-to-end tests


  Scenario: 'user sets cookie' should set a cookie on the current page, 'user prints cookies' should output current cookies (cookie provided in the step string)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets cookie "my_test_cookie1=somestring"
    Then user prints cookies

  Scenario: 'user sets cookie' should set a cookie on the current page, 'I print cookies' should output current cookies
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets cookie "test1-page"."cookieTest"
    Then user prints cookies

  Scenario: 'user sets cookie' should set a cookie on the current page, 'I print cookies' should output current cookies (text style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets cookie cookieTest from test1-page page
    Then user prints cookies

  Scenario: 'user sends "POST" request' should return the content of the page (body provided in the step string)
    When user sends "POST" request to "http://localhost:8001/post" with body "{ \"test1\": 1, \"test2\": 2 }"

  Scenario: 'user sends "GET" request' should return the content of the page (body provided in the step string)
    When user sends "GET" request to "http://localhost:8001/" with body ""

  Scenario: 'user sends "POST" request' should return the content of the page (Page Object style step)
    When user sends "POST" request to "http://localhost:8001/post" with body "test2-page"."bodyTest"

  Scenario: 'user sends "POST" request' should return the content of the page (full Page Object style step)
    When user sends "POST" request to "test2-page"."urlTestRequest" with body "test2-page"."bodyTest"

  Scenario: 'user sends "POST" request' should return the content of the page (full text style step)
    When user sends "POST" request to urlTestRequest from test2-page with body bodyTest from test2-page

  Scenario: 'user sends "POST" request' should return the content of the page (body provided in the step string)
    When user sends "POST" request to "http://localhost:8001/post" with headers "{ \"Content-Type\": \"application/json\", \"Authorization\": \"Bearer aBcD1234\" }" and body "{ \"test1\": 1, \"test2\": 2 }"

  Scenario: 'user sends "POST" request' should return the content of the page (body provided in the step string)
    When user sends "POST" request to "http://localhost:8001/post" with headers "" and body "{ \"test1\": 1, \"test2\": 2 }"

  Scenario: 'user sends "POST" request' should return the content of the page (Page Object style step)
    When user sends "POST" request to "http://localhost:8001/post" with headers "test2-page"."headersTest" and body "test2-page"."bodyTest"

  Scenario: 'user sends "POST" request' should return the content of the page (full Page Object style step)
    When user sends "POST" request to "test2-page"."urlTestRequest" with headers "test2-page"."headersTest" and body "test2-page"."bodyTest"

  Scenario: 'user sends "POST" request' should return the content of the page (full text style step)
    When user sends "POST" request to urlTestRequest from test2-page with headers headersTest from test2-page and body bodyTest from test2-page
