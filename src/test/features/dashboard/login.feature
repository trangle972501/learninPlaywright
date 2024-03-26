Feature: Login 

    Background:
        Given the user navigates to the web application link

    # Scenario: Login should be success
    #     When the user enters the email adress as "trang.le@sioux.asia"
    #     When the user clicks on Sign in button
    #     Then the Dashboard page should be displayed


    @login
    Scenario: Click on sign in button after entering the email
        When the user enters the email adress as "trang.le@sioux.asia"
        When the user clicks on Sign in button
        When the user enters the verification code of "trang.le@sioux.asia" email
        Then the Dashboard page should be displayed


    # Scenario: Enter email
    #     When the user enters the email adress as "trang.le@sioux.asia"