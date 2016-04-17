/*globals $, jQuery, console */
$(function () {
    $.fn.inputText = function (options) {
        return this.each(function () {
            var settings = $.extend({
                placeholder: $(this).attr('name'),
                colorPlaceholder: "#a4a4a4",
                colorFont: "black",
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
    $.fn.validateRegex = function (options) {
        return this.each(function () {
            if (options.regex.test($(this).val())) {
                $(this).removeClass("invalid").addClass("valid");
            } else {
                $(this).removeClass("valid").addClass("invalid");
            }
        });
    };

    $.fn.validateEmail = function () {
        return this.each(function () {
            var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (pattern.test($(this).val())) {
                $(this).removeClass("invalid").addClass("valid");
            } else {
                $(this).removeClass("valid").addClass("invalid");
            }
        });
    };
    $.fn.validatePassword = function () {
        return this.each(function () {
            var points = 0;
            var password = $(this).val();
            var word = {
                number: /^[0-9]+$/.test(password),
                lower: /^[a-z]+$/.test(password),
                upper: /^[A-Z]+$/.test(password),
                special: /^\W+$/.test(password)
            };
            var characters = {
                number: /[0-9]/.test(password),
                lower: /[a-z]/.test(password),
                upper: /[A-Z]/.test(password),
                special: /\W/.test(password)
            };

            var addPoint = ({
                background: "url(images/circle2.png) no-repeat 0 30%"
            });
            var removePoint = ({
                background: "url(images/circle1.png) no-repeat 0 30%"
            });

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
                //+1pkt za znak specjalny, jesli wszystkie nei sa znakami specjalnymi
                if (!word.special & characters.special) {
                    // console.log(password.match(/\W/g).length);
                    points += password.match(/\W/g).length;

                }

                if (characters.lower & characters.upper) {
                    points += 5;
                    console.log("bonus pomiesznae litery ");
                }
                if (characters.special & characters.number & (characters.lower || characters.upper)) {
                    console.log("bonus pomiesznae litery liczby znaki");
                    points += 20;
                } else if (characters.number & (characters.lower || characters.upper)) {
                    console.log("bonus pomiesznae litery liczby");
                    points += 10;
                }

                //console.log(password.length + " punkty same " + points);
                var repeat = 0;
                var passwordTab = password.split('');
                var chars = [];

                //liczymy ilosc powtorzen danego symbolu, np dla password
                // 121134 1 zostala powtorzona 2 razy
                $(passwordTab).each(function (i) {
                    var symbol = passwordTab[i];

                    if (chars.indexOf(symbol.toString()) == -1) {
                        chars.push(passwordTab[i]);
                        //     console.log(symbol + " " + chars.indexOf(symbol.toString()));

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

                if (points >= 58) {
                    $("#point1").css(addPoint);
                    $("#point2").css(addPoint);
                    $("#point3").css(addPoint);
                    $(this).removeClass("invalid").addClass("valid");
                } else if (points >= 40) {
                    $("#point3").css(removePoint);
                    $("#point1").css(addPoint);
                    $("#point2").css(addPoint);
                    $(this).removeClass("invalid").addClass("valid");
                } else if (points >= 30) {
                    $("#point3").css(removePoint);
                    $("#point2").css(removePoint);
                    $("#point1").css(addPoint);
                    $(this).removeClass("valid").addClass("invalid");
                } else {
                    $("#point1").css(removePoint);
                    $("#point2").css(removePoint);
                    $("#point3").css(removePoint);
                    $(this).removeClass("valid").addClass("invalid");
                }
                //  console.log("ile tych samych " + repeat);

                console.log(password.length + " punkty" + points);

            } else {
                console.log(password.length + " zbyt krotkie");
                $("#point1").css(removePoint);
                $("#point2").css(removePoint);
                $("#point3").css(removePoint);
                $(this).removeClass("valid").addClass("invalid");
            }

        });
    };

    $.fn.validatePasswordEntropy = function () {
        return this.each(function () {
            var password = $(this).val();
            var n = 0;
            var entropyChar = 0;

            var entropyPassword = 0;
            
            var characters = {
                number: /[0-9]/.test(password),
                lower: /[a-z]/.test(password),
                upper: /[A-Z]/.test(password),
                special: /\W/.test(password)
            };
            var countCharacters = {
                number: 10,
                lower: 26,
                upper: 26,
                special: 32
            };
            //sprawdzam wystepowanie znakow
            if (characters.number) {
                n += countCharacters.number;
            }
            if (characters.lower) {
                n += countCharacters.lower;
            }
            if (characters.upper) {
                n += countCharacters.upper;
            }
            if (characters.special) {
                n += countCharacters.special;
            }

            entropyChar = Math.log2(n);
            console.log("entropia znaku" + entropyChar);

            entropyPassword = entropyChar * password.length;
            console.log("entropia hasla" + entropyPassword);

             if (entropyPassword>=60) {
                $(this).removeClass("invalid").addClass("valid");
            } else {
                $(this).removeClass("valid").addClass("invalid");
            }
          
        });
    };
}(jQuery));