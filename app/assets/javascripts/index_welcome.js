(function() {
    $(document).ready(function() {
        // tzuhan
        $("a").click(function() {
            $(this).addClass('.clicked');
            console.log("add clicked");
        });
        $("div.clicked").click(function() {
            $(this).removeClass('.clicked');
        });

        // Yo
        var foldingList = $('.folding'),
            foldingListHeight = $('.folding').height(),
            topElemOffset = foldingList.offset().top;
        // Function responsible for unfolding the list
        unfold = function() {
            setTimeout(function() {
                if (!foldingList.hasClass('folded')) {
                    foldingList.addClass('folded');
                    return;
                }
            }, 500);
        }

        // Fold/Unfold the list
        $('.connect').on("click", function() {
            if ($(this).hasClass('bt1')) {
                $('.qt1').toggleClass('folded');
            };
            if ($(this).hasClass('bt2')) {
                $('.qt2').toggleClass('folded');
            };
            if ($(this).hasClass('bt3')) {
                $('.qt3').toggleClass('folded');
            };
            if ($(this).hasClass('bt4')) {
                $('.qt4').toggleClass('folded');
            };
            if ($(this).hasClass('bt5')) {
                $('.qt5').toggleClass('folded');
            };
            if ($(this).hasClass('bt6')) {
                $('.qt6').toggleClass('folded');
            };
            if ($(this).hasClass('bt7')) {
                $('.qt7').toggleClass('folded');
            };
            if ($(this).hasClass('bt8')) {
                $('.qt8').toggleClass('folded');
            };
        });
        // If needed, unfold the list right away
        if (topElemOffset <= $(window).height() - foldingListHeight)
            unfold();
        // Check whether to unfold the list when scrolling/resizing
        $(window).on("scroll resize", function() {
            var th = $(this);
            if (th.scrollTop() + th.height() - foldingListHeight >= 3 * topElemOffset)
                unfold();
        })


        // Eric

        var robotDiv = $('#robot-div');
        $('#take-action-btn').on('click', triggerTakeAction);

        function triggerTakeAction(evt) {
            robotDiv.animate({
                'height': '300px',
            });
        };



        //Yo
        $('.answer').on('click', function() {
            $(this).toggleClass('active btn-warning btn-default');
        });

        var toduration = 2000;
        $('.qt1').find('.answer').on('click', function() {
            if ($(this).hasClass('correct')) {
                var notify = humane.create({
                    timeout: toduration,
                    baseCls: 'humane-bigbox'
                })
                notify.log('（V）<br>太棒了！請繼續往下一題前進～');
                $('.humane-bigbox').css({
                    "background": "rgba(84, 173, 71, 0.93)"
                });
                setTimeout(function() {
                    $('.qt1').addClass('folded');
                    $('.qt1').find('.correct').removeClass('btn-warning').addClass('btn-default');
                }, toduration + 500);
            } else {
                var notify = humane.create({
                    timeout: 2000,
                    baseCls: 'humane-bigbox'
                })
                notify.log('（X）<br>答錯了，看清楚再好好作答哦～');
                $('.humane-bigbox').css({
                    "background": "rgba(196, 57, 57, 0.93)"
                });
                setTimeout(function() {
                    $('.qt1').find('.wrong').removeClass('btn-warning').addClass('btn-default');
                }, toduration);

            }



        })








    });








})();

$(document).ready(function() {
    $('.tinmancontainer').css('left', -$('.tinmancontainer').outerWidth());
    $('#tinman').click(function() {
        $('.tinmancontainer').animate({
            left: parseInt($('.tinmancontainer').css('left'), 10) == 0 ? -$('.tinmancontainer').outerWidth() : 0
        });
    });
});
