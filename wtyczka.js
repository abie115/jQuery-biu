/*globals $*/
$(function () {
    $("#login").inputText({
        placeholder: "twoj nick"
    });  
    $("#firstname").inputText({
        placeholder: "Imię"
    }).keyup(function () {
        $("#firstname").validateRegex({regex: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/});
    });
    $("#email").inputText({
        placeholder: "yourmail@sss.com"
    }).keyup(function () {
        $("#email").validateEmail();
    });
    $("#password").keyup(function () {
        $("#password").validatePassword();
    });
     $("#passwordentropy").keyup(function () {
        $("#passwordentropy").validatePasswordEntropy();
    });
});
