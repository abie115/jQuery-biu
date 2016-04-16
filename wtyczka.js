/*globals $*/
$(function () {
    $("#login").inputText({
        placeholder: "twoj nick"
    });
    $("#email").inputText({
        placeholder: "yourmail@sss.com"
    }).keyup(function () {
        $("#email").validateEmail();
    });
    $("#password").keyup(function () {
        $("#password").validatePassword();
    });
});
