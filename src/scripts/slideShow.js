;
(function() {
    const findBlock = (alias) => {
        return $('.reviews__item').filter((ndx, item) => {
            return $(item).attr('data-linked-with') == alias;
        });
    };
    $('.interactive-avatar__link').click((e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const target = $this.attr('data-open');
        const showItem = findBlock(target);
        const currrentItem = $this.closest('.reviews__selector-item')
        showItem.addClass('reviews__item--active').siblings().removeClass('reviews__item--active')
        currrentItem.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
    })
})()