/*globals $*/
$(function () {

    $("#submit").validateSubmit();

    $("#login").inputText({
        placeholder: "twoj nick"
    });
    $("#firstname").inputText({
        placeholder: "Imię"
    }).validateRegex({
        regex: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/
    });

    $("#email").inputText({
        placeholder: "yourmail@sss.com"
    }).validateEmail();


    $("#password").validatePassword();

    $("#passwordentropy").validatePasswordEntropy();

    $("#postcode").validatePostCode();




});