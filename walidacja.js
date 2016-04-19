/*globals $, jQuery, console */
(function ($) {
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
    $.fn.validateRegex = function (options) {
        return this.each(function () {
            $(this).keyup(function () {
                if (options.regex.test($(this).val())) {
                    $(this).removeClass("invalid").addClass("valid");
                } else {
                    $(this).removeClass("valid").addClass("invalid");
                }
                formValid($(this));
            });
        });
    };

    $.fn.validateEmail = function () {
        return this.each(function () {
            $(this).keyup(function () {
                var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                if (pattern.test($(this).val())) {
                    $(this).removeClass("invalid").addClass("valid");

                } else {
                    $(this).removeClass("valid").addClass("invalid");

                }
                formValid($(this));
            });
        });
    };
    $.fn.validatePassword = function () {
        return this.each(function () {
            $(this).keyup(function () {
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

                if (password.length /*>= 6*/ ) {
                    //za kazdy znak +5 pkt
                    points = password.length * 5;
                    //-2pkt za kazda litere jeesli hasło ma same liczby lub male litery lub duze litery lub znaki spcjalne
                    if (word.number) {
                        // console.log("same liczby");
                        points -= password.length * 2;
                    }
                    if (word.lower) {
                        //   console.log("same male litery");
                        points -= password.length * 2;
                    }
                    if (word.upper) {
                        //console.log("same duze litery");
                        points -= password.length * 2;
                    }
                    if (word.special) {
                        // console.log("same znaki specjalne");
                        points -= password.length * 2;
                    }
                    //+1pkt za znak specjalny, jesli wszystkie nei sa znakami specjalnymi
                    if (!word.special & characters.special) {
                        // console.log(password.match(/\W/g).length);
                        points += password.match(/\W/g).length;

                    }

                    if (characters.lower & characters.upper) {
                        points += 5;
                        // console.log("bonus pomiesznae litery ");
                    }
                    if (characters.special & characters.number & (characters.lower || characters.upper)) {
                        //    console.log("bonus pomiesznae litery liczby znaki");
                        points += 20;
                    } else if (characters.number & (characters.lower || characters.upper)) {
                        //console.log("bonus pomiesznae litery liczby");
                        points += 10;
                    }

                    //console.log(password.length + " punkty same " + points);
                    var repeat = 0;
                    var passwordTab = password.split('');
                    var chars = {};

                    //liczymy ilosc powtorzen danego symbolu, np dla password
                    // 121134 1 zostala powtorzona 2 razy

                    $(passwordTab).each(function (i) {
                        var symbol = passwordTab[i];

                        if (!chars.hasOwnProperty(symbol)) {
                            console.log(symbol + " nie ma");
                            chars[symbol] = 1;
                        } else {
                            chars[symbol] = chars[symbol] + 1;
                        }
                    });

                    $.each(chars, function (index, value) {
                        if (value != 1) {
                            //odejmuje 1, bo chce "nadwyzke" el;
                            value = value - 1;
                            repeat += value;
                        }

                    });


                    //-1pkt za kazde powtorzenie
                    points -= repeat;
                    console.log(repeat);
                    console.log(points);

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

                    //   console.log(password.length + " punkty" + points);

                } else {
                    // console.log(password.length + " zbyt krotkie");
                    $("#point1").css(removePoint);
                    $("#point2").css(removePoint);
                    $("#point3").css(removePoint);
                    $(this).removeClass("valid").addClass("invalid");
                }
                formValid($(this));
            });
        });
    };

    $.fn.validatePasswordEntropy = function () {
        return this.each(function () {
            $(this).keyup(function () {
                var password = $(this).val();
                var passwordTab = password.split('');
                var chars = {};
                var entropyChar = 0;
                var entropyPassword = 0;
                
                //zliczam ilosci wystapien znaku
                $(passwordTab).each(function (i) {
                    var symbol = passwordTab[i];

                    if (!chars.hasOwnProperty(symbol)) {
                        chars[symbol] = 1;
                    } else {
                        chars[symbol] = chars[symbol] + 1;
                    }
                });

                //zliczam prawdopodobienstwa kazdego znaku  
                $.each(chars, function (index, value) {
                    chars[index] = value / password.length;
                });

                $.each(chars, function (index, prob) {
                    entropyChar += -(prob * Math.log2(prob));
                });
                
                entropyPassword = entropyChar * password.length;
             //   console.log(entropyChar + "entropia: " + entropyPassword);

                if (entropyPassword >= 25) {
                    $(this).removeClass("invalid").addClass("valid");
                } else {
                    $(this).removeClass("valid").addClass("invalid");
                }

                formValid($(this));

                /* entropia dla hasla generowanego losow (???)
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
                // console.log("entropia znaku" + entropyChar);

                entropyPassword = entropyChar * password.length;
                //console.log("entropia hasla" + entropyPassword);

                if (entropyPassword >= 60) {
                    $(this).removeClass("invalid").addClass("valid");
                } else {
                    $(this).removeClass("valid").addClass("invalid");
                }

                formValid($(this));*/
            });
        });

    };

    $.fn.validateSubmit = function () {
        return this.each(function () {
            formValid($(this));
        });
    };

    var formValid = function (obj) {

        var form = obj.parents('form');
        var submit = form.find(':submit');
        var inputs = form.find(':text, :password');

        var invalid = false;

        $(inputs).each(function () {
            var input = $(this);
            if (!input.hasClass("valid")) {
                invalid = true;
            }

        });
        if (invalid) {
            submit.attr('disabled', 'disabled');
        } else {
            submit.removeAttr('disabled');
        }
    };


    $.fn.validatePostCode = function () {
        return this.each(function () {
            $(this).keyup(function () {
                var postCodeVal = $(this).val();
                var postCode = $(this);
                var city;
                var firstNumber = postCodeVal.substring(0, 1);
                $.ajax({
                    type: "GET",
                    url: "kody.json",
                    dataType: "json",
                    success: function (data) {

                        $("#postcodecity").removeClass("valid").addClass("invalid");

                        postCode.removeClass("valid").addClass("invalid");

                        formValid(postCode);

                        $(data).each(function (i) {
                            if (data[i]["KOD POCZTOWY"] == postCodeVal) {

                                $("#postcodecity").val(data[i]["MIEJSCOWOŚĆ"]);
                                $("#postcodecity").removeClass("invalid").addClass("valid");

                                postCode.removeClass("invalid").addClass("valid");

                                formValid(postCode);
                            }
                        });
                    }
                });
            });
        });
    };


}(jQuery));