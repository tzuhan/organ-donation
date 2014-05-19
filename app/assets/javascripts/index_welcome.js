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
        var foldingList = $('.folding');
        console.log(foldingList);
        var foldingListHeight = $('.folding').height(),
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


        // Eric
        var robotDiv = $('#robot-div');
        $('#take-action-btn').on('click', triggerTakeAction);

        function triggerTakeAction(evt) {
            robotDiv.animate({
                'height': '300px',
            });
        }
        $('input.bdate-input').datepicker({
            format: 'yyyy/mm/dd',
            viewMode: 2,
        });

        $('#addic-info').avgrund({
            width: $('body').width() * 0.6,
            height: 500,
            holderClass: 'ic-info',
            showClose: true,
            showCloseText: 'close',
            onBlurContainer: '.reg-div',
            //enableStackAnimation: true,
            template: '<p>立法院通過之『人體器官移植條例』第六條、第十條之一及第十一條修正條文， 業經總統府華總一義字第10000283861號令於100年12月21日公布 (刊於總統府公報第7008號第54至56頁)； 請您特別注意第六條之新規定：</p>' +
            '<div>' +
            '<p>醫師自屍體摘取器官，以合於下列規定之一者為限：</p>' +
            '<p>一、經死者生前以書面或遺囑同意。</p>' +
            '<p>二、經死者最近親屬以書面同意。</p>' +
            '<p>前項第一款書面同意之格式，由中央主管機關定之； 中央主管機關應將其加註於全民健康保險憑證(以下稱健保卡)， 該意願註記之效力與該書面同意正本相同。 但意願人得隨時自行以書面撤回其意願之意思表示， 並應通報中央主管機關廢止該註記。 經註記於健保卡之器官捐贈意願， 與意願人臨床醫療過程中明示之意思表示不一致時，以意願人明示之意思表示為準。 第一項第一款書面同意， 應由醫療機構或衛生機關以掃描電子檔存記於中央主管機關之資料庫。</p>' +
            '</div>' +
            '<p>請您了解：現行『經註記於健保卡之器官捐贈意願』， 即屬『具法律效力之同意』，與過往僅屬『意願的私下表達』全然不同。 如果您確定同意此項註記，請您於完成線上簽卡後， 務必下載列印書面同意書， 簽署後寄回協會：</p>' +
            '<div>' +
            '<p>10683 台北市大安區信義路四段26號3樓之一</p>' +
            '<p>社團法人中華民國器官捐贈協會　收</p>' +
            '</div>' +
            '<p>該文書亦將依規定以『掃描電子檔存記於中央主管機關之資料庫』。 爾後，如果您因故欲撤除該意願註記，亦煩請洽本協會(電話:02-27025150)。</p>'
       });
    });
})();