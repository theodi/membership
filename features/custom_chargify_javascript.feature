Feature: Custom Javascript

  Background:
    Given I am on "https://theodi-testing.chargify.com/subscribe/k2yxvqjq8xt9/individual-pay-what-you-like"
    And I inject the script "scripts/chargify.js"
    And I wait 1 second

  Scenario: Text changes
    Then I should see the text "Postcode" in the "label[for='subscription_payment_profile_attributes_billing_zip']" element
    And the "#subscription_submit" field should contain "Join the ODI"
    And I should see the text "Members benefit from:" in the "#benfits" element
    And I should see the text "invitations to events and open evenings organised by the ODI and beyond" in the "#benefits_list" element
    And I should see the text "Choose what to pay" in the "#my_plan h2" element
    And I should see the text "Organisation" in the "label[for=subscription_customer_attributes_organization]" element
    And I should see the text "Expiry" in the "label[for=subscription_payment_profile_attributes_expiration_month]" element
    And the first letter of each header and input element should be wrapped in a span

  Scenario: Change component box to a select
    Then the "select[id='component_allocated_quantity_152654']" current option contain "30"
    And I select "£100" from "select[id='component_allocated_quantity_152654']"
    And I wait 2 seconds
    Then I should see "£100" in the "#todays-charge" element

  Scenario: Move the form containers
    Then the 1st ".fieldset" element should have the "id" "my_tax"
    And the 1st ".fieldset" element should have the "class" "fieldset hidden"
    And the 2nd ".fieldset" element should have the "id" "my_contact"
    And the 3rd ".fieldset" element should have the "id" "my_plan"
    And the 4th ".fieldset" element should have the "id" "summary"
    And the 5th ".fieldset" element should have the "id" "my_billing"
    And the 6th ".fieldset" element should have the "id" "my_billing_address"

  Scenario: Move the additional information field
    Then the selector "div#metafield_row_13320" should be contained inside the "#my_contact" selector
    And I should not see an ".metafield_configuration" element

  Scenario: Autopopulate the billing name
    When I fill in "#subscription_customer_attributes_first_name" with "Foobar"
    Then the "#subscription_payment_profile_attributes_first_name" field should contain "Foobar"
    When I fill in "#subscription_customer_attributes_last_name" with "McSomething"
    Then the "#subscription_payment_profile_attributes_last_name" field should contain "McSomething"

  Scenario: Autopopulate the coupon if present
    Given I am on "https://theodi-testing.chargify.com/subscribe/k2yxvqjq8xt9/individual-pay-what-you-like?coupon_code=SUPERFREE"
    And I inject the script "scripts/chargify.js"
    Then the "#subscription_coupon_code" field should contain "SUPERFREE"
    And I wait 2 seconds
    Then I should see "Coupon Valid"
