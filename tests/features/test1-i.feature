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

  Scenario: 'I set cookie' should set a cookie on the current page, 'I print cookies' should output current cookies (cookie provided in the step string)
    Given I go to pageTest1 from test1-page page
    When I set cookie "my_test_cookie1=11"
    Then I print cookies

  Scenario: 'I set cookie' should set a cookie on the current page, 'I print cookies' should output current cookies
    Given I go to pageTest1 from test1-page page
    When I set cookie "test1-page"."cookieTest"
    Then I print cookies

  Scenario: 'I set cookie' should set a cookie on the current page, 'I print cookies' should output current cookies (text style step)
    Given I go to pageTest1 from test1-page page
    When I set cookie cookieTest from test1-page page
    Then I print cookies
