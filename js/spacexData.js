
// Objects containing section specific data
const sectionObjects = (function() {
    // Last mission section object (index page)
    const lastMissionSection = {
        parentContainer: document.querySelector('#last-mission .item-container'),
        createElements: function(data) {
            const flexDiv = document.createElement('div'),
                itemImg = document.createElement('div'),
                itemDetails = document.createElement('div'),
                itemButton = document.createElement('div');

            // Assigning classes to elements
            flexDiv.classList.add('flex');
            itemImg.classList.add('item-img');
            itemDetails.classList.add('item-details');
            itemButton.classList.add('info-button');
            itemButton.classList.add('button');

            // Add content to elements
            itemImg.innerHTML = `
                <img src="${data.links.mission_patch_small}">
            `;
            itemDetails.innerHTML = `
                <div>
                    <p class="item-heading">Mission:</p>
                    <p class="item-value">${data.mission_name}</p>
                </div>
                <div>
                    <p class="item-heading">Launch:</p>
                    <p class="item-value">${dateConverter(data.launch_date_local)}</p>
                </div>
                
                <div>
                    <p class="item-heading">Rocket:</p>
                    <p class="item-value">${data.rocket.rocket_name}</p>
                </div>
                <div>
                    <p class="item-heading">Site:</p>
                    <p class="item-value">${data.launch_site.site_name}</p>
                </div>
            `;
            itemButton.innerHTML = `
                <a href="#">More info &gt;&gt;</a>
            `;
            // Append elements to DOM
            flexDiv.appendChild(itemImg);
            flexDiv.appendChild(itemDetails);
            this.parentContainer.appendChild(flexDiv);
            this.parentContainer.appendChild(itemButton);
        }
    }, 
    // Countdown section object
        countdownSection = {
            parentContainer: document.querySelector('#countdown #time-left'),
            createElements: function(data) {
                const parentContainer = this.parentContainer,
                    countdownTail = document.querySelector('#countdown-tail'),
                    launchTime = new Date(data.launch_date_local).getTime();
                // Create the timer
                let countdown = setInterval(function() {
                    const now = new Date().getTime();
                    // Calculate remaining time
                    let timeLeft = launchTime - now,
                        days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
                        hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                    // Display countdown on page
                    parentContainer.innerHTML = `
                        <p><span>${days}</span> days <span>${hours}</span> hours <span>${minutes}</span> minutes <span>${seconds}</span> seconds</p>
                    `;
                    // When countdown is complete
                    if (timeLeft < 0) {
                        clearInterval(countdown);
                        parentContainer.innerHTML = `
                        <p><span>${data.rocket.rocket_name.toUpperCase()} JUST LAUNCHED!</span></p>
                    `;
                        countdownTail.innerHTML = `
                        <i>stay tuned for updates</i>
                    `;
                    }
                }, 1000);   
            }
        };

    // Convert dates to strings
    function dateConverter(date) {
        const launchDate = new Date(date);
        return launchDate.toDateString();
    };
    // Make objects accessible outside module
    return {
        countdownSection,
        lastMissionSection
    }
})();

// Load API from SpaceX
function loadAPI(apiURL, targetSection) {
    fetch('https://api.spacexdata.com/v3/' + apiURL)
        .then(result => result.json())
        .then((data) => {
           getData(data, targetSection);
        })
        .catch(err => console.log(err));
};
// Receive data from API
function getData(data, targetSection) {
    displayContent(data, targetSection);
    console.log(data);
}
// Display elements on page
function displayContent(data, section) {
    // Call function inside section object
    section.createElements(data);

}

(function() {
    // Check if 'last-mission' section is present
    if (sectionObjects.lastMissionSection.parentContainer) {
        console.log("last-mission exists");
        loadAPI("launches/latest", sectionObjects.lastMissionSection);
    }
    // Check if 'countdown' section is present
    if (sectionObjects.countdownSection.parentContainer) {
        console.log("Countdown exists");
        loadAPI("launches/next", sectionObjects.countdownSection);
    }
})();