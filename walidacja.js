/*globals jQuery*/
(function ($) {
    $.fn.inputText = function (options) {
        return this.each(function () {
            var settings = $.extend({
                placeholder: $(this).attr("name"),
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
                var pattern = /^([\w-]+(\.?[\w-]+)*)@((([\w-]+\.)?)*\w[\w-]{0,50})\.([a-zA-Z]{2,})$/;
                if (pattern.test($(this).val())) {
                    $(this).removeClass("invalid").addClass("valid");

                } else {
                    $(this).removeClass("valid").addClass("invalid");

                }
                formValid($(this));
            });
        });
    };
    $.fn.validatePassword = function (options) {
        return this.each(function () {
            $(this).keyup(function () {
                var points = 0;
                var password = $(this).val();
                 var settings = $.extend({
                    maxLength: 6,
                    addPoint: "url(images/circle2.png) no-repeat 0 30%",
                    removePoint: "url(images/circle1.png) no-repeat 0 30%"
                 }, options);

                var word = {
                    number: /^[0-9]+$/.test(password),
                    lower: /^[a-z]+$/.test(password),
                    upper: /^[A-Z]+$/.test(password),
                    special: /^\W+$/.test(password)
                };
                var character = {
                    number: /[0-9]/.test(password),
                    lower: /[a-z]/.test(password),
                    upper: /[A-Z]/.test(password),
                    special: /\W/.test(password)
                };
                
                var defaultMaxLength = settings.maxLength;

                var addPoint = ({
                    background: settings.addPoint
                });
                var removePoint = ({
                    background: settings.removePoint
                });

                if (password.length >= defaultMaxLength ) {
                    //za kazdy znak +5 pkt
                    points += password.length * 5;
                    //-2pkt za kazdy znak jeesli hasło ma same liczby lub male litery lub duze litery lub znaki spcjalne
                    if (word.number) {
                        points -= password.length * 2;
                    }
                    if (word.lower) {
                        points -= password.length * 2;
                    }
                    if (word.upper) {
                        points -= password.length * 2;
                    }
                    if (word.special) {
                        points -= password.length * 2;
                    }
                    //+1pkt za kazdy znak specjalny, wtedy gdy wszystkie nie sa znakami specjalnymi
                    if (!word.special && character.special) {
                        points += password.match(/\W/g).length;
                    }

                    if (character.lower && character.upper) {
                        points += 5;
                    }
                    
                    if (character.special && character.number && (character.lower || character.upper)) {
                        points += 20;
                    } else if (character.number && (character.lower || character.upper)) {
                        points += 10;
                    }
                    
                    var repeat = 0;
                    var passwordTab = password.split('');
                    var chars = {};

                    //liczymy ilosc powtorzen danego symbolu, np dla password
                    // 121134, 1 zostala powtorzona 2 razy

                    $(passwordTab).each(function (i) {
                        var symbol = passwordTab[i];
                        if (!chars.hasOwnProperty(symbol)) {
                            chars[symbol] = 1;
                        } else {
                            chars[symbol] = chars[symbol] + 1;
                        }
                    });

                    $.each(chars, function (index, value) {
                        if (value != 1) {
                            value = value - 1;
                            repeat += value;
                        }

                    });


                    //-1pkt za kazde powtorzenie
                    points -= repeat;
                    
                    //console.log(points);

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
                  
                } else {
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
                
                //zliczam ilosc wystapien znaku
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

                if (entropyPassword >= 25) {
                    $(this).removeClass("invalid").addClass("valid");
                } else {
                    $(this).removeClass("valid").addClass("invalid");
                }

                formValid($(this));

            });
        });

    };

    $.fn.validateSubmit = function () {
        return this.each(function () {
            formValid($(this));
        });
    };

    var formValid = function (object) {
        var form = object.parents("form");
        var submit = form.find("input:submit");
        var inputs = form.find("input:text, input:password");
        var invalid = false;

        $(inputs).each(function () {
            var input = $(this);
            if (!input.hasClass("valid")) {
                invalid = true;
            }
        });
        
        if (invalid) {
            submit.attr("disabled", "disabled");
        } else {
            submit.removeAttr("disabled");
        }
    };


    $.fn.validatePostCode = function (field) {
        return this.each(function () {
            $(this).keyup(function () {
                var postCodeVal = $(this).val();
                var postCode = $(this);
                $.ajax({
                    type: "GET",
                    url: "data/kody.json",
                    dataType: "json",
                    success: function (data) {                        
                        $(field).removeClass("valid").addClass("invalid");
                        postCode.removeClass("valid").addClass("invalid");
                        formValid(postCode);
                        $(data).each(function (i) {
                            if (data[i]["KOD POCZTOWY"] == postCodeVal) {
                                $(field).val(data[i]["MIEJSCOWOŚĆ"]);
                                $(field).removeClass("invalid").addClass("valid");
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