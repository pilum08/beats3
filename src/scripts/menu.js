;
(function() {
    const closeNav = document.querySelector(".cross");
    const openNav = document.querySelector(".burger");
    const nav = document.querySelector("active");

    openNav.addEventListener('click', e => {
        e.preventDefault();
        document.getElementsByClassName('active')[0].style.display = "flex";
        document.getElementsByTagName('body')[0].style.overflow = "hidden";
    });

    closeNav.addEventListener('click', e => {
        e.preventDefault();
        document.getElementsByClassName('active')[0].style.display = "none";
        document.getElementsByTagName('body')[0].style.overflow = "scroll";
    });
})()