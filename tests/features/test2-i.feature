Feature: Running Cucumber with TestCafe - test 'I ...' steps feature 2
  As a user of WebdriverIO
  I should be able to use Cucumber step definitions
  to run my end-to-end tests


Scenario: 'I log in with l: and p: and click' should show credentials that were submitted for logging in
    Given I go to "test2-page"."pageTest2"
    When I log in with l: "testUser" in "test2-page"."inputUsername" and p: "1111" in "test2-page"."inputPassword" and click "test2-page"."buttonLogin"
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'I log in with l: and p: and click' should show credentials that were submitted for logging in (text style step)
    Given I go to "test2-page"."pageTest2"
    When I log in with l: "testUser" in inputUsername from test2-page and p: "1111" in inputPassword from test2-page and click buttonLogin from test2-page
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'I log in with l: and p: and click' should show credentials that were submitted for logging in (Page Object style step)
    Given I go to "test2-page"."pageTest2"
    When I log in with l: "test2-page"."loginTest2" in "test2-page"."inputUsername" and p: "test2-page"."passwordTest2" in "test2-page"."inputPassword" and click "test2-page"."buttonLogin"
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'I log in with l: and p: and click' should show credentials that were submitted for logging in (text style step)
    Given I go to "test2-page"."pageTest2"
    When I log in with l: loginTest2 from test2-page in inputUsername from test2-page and p: passwordTest2 from test2-page in inputPassword from test2-page and click buttonLogin from test2-page
    Then blockCredentials from test2-page text should be "testUser1111"

  Scenario: 'I set cookie' should set a cookie on the current page, 'I print cookies' should output current cookies (cookie provided in the step string)
    Given I go to URL "http://localhost:8001/test1.html"
    When I set cookie "my_test_cookie1=11"
    Then I print cookies

  Scenario: 'I set cookie' should set a cookie on the current page, 'I print cookies' should output current cookies
    Given I go to URL "http://localhost:8001/test1.html"
    When I set cookie "test2-page"."cookieTest"
    Then I print cookies

  Scenario: 'I set cookie' should set a cookie on the current page, 'I print cookies' should output current cookies (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I set cookie cookieTest from test2-page page
    Then I print cookies

  Scenario: 'I send "POST" request' should return the content of the page (body provided in the step string)
    When I send "POST" request to "http://localhost:8001/post" with body "{ \"test1\": 1, \"test2\": 2 }"

  Scenario: 'I send "GET" request' should return the content of the page (body provided in the step string)
    When I send "GET" request to "http://localhost:8001/" with body ""

  Scenario: 'I send "POST" request' should return the content of the page (Page Object style step)
    When I send "POST" request to "http://localhost:8001/post" with body "test2-page"."bodyTest"

  Scenario: 'I send "POST" request' should return the content of the page (full Page Object style step)
    When I send "POST" request to "test2-page"."urlTestRequest" with body "test2-page"."bodyTest"

  Scenario: 'I send "POST" request' should return the content of the page (full text style step)
    When I send "POST" request to urlTestRequest from test2-page with body bodyTest from test2-page

  Scenario: 'I send "POST" request' should return the content of the page (body provided in the step string)
    When I send "POST" request to "http://localhost:8001/post" with headers "{ \"Content-Type\": \"application/json\", \"Authorization\": \"Bearer aBcD1234\" }" and body "{ \"test1\": 1, \"test2\": 2 }"

  Scenario: 'I send "POST" request' should return the content of the page (body provided in the step string)
    When I send "POST" request to "http://localhost:8001/post" with headers "" and body "{ \"test1\": 1, \"test2\": 2 }"

  Scenario: 'I send "POST" request' should return the content of the page (Page Object style step)
    When I send "POST" request to "http://localhost:8001/post" with headers "test2-page"."headersTest" and body "test2-page"."bodyTest"

  Scenario: 'I send "POST" request' should return the content of the page (full Page Object style step)
    When I send "POST" request to "test2-page"."urlTestRequest" with headers "test2-page"."headersTest" and body "test2-page"."bodyTest"

  Scenario: 'I send "POST" request' should return the content of the page (full text style step)
    When I send "POST" request to urlTestRequest from test2-page with headers headersTest from test2-page and body bodyTest from test2-page

  Scenario: 'I move to' element should trigger its hovered state, 'text should contain' should verify the text
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to "test1-page"."titleTest1"
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'I move to' element should trigger its hovered state, 'text should contain' should verify the text (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to titleTest1 from test1-page page
    Then blockTextTest from test1-page page text should contain txtTest1 from test1-page page

  Scenario: 'I move to with an offset' should trigger element's hovered state
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to "test1-page"."titleTest1" with an offset of x: 10px, y: 5px
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'I move to with an offset' should trigger element's hovered state (text style step)
    Given I go to URL "http://localhost:8001/test1.html"
    When I move to titleTest1 from test1-page page with an offset of x: 10px, y: 5px
    Then "test1-page"."blockTextTest" text should contain "test1-page"."txtTest1"

  Scenario: 'I switch to frame' should change the context to this iframe
    Given I go to URL "http://localhost:8001/test-iframe.html"
    When I switch to "iframe-page"."iframeTest1Page" frame
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'I switch to frame' should change the context to this iframe (text style step)
    Given I go to URL "http://localhost:8001/test-iframe.html"
    When I switch to iframeTest1Page frame from iframe-page page
    Then "test1-page"."linkTest2Page" should be present
