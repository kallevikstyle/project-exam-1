// Set top offset value to compensate for header height
function setContentOffset(pageHeaderHeight) {
    const pageSection = document.querySelector('#background-image > *');
    
    pageSection.style.top = pageHeaderHeight + "px";
}
// Find height of page header
(function findHeaderHeight() {
    const pageHeaderHeight = document.querySelector('#page-header').offsetHeight;

    setContentOffset(pageHeaderHeight);
})();