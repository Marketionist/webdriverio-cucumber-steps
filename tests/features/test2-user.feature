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

  Scenario: 'user sets file path' should set the path to the file (string) inside the Upload image input
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets "tests/media/test-image1.jpg" file path in "test1-page"."inputUploadFile"
    Then "test1-page"."inputUploadFile" should be present

  Scenario: 'user sets file path' should set the path to the file (string) inside the Upload image input (text style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets "tests/media/test-image1.jpg" file path in inputUploadFile from test1-page
    Then "test1-page"."inputUploadFile" should be present

  Scenario: 'user sets file path' should set the path to the file (page object) inside the Upload image input
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets "test1-page"."pathToImage1" file path in "test1-page"."inputUploadFile"
    Then "test1-page"."inputUploadFile" should be present

  Scenario: 'user sets file path' should set the path to the file (page object) inside the Upload image input (text style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets pathToImage1 from test1-page file path in inputUploadFile from test1-page
    Then "test1-page"."inputUploadFile" should be present

  Scenario: 'user executes function' should change the content on the page
    Given user goes to URL "http://localhost:8001/test1.html"
    When user executes "test2-page"."updateText" function
    Then "test1-page"."blockTextTest" text should contain "Text to test script execution"

  Scenario: 'user executes function' should change the content on the page (text style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user executes updateText function from test2-page
    Then "test1-page"."blockTextTest" text should contain "Text to test script execution"

  Scenario: 'user accepts browser alert' should get the alert accepted
    Given user goes to URL "http://localhost:8001/test-alert.html"
    And user clicks "alert-page"."buttonLaunchAlert"
    When user accepts browser alert
    Then "alert-page"."blockAlertStatus" text should be "alert-page"."textAlertAccepted"

  Scenario: 'user dismisses browser alert' should get the alert canceled
    Given user goes to URL "http://localhost:8001/test-alert.html"
    And user clicks "alert-page"."buttonLaunchAlert"
    When user dismisses browser alert
    Then "alert-page"."blockAlertStatus" text should be "alert-page"."textAlertCanceled"

  Scenario: 'user opens in new browser window' should open the page in the new browser window/tab (URL provided in the step string)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user opens "http://localhost:8001/test2.html" in new browser window
    Then URL should contain "/test2.html"

  Scenario: 'user opens in new browser window' should open the page in the new browser window/tab (Page Object style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user opens "test2-page"."pageTest2" in new browser window
    Then URL should contain "/test2.html"

  Scenario: 'user opens in new browser window' should open the page in the new browser window/tab (text style step)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user opens pageTest2 from test2-page page in new browser window
    Then URL should contain "/test2.html"

  Scenario: 'user closes current browser window' should close current browser window/tab
    Given user goes to URL "http://localhost:8001/test1.html"
    And user opens pageTest2 from test2-page page in new browser window
    When user closes current browser window
    Then URL should contain "/test1.html"

  Scenario: 'user presses' should press the specified keyboard keys
    Given user goes to URL "http://localhost:8001/test2.html"
    And user types "Text is 12" in "test2-page"."inputColors"
    And user clicks "test2-page"."inputColors"
    When user presses "Home ArrowRight ArrowRight ArrowRight ArrowRight Delete Delete Delete"
    Then "test2-page"."blockInputColor" text should be "Text 12"

  Scenario: 'user sets PAGE_URL environment variable', 'user goes to PAGE_URL' should set PAGE_URL environment variable and open a page with this URL
    Given user goes to URL "http://localhost:8001/test1.html"
    When user sets PAGE_URL environment variable
    And user goes to URL "http://localhost:8001/test2.html"
    And user goes to PAGE_URL
    Then URL should contain "/test1.html"
