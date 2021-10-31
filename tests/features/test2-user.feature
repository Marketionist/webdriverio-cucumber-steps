Feature: Running Cucumber with TestCafe - test 'user ...' steps feature 2
  As a user of WebdriverIO
  I should be able to use Cucumber step definitions
  to run my end-to-end tests


  Scenario: 'user logs in with l: and p: and clicks' should show credentials that were submitted for logging in
    Given user goes to "test2-page"."pageTest2"
    When user logs in with l: "testUser" in "test2-page"."inputUsername" and p: "1111" in "test2-page"."inputPassword" and clicks "test2-page"."buttonLogin"
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'user logs in with l: and p: and clicks' should show credentials that were submitted for logging in (text style step)
    Given user goes to "test2-page"."pageTest2"
    When user logs in with l: "testUser" in inputUsername from test2-page and p: "1111" in inputPassword from test2-page and clicks buttonLogin from test2-page
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'user logs in with l: and p: and clicks' should show credentials that were submitted for logging in (Page Object style step)
    Given user goes to "test2-page"."pageTest2"
    When user logs in with l: "test2-page"."loginTest2" in "test2-page"."inputUsername" and p: "test2-page"."passwordTest2" in "test2-page"."inputPassword" and clicks "test2-page"."buttonLogin"
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'user logs in with l: and p: and clicks' should show credentials that were submitted for logging in (text style step)
    Given user goes to "test2-page"."pageTest2"
    When user logs in with l: loginTest2 from test2-page in inputUsername from test2-page and p: passwordTest2 from test2-page in inputPassword from test2-page and clicks buttonLogin from test2-page
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'user sets cookie' should set a cookie on the current page, 'user prints cookies' should output current cookies (cookie provided in the step string)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets cookie "my_test_cookie1=somestring"
    Then user prints cookies

  Scenario: 'user sets cookie' should set a cookie on the current page, 'I print cookies' should output current cookies
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets cookie "test2-page"."cookieTest"
    Then user prints cookies

  Scenario: 'user sets cookie' should set a cookie on the current page, 'I print cookies' should output current cookies (text style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets cookie cookieTest from test2-page page
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

  Scenario: 'user moves to' element should trigger its hovered state, 'text should contain' should verify the text
    Given user goes to URL "http://localhost:8001/test1.html"
    When user moves to "test1-page"."titleTest1"
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'user moves to' element should trigger its hovered state, 'text should contain' should verify the text (text style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user moves to titleTest1 from test1-page
    Then blockTextTest from test1-page text should contain txtTest1 from test1-page

  Scenario: 'user moves to with an offset' should trigger element's hovered state
    Given user goes to URL "http://localhost:8001/test1.html"
    When user moves to "test1-page"."titleTest1" with an offset of x: 10px, y: 5px
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'user moves to with an offset' should trigger element's hovered state (text style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user moves to titleTest1 from test1-page with an offset of x: 10px, y: 5px
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'user switches to frame' should change the context to this iframe
    Given user goes to URL "http://localhost:8001/test-iframe.html"
    When user switches to "iframe-page"."iframeTest1Page" frame
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'user switches to frame' should change the context to this iframe (text style step)
    Given user goes to URL "http://localhost:8001/test-iframe.html"
    When user switches to iframeTest1Page frame from iframe-page
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'user waits up to and switches to frame' should wait for the iframe to load up to provided number of ms and then change the context to this iframe
    Given user goes to URL "http://localhost:8001/test-iframe.html"
    When user waits up to 10000 ms and switches to "iframe-page"."iframeTest1Page" frame
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'user waits up to and switches to frame' should wait for the iframe to load up to provided number of ms and then change the context to this iframe (text style step)
    Given user goes to URL "http://localhost:8001/test-iframe.html"
    When user waits up to 10000 ms and switches to iframeTest1Page frame from iframe-page page
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'user switches to main frame' should change the context back to the main page
    Given user goes to URL "http://localhost:8001/test-iframe.html"
    And user switches to "iframe-page"."iframeTest1Page" frame
    And "test1-page"."linkTest2Page" should be present
    When user switches to main frame
    Then "test1-page"."linkTest2Page" should not be present
