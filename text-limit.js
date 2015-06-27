(function () {
    "use strict";

    function declOfNum(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    $.fn.limiter = function(options) {

        var options = $.extend({}, options);

        var Limiter = function (options) {
            var $field = $(options.el),
                $limitLabel = $("#" + $field.data("label")),
                limit = parseInt($field.data("limit"), 10) || false;

            function init () {
                if (limit) {
                    bindEvents();
                    onChangeField();
                }
            }

            function bindEvents () {
                $field.on("keyup keypress input cut copy paste change click", onChangeField);
            }

            function onChangeField () {
                var wordcount = getWordcount();

                if (isLimit(wordcount)) {
                    $field.val($field.val().substr(0, limit));
                    wordcount = getWordcount();
                }

                var count = limit - wordcount,
                    label = [
                        declOfNum(count, ['Остался', 'Осталось', 'Осталось']),
                        count,
                        declOfNum(count, ['символ', 'символа', 'символов'])
                    ].join(" ");

                $limitLabel.text(label);
            }

            function getWordcount () {
                return $field.val().length;
            }

            function isLimit (wordcount) {
                if (wordcount >= limit) {
                    return true;
                }
                else {
                    return false;
                }
            }

            function isShowLabel (wordcount) {
                if (wordcount >= countOfShowLimit) {
                    return true;
                }
                else {
                    return false;
                }
            }

            init();
        };

        function make () {
            new Limiter({el: this});
        }

        return this.each(make);
    };

    // Auto initialization
    $("[data-limit]").limiter();
})();