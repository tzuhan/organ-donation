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
        })


        // Eric
        var robotDiv = $('#robot-div');
        $('#take-action-btn').on('click', triggerTakeAction);
        function triggerTakeAction(evt) {
            robotDiv.animate({
                'height': '300px',
            });
        }

        /* Info Graphics */
        var donut = new DonutChart('waiting-donut');
        var fakeData = getCurrentWaitingData();
        donut.create(fakeData);

        var bowl = new Bowls('don-rate-chart');
        var fakeDon = getIntlDonationRate();
        bowl.create(fakeDon);

        var line = new Lines('don-history');
        var fakeHist = getDonationHistory();
        line.create(fakeHist);

    });
})();

function getCurrentWaitingData() {
    return [
        {
            title: '等候移植人數',
            total: 8466,
            unit: '人',
            sub: [
                { organ: '心臟', number: 169 },
                { organ: '肺臟', number: 19 },
                { organ: '肝臟', number: 1213 },
                { organ: '腎臟', number: 6306 },
                { organ: '胰臟', number: 89 },
                { organ: '腸', number: 4 },
                { organ: '眼角膜', number: 737 }
            ],
        }
    ];
}

function getIntlDonationRate() {
    return [
        {
            nation: '台灣',
            waiting: 8000,
            donation: 800,
        },
        {
            nation: '美國',
            waiting: 117000,
            donation: 30000,
        },
        {
            nation: '日本',
            waiting: 55000,
            donation: 2000,
        }
    ];
}

// function getDonationHistory() {
//     return [
//         {
//             time: new Date('2009'),
//             cat: 0,
//             data: {
//                 type: 0,
//                 val: 797,
//             }
//         },
//         {
//             time: new Date('2008'),
//             cat: 0,
//             data: {
//                 type: 0,
//                 val: 728,
//             }
//         },
//         {
//             time: new Date('2007'),
//             cat: 0,
//             data: {
//                 type: 0,
//                 val: 337,
//             }
//         },
//         {
//             time: new Date('2006'),
//             cat: 0,
//             data: {
//                 type: 0,
//                 val: 288,
//             }
//         },
//         /*{
//             year: 2005,
//             donation: 285
//         },
//         {
//             year: 2004,
//             donation: 323
//         },*/
//     ];
// }
function getDonationHistory() {
    return [
        {
            type: 0,
            data: [
                { time: new Date('2009'), val: 797 },
                { time: new Date('2008'), val: 728 },
                { time: new Date('2007'), val: 337 },
                { time: new Date('2006'), val: 288 },
                { time: new Date('2005'), val: 285 },
            ]
        },
        {
            type: 1,
            data: [
                { time: new Date('2009'), val: 97 },
                { time: new Date('2008'), val: 72 },
                { time: new Date('2007'), val: 37 },
                { time: new Date('2006'), val: 88 },
                { time: new Date('2005'), val: 85 },
            ]
        },
        {
            type: 2,
            data: [
                { time: new Date('2009'), val: 222 },
                { time: new Date('2008'), val: 722 },
                { time: new Date('2007'), val: 370 },
                { time: new Date('2006'), val: 302 },
                { time: new Date('2005'), val: 540 },
            ]
        },
        /*
        {
            year: 2004,
            donation: 323
        },*/
    ];
}


$(document).ready(function() {
  $('.tinmancontainer').css('right',-$('.tinmancontainer').outerWidth());
  $('#tinman').click(function() {
    $('.tinmancontainer').animate({
      right: parseInt($('.tinmancontainer').css('right'),10) == 0 ?
        -$('.tinmancontainer').outerWidth() :
        0
    });
  });
});
