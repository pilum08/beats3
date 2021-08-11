;
(function() {
    const sections = $("section");
    const display = $(".maincontent");
    const fixMenu = $(".fixed-menu");
    const menuItems = fixMenu.find(".fixed-menu__item");
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();
    let inScroll = false;

    sections.first().addClass("active-section");
    const countSectionPosition = sectionEq => {
        const position = sectionEq * -100;
        if (isNaN(position)) {
            console.error("Передано не верное значение в countSectionPosition");
            return 0;
        }
        return position;

    };
    const changeMenuThemeForSection = sectionEq => {
        const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr("data-fix-menu-color");
        const activeClass = "fixed-menu--white";

        if (menuTheme == "light") {
            fixMenu.addClass(activeClass);
        } else {
            fixMenu.removeClass(activeClass);
        }

    };
    const resetActiveClassForItem = (items, itemEq, activeClass) => {
        items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
    }

    const performTransiton = (sectionEq) => {
        if (inScroll) return;
        const transitionOver = 1000;
        const mouseInertiaOver = 300;
        inScroll = true;
        const position = countSectionPosition(sectionEq);
        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });
        resetActiveClassForItem(sections, sectionEq, "active-section");

        setTimeout(() => {
            inScroll = false;
            resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");

        }, transitionOver + mouseInertiaOver);
    };



    const vieportScroller = () => {
        const activeSection = sections.filter(".active-section");
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();

        return {
            next() {
                if (nextSection.length) {
                    performTransiton(nextSection.index());
                }
            },
            prev() {
                if (prevSection.length) {
                    performTransiton(prevSection.index());
                }
            }
        }
    }

    $(window).on("wheel", e => {
        const deltaY = e.originalEvent.deltaY;
        const scroller = vieportScroller();
        if (deltaY > 0) {
            scroller.next();
        }
        if (deltaY < 0) {
            scroller.prev();
        }
    });
    $(window).on("keydown", e => {
        const tagName = e.target.tagName.toLowerCase();
        const userTypingInInputs = tagName == tagName == "input" || tagName == "textarea";
        const scroller = vieportScroller();
        if (userTypingInInputs) return;
        switch (e.keyCode) {
            case 38:
                scroller.prev;
                break;
            case 40:
                scroller.next;
                break;
        }
    });
    $("wrapper").on("touchmove", e => e.preventDefault());

    $("[data-scroll-to]").click(e => {
        e.preventDefault();
        const nav = $(".active")
        const $this = $(e.currentTarget);
        const target = $this.attr("data-scroll-to");
        const reqSection = $(`[data-section-id=${target}]`);
        nav.css({ display: "none" });
        performTransiton(reqSection.index());
    });
    if (isMobile) {
        $("body").swipe({

            swipe: function(event, direction) {
                const scroller = vieportScroller();
                let scrollDirection = "";
                if (direction == "up") scrollDirection = "next";
                if (direction == "down") scrollDirection = "prev";

                scroller[scrollDirection]();
            },
        });
    }
})()