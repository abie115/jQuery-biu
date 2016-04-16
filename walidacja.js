/*globals $, jQuery, console */
$(function () {
    $.fn.inputText = function (options) {
        return this.each(function () {
            var settings = $.extend({
                placeholder: $(this).attr('name'),
                colorPlaceholder: "#a4a4a4",
                colorFont: "black"
            }, options);

            var defaultPlaceholder = settings.placeholder;
            var defaultColorFont = ({
                color: settings.colorFont
            });
            var defaultColorPlaceholder = ({
                color: settings.colorPlaceholder
            });

            $(this).val(defaultPlaceholder).css(defaultColorPlaceholder);
            $(this).focus(function () {
                if ($(this).val() === defaultPlaceholder) {
                    $(this).val("").css(defaultColorFont);
                }
            });
            $(this).blur(function () {
                if ($(this).val() === "") {
                    $(this).val(defaultPlaceholder).css(defaultColorPlaceholder);
                }
            });
        });
    };
       
    $.fn.validateEmail = function () {
        return this.each(function () {
            var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (pattern.test($(this).val())) {
                $(this).css("border", "1px solid green");
                console.log("dobry mail");
            } else {
                $(this).css("border", "1px solid red");
                console.log("zly");
            }
        });
    };
  
}(jQuery));