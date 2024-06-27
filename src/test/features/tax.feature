@exampleTag
Feature:Inventory Taxes page scenarios
    Background:
        Given Navigate to inventory
        When Login to inventory
        Then Verify home page opened
        Then Click to "Ana Veriler" sidebar menu
        Then Click to "Vergiler" list under sidebar menu


    @Tax-TC01
    Scenario:User should be able to add new tax
        Then Click to "Vergi Ekle" button
        Then Enter random name to "Adı" field
        Then Enter random number to "Oranı" field
        Then Enter random number to "Vergi Kodu" field
        Then Click to add button on pop'up
        Then Close the pop'up and verify pop'up closed
        Then Verify addition successful

    @Tax-TC02
    Scenario:User should be able to edit tax
        Then Click to action button
        Then Verify edit button and click
        Then Enter random name to "Adı" field
        Then Enter random number to "Oranı" field
        Then Enter random number to "Vergi Kodu" field
        Then Click to add button on pop'up
        Then Verify pop'up closed
        Then Verify addition successful