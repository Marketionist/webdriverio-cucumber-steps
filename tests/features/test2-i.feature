Feature: Running Cucumber with TestCafe - test 'I ...' steps feature 2
  As a user of WebdriverIO
  I should be able to use Cucumber step definitions
  to run my end-to-end tests

  Scenario: 'I send "POST" request' should return the content of the page (body provided in the step string)
    When I send "POST" request to "http://localhost:8001/post" with body "{ \"test1\": 1, \"test2\": 2 }"

  Scenario: 'I send "GET" request' should return the content of the page (body provided in the step string)
    When I send "GET" request to "http://localhost:8001/" with body ""
