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
