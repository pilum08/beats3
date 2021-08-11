;
(function() {
    $(document).ready(function() {
        let name = $('.member__name');
        name.on('click', function(e) {
            e.preventDefault();
            let dropDown = $('.member__dropdown');
            dropDown.slideUp(200);
            name.removeClass('member__name--open');
            name.addClass('member__name--closed');
            if (!$(this).next().is(":visible")) {
                $(this).next().slideDown(200);
                $(this).addClass('member__name--open');
                $(this).removeClass('member__name--closed');
            };
        });

    });
})()