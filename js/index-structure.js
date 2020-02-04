// Make top-container occupy all vertical space between header and the fold
function setTopContainerHeight(height) {
    const pageHeaderHeight = document.querySelector('#page-header').offsetHeight,
        topContainer = document.querySelector('#top-container');
    // Set container height to window height minus header
    topContainer.style.height = (height - pageHeaderHeight) + "px";
}

// Find the height of the current viewport
(function findViewportHeight() { 
    let windowHeight = document.documentElement.clientHeight;
    // Call function to set container height
    setTopContainerHeight(windowHeight);

    // Change top-container height if window is resized
    window.addEventListener('resize', function() {
        // Set timeout to avoid excess execution
        setTimeout(function () {
            if (document.documentElement.clientHeight !== windowHeight) {
                // Update container height if window height has changed
                windowHeight = document.documentElement.clientHeight;
                setTopContainerHeight(windowHeight);
            }
        }, 600);   
    });
})();