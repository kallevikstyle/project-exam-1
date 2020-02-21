(function() {
    const hamburgerMenu = document.querySelector('#hamburger-menu'),
        menuClose = document.querySelector('#menu-close'),
        mainNavigation = document.querySelector('#main-navigation'),
        mobileScreen = window.matchMedia("(max-width: 481px)");
    let screenWidth = window.innerWidth;

    // Set menu to invisible if screen is 481px or less
    if (mobileScreen.matches) {
        mainNavigation.classList.add('invisible');
    }
    // Event listener to show/hide menu
    hamburgerMenu.addEventListener('click', function() {
        mainNavigation.classList.toggle('invisible');
    });
    menuClose.addEventListener('click', function () {
        mainNavigation.classList.add('invisible');
    });
    // Add eventlistener to catch window resize to larger width
    window.addEventListener('resize', function() {
        if (screenWidth > 481) {
            mainNavigation.classList.remove('invisible');
        } 
    })
    // Add eventlistener to catch window resize to smaller screen
    window.addEventListener('resize', function () {
        if (mobileScreen.matches) {
            mainNavigation.classList.add('invisible');
        }   
    });
})();