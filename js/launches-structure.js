// Set top offset value to all sections to compensate for header height
function setContentOffset(pageHeaderHeight) {
    const pageSection = document.querySelectorAll('#background-image > *');
    
    for(let i = 0; i < pageSection.length; i++) {
    	pageSection[i].style.top = pageHeaderHeight + "px";
    }
    
}
// Find height of page header
(function findHeaderHeight() {
    const pageHeaderHeight = document.querySelector('#page-header').offsetHeight;

    setContentOffset(pageHeaderHeight);
})();