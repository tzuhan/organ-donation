(function() {
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
    foldingListHeight = $('.folding').height();
    topElemOffset = foldingList.offset().top,
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
        foldingList.toggleClass('folded');
    })
    // If needed, unfold the list right away
    if (topElemOffset <= $(window).height() - foldingListHeight)
        unfold();
    // Check whether to unfold the list when scrolling/resizing
    $(window).on("scroll resize", function() {
        var th = $(this);
        if (th.scrollTop() + th.height() - foldingListHeight >= 3*topElemOffset)
            unfold();
    })

})();