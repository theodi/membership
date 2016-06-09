Feature: Add person details to Capsule CRM

#a  Scenario: Add Membership tag to existing individual signup
#a    Given I have signed up as an individual member
#a    And my membership number is "HG5646HD"
#a    And my sector is "Healthcare"
#a    And I requested 1 membership at the level called "individual"
#a    And there is an existing person in CapsuleCRM called "Arnold Rimmer" with email "rimmer@jmc.com"
#a    And that it's 2013-01-01 14:35
#a    When I sign up via the website
#a    Then there should still be just one person in CapsuleCRM called "Arnold Rimmer" with email "rimmer@jmc.com"
#a    And that person should have a data tag
#a    And that data tag should have the type "Membership"
#a    And that data tag should have the level "individual"
#a    And that data tag should have the join date 2013-01-01
#a    And that data tag should have the membership number "HG5646HD"
#a    And that data tag should have the sector "Healthcare"
#a    And that data tag should have the email "rimmer@jmc.com"

  Scenario: Add Membership tag to new individual signup
    When I am on "https://theodi-testing.chargify.com/subscribe/g53pnknbb6wn/individual-member"
    And I fill in the following:
      | input[name="subscription[customer_attributes][first_name]"]             | Arnold             |
      | input[name="subscription[customer_attributes][last_name]"]              | Rimmer             |
      | input[name="subscription[customer_attributes][email]"]                  | pezholio@gmail.com |
      | input[name="subscription[customer_attributes][phone]"]                  | 12345676           |
      | input[name="subscription[payment_profile_attributes][full_number]"]     | 1                  |
      | input[name="subscription[payment_profile_attributes][cvv]"]             | 123                |
      | input[name="subscription[payment_profile_attributes][billing_address]"] | 123 Test Road      |
      | input[name="subscription[payment_profile_attributes][billing_city]"]    | Testtown           |
      | input[name="subscription[payment_profile_attributes][billing_zip]"]     | TEST 123           |
    And I select "Healthcare" from "select[name='subscription[metafields][13320]']"
    And I select "12 - Dec" from "select[name='subscription[payment_profile_attributes][expiration_month]']"
    And I select "2026" from "select[name='subscription[payment_profile_attributes][expiration_year]']"
    And I select "United Kingdom" from "select[name='subscription[payment_profile_attributes][billing_country]']"
    And I select "London, City of" from "select[name='subscription[payment_profile_attributes][billing_state]']"
    And I press "#subscription_submit"
    And I wait 2 seconds
    And I run my zap
    Then there should still be just one person in CapsuleCRM called "Arnold Rimmer" with email "pezholio@gmail.com"
    #And that person should have a data tag
    #And that data tag should have the type "Membership"
    #And that data tag should have the level "individual"
    #And that data tag should have the join date 2013-01-01
    #And that data tag should have the membership number "HG5646HD"
    #And that data tag should have the sector "Healthcare"
    #And that data tag should have the email "rimmer@jmc.com"
    #And that data tag should have the contact first name of "Arnold"
    #And that data tag should have the contact last name of "Rimmer"
