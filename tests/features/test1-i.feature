Feature: Running Cucumber with TestCafe - test 'I ...' steps feature 1
  As a user of WebdriverIO
  I should be able to use Cucumber step definitions
  to run my end-to-end tests

  Scenario: 'I go to URL' should open corresponding page, 'title should be' should verify the title
    Given I go to URL "http://localhost:8001/test1.html"
    Then the title should be "Test1 Page"
