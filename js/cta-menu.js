const ctaMenu = (function() {
    let rockets = {
        divElement: document.querySelector('#cta-rockets'),
        normalState: "url('images/buttons/rockets_normal.png')",
        hoverState: "url('images/buttons/rockets_hover.png')",
        activeState: "url('images/buttons/rockets_active.png')"
        },
        launches = {
            divElement: document.querySelector('#cta-launches'),
            normalState: "url('images/buttons/launches_normal.png')",
            hoverState: "url('images/buttons/launches_hover.png')",
            activeState: "url('images/buttons/launches_active.png')"
        },
        down = {
            divElement: document.querySelector('#cta-down'),
            normalState: "url('images/buttons/down_normal-2.png')",
            hoverState: "url('images/buttons/down_hover-2.png')",
            activeState: "url('images/buttons/down_normal.png')",
        };

    return {
        rockets,
        launches,
        down
    }
})();

(function() {
    const rocketSymbol = document.querySelector('#cta-circle');

    // Hover states for cta buttons
    // -----------------------------
    // Rockets
    ctaMenu.rockets.divElement.addEventListener('mouseover', function() {
        ctaMenu.rockets.divElement.style.backgroundImage = ctaMenu.rockets.hoverState;
        rocketSymbol.style.transform = "rotate(-90deg)";
    });
    ctaMenu.rockets.divElement.addEventListener('mouseout', function() {
        ctaMenu.rockets.divElement.style.backgroundImage = ctaMenu.rockets.normalState;
        rocketSymbol.style.transform = "rotate(0deg)";
    });
    // Launches
    ctaMenu.launches.divElement.addEventListener('mouseover', function() {
        ctaMenu.launches.divElement.style.backgroundImage = ctaMenu.launches.hoverState;
        rocketSymbol.style.transform = "rotate(90deg)";
    });
    ctaMenu.launches.divElement.addEventListener('mouseout', function() {
        ctaMenu.launches.divElement.style.backgroundImage = ctaMenu.launches.normalState;
        rocketSymbol.style.transform = "rotate(0deg)";
    });
    // Down
    ctaMenu.down.divElement.addEventListener('mouseover', function() {
        ctaMenu.down.divElement.style.backgroundImage = ctaMenu.down.hoverState;
        rocketSymbol.style.transform = "rotate(180deg)";
    });
    ctaMenu.down.divElement.addEventListener('mouseout', function() {
        ctaMenu.down.divElement.style.backgroundImage = ctaMenu.down.normalState;
        rocketSymbol.style.transform = "rotate(0deg)";
    });
    // Active states
    // -----------------------------
    // Rockets
    ctaMenu.rockets.divElement.addEventListener('mousedown', function() {
        ctaMenu.rockets.divElement.style.backgroundImage = ctaMenu.rockets.activeState;
    });
    ctaMenu.rockets.divElement.addEventListener('mouseup', function() {
        ctaMenu.rockets.divElement.style.backgroundImage = ctaMenu.rockets.normalState;
    });
    // Launches
    ctaMenu.launches.divElement.addEventListener('mousedown', function() {
        ctaMenu.launches.divElement.style.backgroundImage = ctaMenu.launches.activeState;
    });
    ctaMenu.launches.divElement.addEventListener('mouseup', function() {
        ctaMenu.launches.divElement.style.backgroundImage = ctaMenu.launches.normalState;
    });
    // Down
    ctaMenu.down.divElement.addEventListener('mousedown', function() {
        ctaMenu.down.divElement.style.backgroundImage = ctaMenu.down.activeState;
    });
    ctaMenu.down.divElement.addEventListener('mouseup', function() {
        ctaMenu.down.divElement.style.backgroundImage = ctaMenu.down.normalState;
    });
})();

