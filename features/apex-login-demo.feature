@smoke @demo @regression
Feature: APEX UI Login Demo
  As a test automation engineer
  I want to verify the APEX UI login functionality
  So that I can ensure the framework works with the real application

  Background:
    Given I navigate to the APEX UI application

  @positive
  Scenario: Successful login to APEX UI with training credentials
    When I enter training username "HPFUGHDN"
    And I enter training password "London123@"
    And I click the login button
    Then I should be logged in successfully
    And I should see the APEX UI dashboard

  @demo-quick
  Scenario: Quick login demo with configured credentials
    When I login with the configured training credentials
    Then I should be logged in successfully
