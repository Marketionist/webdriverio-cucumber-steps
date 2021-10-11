Feature: Running Cucumber with TestCafe - test 'I ...' steps feature 1
  As a user of WebdriverIO
  I should be able to use Cucumber step definitions
  to run my end-to-end tests


  Scenario: 'I go to URL' should open corresponding page, 'title should be' should verify the title
    Given I go to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"

  Scenario: 'I go to page' should open corresponding page
    Given I go to "test1-page"."pageTest1"
    Then the title should be "Test1 Page"

  Scenario: 'I go to page' should open corresponding page (text style step)
    Given I go to pageTest1 from test1-page page
    Then the title should be "Test1 Page"

  Scenario: 'I reload the page' should refresh the page, 'should be present' should verify the element
    Given I go to "test1-page"."pageTest1"
    And I reload the page
    Then "test1-page"."linkTest2Page" should be present

  Scenario: 'I reload the page' should refresh the page, 'should be present' should verify the element (text style step)
    Given I go to "test1-page"."pageTest1"
    And I reload the page
    Then linkTest2Page from test1-page should be present

  Scenario: 'I click' Page1 test page link should lead to Page2 test page
    Given I go to URL "http://localhost:8001/test1.html"
    When I click "test1-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I click' Page1 test page link should lead to Page2 test page (text style step, XPath)
    Given I go to URL "http://localhost:8001/test1.html"
    When I click linkTest2PageXPath from test1-page
    Then the title should be "Test2 Page"

  Scenario: 'I right click' on Right click menu button should open a menu
    Given I go to URL "http://localhost:8001/test1.html"
    When I right click "test1-page"."buttonMenuRightClick"
    Then "test1-page"."blockMenu" should be present

  Scenario: 'I right click' on Right click menu button should open a menu (text style step, XPath)
    Given I go to URL "http://localhost:8001/test1.html"
    When I right click buttonMenuRightClickXPath from test1-page
    Then blockMenu from test1-page should be present

  Scenario: 'I wait and click' on Page1 test page link should lead to Page2 test page
    Given I go to "test1-page"."pageTest1"
    When I wait and click "test1-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I wait and click' on Page1 test page link should lead to Page2 test page (text style step)
    Given I go to "test1-page"."pageTest1"
    When I wait and click linkTest2Page from test1-page page
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should be clicked if it is visible and lead to Page2 test page
    Given I go to "test1-page"."pageTest1"
    And I wait for 200 ms
    When I click "test1-page"."linkTest2Page" if present
    And I wait for 200 ms
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should not be clicked if it is not present
    Given I go to "test1-page"."pageTest1"
    And I wait for 200 ms
    When I click "test1-page"."linkInvisibleTest2Page" if present
    And I wait for 200 ms
    Then the title should be "Test1 Page"

  Scenario: 'I click if present': link on Page1 test page should be clicked if it is visible and lead to Page2 test page (text style step, XPath)
    Given I go to pageTest1 from test1-page page
    And I wait for 200 ms
    When I click linkTest2PageXPath from test1-page page if present
    And I wait for 200 ms
    Then the title should be "Test2 Page"

  Scenario: 'I click if present': link on Page1 test page should not be clicked if it is not present (text style step, XPath)
    Given I go to pageTest1 from test1-page page
    And I wait for 200 ms
    When I click linkInvisibleTest2PageXPath from test1-page page if present
    And I wait for 200 ms
    Then the title should be "Test1 Page"
