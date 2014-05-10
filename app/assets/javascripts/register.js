// temp disabled

(function() {
    $(document).ready(function() {
        console.log('haah')
        var allSteps = $('.action-steps');
        var stepFirst = allSteps.first();
        stepFirst.find('img').on('click', function(evt) {
            console.log(stepFirst.find('form'));
            stepFirst.find('form').slideDown();
            this.remove();
        });
        stepFirst.next().find('img').on('click', function(evt) {
            this.remove();
        })
    });
})();