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

  Scenario: 'I click' Page1 test page link should lead to Page2 test page
    Given I go to URL "http://localhost:8001/test1.html"
    When I click "test1-page"."linkTest2Page"
    Then the title should be "Test2 Page"

  Scenario: 'I click' Page1 test page link should lead to Page2 test page (text style step, XPath)
    Given I go to URL "http://localhost:8001/test1.html"
    When I click linkTest2PageXPath from test1-page
    Then the title should be "Test2 Page"
