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
    $.fn.validatePassword = function () {
        return this.each(function () {
            var points = 0;
            var password = $(this).val();
            var word = {
                number: /^[0-9]+$/.test(password),
                letter: /^\D+$/.test(password),
                lower: /^[a-z]+$/.test(password),
                upper: /^[A-Z]+$/.test(password),
                special: /^\W+$/.test(password)
            };
            var characters = {
                number: /[0-9]/.test(password),
                letter: /\D/.test(password),
                lower: /[a-z]/.test(password),
                upper: /[A-Z]/.test(password),
                special: /\W/.test(password)
            };

            if (password.length >= 6) {
                //za kazdy znak +5 pkt
                points = password.length * 5;
                //-2pkt za kazda litere jeesli hasło ma same liczby lub male litery lub duze litery lub znaki spcjalne
                if (word.number) {
                    console.log("same liczby");
                    points -= password.length * 2;
                }
                if (word.lower) {
                    console.log("same male litery");
                    points -= password.length * 2;
                }
                if (word.upper) {
                    console.log("same duze litery");
                    points -= password.length * 2;
                }
                if (word.special) {
                    console.log("same znaki specjalne");
                    points -= password.length * 2;
                }

                if (characters.lower & characters.upper) {
                    points += 5;
                    console.log("bonus pomiesznae litery ");
                } else if (characters.number & (characters.lower || characters.upper)) {
                    console.log("bonus pomiesznae litery liczby");
                    points += 10;
                } else if (characters.number & (characters.lower || characters.upper) & characters.special) {
                    console.log("bonus pomiesznae litery liczby znaki");
                    points += 20;
                }

                console.log(password.length + " punkty same " + points);
                var repeat = 0;
                var passwordTab = password.split('');
                var chars = [];

                //liczymy ilosc powtorzen danego symbolu, np dla password
                // 121134 1 zostala powtorzona 2 razy
                $(passwordTab).each(function (i) {
                    var symbol = passwordTab[i];

                    if (chars.indexOf(symbol.toString()) == -1) {
                        chars.push(passwordTab[i]);
                        console.log(symbol + " " + chars.indexOf(symbol.toString()));

                        $(passwordTab).each(function (j) {
                            j = i + j + 1;

                            if (j <= password.length) {
                                if (passwordTab[j] == symbol) {
                                    repeat++;
                                }
                            }
                        });
                    }
                });

                //-1pkt za kazde powtorzenie
                points -= repeat;

                console.log("ile tych samych " + repeat);

                console.log(password.length + " punkty" + points);

            } else {
                console.log(password.length + " zbyt krotkie");
            }




        });
    };
}(jQuery));