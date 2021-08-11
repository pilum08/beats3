;
(function() {
    const slider = $('.slider__list').bxSlider({
        pager: false,
        controls: false,
        //touchEnabled: false
    });

    $('.slider__button--left').click(e => {
        e.preventDefault();
        slider.goToPrevSlide();
    })
    $('.slider__button--right').click(e => {
        e.preventDefault();
        slider.goToNextSlide();
    });

})()