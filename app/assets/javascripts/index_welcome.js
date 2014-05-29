(function() {
    $(document).ready(function() {
        // tzuhan
        $("a").click(function(){
            $(this).addClass('.clicked');
            console.log("add clicked");
        });
        $("div.clicked").click(function(){
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
            if (th.scrollTop() + th.height() - foldingListHeight >= 3*topElemOffset)
                unfold();
        })


        // Eric

        var robotDiv = $('#robot-div');
        $('#take-action-btn').on('click', triggerTakeAction);

        function triggerTakeAction(evt) {
            robotDiv.animate({
                'height': '300px',
            });
        }
    });
})();