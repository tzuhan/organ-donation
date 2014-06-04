(function() {
    $(document).ready(function() {
    	
		/*----------------------------------------------------*/
		// scroll icons by Han
		/*----------------------------------------------------*/  	
        $("a").click(function(){
        	//stop jump to #section by default
        	//event.preventDefault();
        	
        	$("div.clicked").removeClass('clicked');
            $(this).find("div").toggleClass('clicked');
			var offset = $($(this).attr("href")).offset().top;
			//$(this)
            $('html, body').animate({scrollTop: offset}, 1000);
			
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
        };

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
        });


        // Eric

        var robotDiv = $('#robot-div');
		$('#take-action-btn').on('click', triggerTakeAction);

        function triggerTakeAction(evt) {
            robotDiv.animate({
                'height': '300px',
            });
        }
        
        //////////////////////////////////////
        //Yo /////////////////////////////////
        //////////////////////////////////////
        $('.tinmanbox').css('left',-$('.tinmanbox').outerWidth());
		$('#tinman').click(function() {
			$('.tinmanbox').animate({
				left: parseInt($('.tinmanbox').css('left'),10) == 0 ? -$('.tinmanbox').outerWidth() : 0
		    });
		    //hide or show tinmanbox this.toggle();
		});
        //DOM element is not ready outside this function
		var img1Height = $("#introimg1").offset().top;
		var img2Height = $("#introimg2").offset().top;
		var img3Height = $("#introimg3").offset().top;

		$('#introimg1').stick_in_parent();
		$('#introimg2').stick_in_parent();
		
    });
})();

