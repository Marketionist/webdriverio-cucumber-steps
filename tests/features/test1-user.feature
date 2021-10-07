Feature: Running Cucumber with TestCafe - test 'user ...' steps feature 1
  As a user of WebdriverIO
  I should be able to use Cucumber step definitions
  to run my end-to-end tests


  Scenario: 'user goes to URL' should open corresponding page, 'title should be' should verify the title
    Given user goes to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"

  Scenario: 'user goes to page' should open corresponding page
    Given user goes to "test1-page"."pageTest1"
    Then the title should be "Test1 Page"

  Scenario: 'user goes to page' should open corresponding page (text style step)
    Given user goes to pageTest1 from test1-page
    Then the title should be "Test1 Page"

  Scenario: 'user reloads the page' should refresh the page, 'should be present' should verify the element
    Given user goes to "test1-page"."pageTest1"
    And user reloads the page
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'user reloads the page' should refresh the page, 'should be present' should verify the element (text style step)
    Given user goes to "test1-page"."pageTest1"
    And user reloads the page
    Then linkTest2Page from test1-page should be present

  Scenario: 'should not be present': link on Page1 test page should not be present, 'user waits for' should wait for 200 ms
    Given user goes to "test1-page"."pageTest1"
    # And user waits for 200 ms
    Then "test1-page"."linkInvisibleTest2Page" should not be present

  Scenario: 'should not be present': text error on Page1 test page should not be present, 'user waits for' should wait for 200 ms (text style step, XPath)
    Given user goes to "test1-page"."pageTest1"
    # And user waits for 200 ms
    Then textErrorXPath from test1-page should not be present

  Scenario: 'user clicks' Page1 test page link should lead to Page2 test page
    Given user goes to URL "http://localhost:8001/test1.html"
    When user clicks "test1-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'user clicks' Page1 test page link should lead to Page2 test page (text style step, XPath)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user clicks linkTest2PageXPath from test1-page
    Then the title should be "Test2 Page"

  Scenario: 'user right clicks' on Right click menu button should open a menu
    Given user goes to URL "http://localhost:8001/test1.html"
    When user right clicks "test1-page"."buttonMenuRightClick"
    Then "test1-page"."blockMenu" should be present

  Scenario: 'user right clicks' on Right click menu button should open a menu (text style step, XPath)
    Given user goes to URL "http://localhost:8001/test1.html"
    When user right clicks buttonMenuRightClickXPath from test1-page
    Then blockMenu from test1-page should be present
