/*globals $*/
$(function () {
    $("#login").inputText({
        placeholder: "twoj nick"
    });
    $("#email").inputText({
        placeholder: "yourmail@ex.com"
    }).keyup(function () {
        $("#email").validateEmail();
    });
});