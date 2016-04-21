/*globals $*/
$(function () {

    $("#submit").validateSubmit();

    $("#firstname").inputText({
        placeholder: "Imię"
    }).validateRegex({
        regex: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/
    });

    $("#email").inputText({
        placeholder: "yourmail@example.com"
    }).validateEmail();


    $("#password").validatePassword({
        maxLength:7
    });

    $("#passwordentropy").validatePasswordEntropy();

    $("#postcode").inputText({
        placeholder: "XX-XXX"
    }).validatePostCode();




});