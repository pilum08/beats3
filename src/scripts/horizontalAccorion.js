;
(function() {
    const calcWidth = item => {
        let reqItemWidth = 0;
        const screenWidth = $(window).width();
        const container = item.closest(".horizontal-accordion__list");
        const titleBloks = container.find(".horizontal-accordion__link");
        const titleWidth = titleBloks.width() * titleBloks.length;
        const textBlockWidth = screenWidth - titleBloks.width();
        const textBlock = item.find(".horizontal-accordion__text-content");
        const paddingLeft = parseInt(textBlock.css("padding-left"));
        const paddingRight = parseInt(textBlock.css("padding-right"));
        const isTablet = window.matchMedia("(max-width: 768px)").matches;
        const isPhone = window.matchMedia("(max-width: 480px)").matches;
        if (isPhone) {
            reqItemWidth = textBlockWidth;
        } else if (isTablet) {
            reqItemWidth = screenWidth - titleWidth
        } else {
            reqItemWidth = 524;
        }
        return {
            container: reqItemWidth,
            textContainer: reqItemWidth - paddingLeft - paddingRight
        }

    }
    const closeEveryItem = container => {
        const items = container.find(".horizontal-accordion__text");
        const itemContainer = container.find(".horizontal-accordion__item");
        itemContainer.removeClass("active");
        itemContainer.removeClass("horizontal-accordion__item--phone");
        items.width(0);
    }

    const openItem = (item) => {
        const itemContainer = item.closest(".horizontal-accordion__item");
        const contentBlock = item.find(".horizontal-accordion__text");
        const textBlock = item.find(".horizontal-accordion__text-content");
        const reqWidth = calcWidth(item);
        const isPhone = window.matchMedia("(max-width: 480px)").matches;
        itemContainer.addClass("active");
        contentBlock.width(reqWidth.container);
        textBlock.width(reqWidth.textContainer);
        if (isPhone) {
            itemContainer.addClass("horizontal-accordion__item--phone");
        }


    }
    $(".horizontal-accordion__link").on("click", e => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const item = $this.closest(".horizontal-accordion__item");
        const container = item.closest(".horizontal-accordion__list");
        if (item.hasClass("active")) {
            closeEveryItem(container);
        } else {
            closeEveryItem(container);
            openItem(item);
        }
    });
})()