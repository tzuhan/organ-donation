(function() {
    $(document).ready(function() {
        $('p.continue').on('click', function() {
            var $this = $(this);
            $this.parents()
                    .find('.story')
                        .css('height', '100%')
                    .find('.story-content')
                        .css('height', '100%');
            $this.parent().find('.gradient').remove();
            $this.remove();
        })
    });
})();