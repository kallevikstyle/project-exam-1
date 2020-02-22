// Sections Module
const indexSections = (function() {
    let countdown = {
        apiURL: "launches/next",
        parentContainer: document.querySelector('#countdown #time-left'),
        allData: [],
        getData: function(data) {
            this.allData = data;
            displayCountdown(this);
        }
    },
        nextMissionPreview = {
            apiURL: "launches/next",
            parentContainer: document.querySelector('#countdown .item-container'),
            allData: [],
            getData: function(data) {
                this.allData = data;
                displayMissionPreview(this);
            }
        };

// Display countdown on page
function displayCountdown(section) {
    const countdownTail = document.querySelector('#countdown-tail'),
        launchTime = new Date(section.allData.launch_date_local).getTime();
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
        section.parentContainer.innerHTML = `
            <p><span>${days}</span>&nbsp;days <span>${hours}</span>&nbsp;hours <span>${minutes}</span>&nbsp;minutes <span>${seconds}</span>&nbsp;seconds</p>
        `;
        // When countdown is complete
        if (timeLeft < 0) {
            clearInterval(countdown);
            section.parentContainer.innerHTML = `
            <p><span>${section.allData.rocket.rocket_name.toUpperCase()} JUST LAUNCHED!</span></p>
        `;
            countdownTail.innerHTML = `
            <i>stay tuned for updates</i>
        `;
        }
    }, 1000);
}
// Display mission preview sections on page
function displayMissionPreview(section) {
    const flexDiv = document.createElement('div'),
    itemImg = document.createElement('div'),
    itemDetails = document.createElement('div'),
    itemButton = document.createElement('div');
    let missionPatch = "";
    // Load fallback image if not present in API
    if (!section.allData.links.mission_patch_small) {
        missionPatch = "images/rocket_fallback.png";
    } else {
        missionPatch = section.allData.links.mission_patch_small;
    }

    // Assigning classes to elements
    flexDiv.classList.add('flex');
    itemImg.classList.add('item-img');
    itemDetails.classList.add('item-details');
    itemButton.classList.add('info-button');
    itemButton.classList.add('button');

    // Add content to elements
    itemImg.innerHTML = `
        <img src="${missionPatch}">
    `;
    itemDetails.innerHTML = `
        <div>
            <p class="item-heading">Mission:</p>
            <p class="item-value">${section.allData.mission_name}</p>
        </div>
        <div>
            <p class="item-heading">Launch:</p>
            <p class="item-value">${dateConverter(section.allData.launch_date_local)}</p>
        </div>
        <div>
            <p class="item-heading">Rocket:</p>
            <p class="item-value">${section.allData.rocket.rocket_name}</p>
        </div>
        <div>
            <p class="item-heading">Site:</p>
            <p class="item-value">${section.allData.launch_site.site_name}</p>
        </div>
    `;
    itemButton.innerHTML = `
        <a href="#">More info &gt;&gt;</a>
    `;
    // Append elements to DOM
    flexDiv.appendChild(itemImg);
    flexDiv.appendChild(itemDetails);
    section.parentContainer.appendChild(flexDiv);
    section.parentContainer.appendChild(itemButton);
}
// Convert dates to strings
function dateConverter(date) {
    const launchDate = new Date(date);
    return launchDate.toDateString();
};

    return {
        countdown,
        nextMissionPreview
    }
})();

// Load API from SpaceX
function loadAPI(section) {
    fetch('https://api.spacexdata.com/v3/' + section.apiURL)
        .then(result => result.json())
        .then((data) => {
           section.getData(data);
        })
        .catch(err => console.log(err));
};
// Receive data from API
function getData(data, parentContainer, sectionName) {
    // Send the data to the correct section
    switch (sectionName) {
        case "countdown":
            displayCountdown(data, parentContainer);
            break;
        case "nextMission":
        case "lastMission":
            displayMissionPreview(data, parentContainer);
            break;
        default:
            console.log("Error: Section not found");
    }    
}


(function() {
    loadAPI(indexSections.countdown);
    loadAPI(indexSections.nextMissionPreview);
})();
//(function() {
//    const countdownContainer = document.querySelector('#countdown #time-left'),
//        nextMissionContainer = document.querySelector('#countdown .item-container'),
//        lastMissionContainer = document.querySelector('#last-mission .item-container');
//    let sectionName = "";

    // Check if countdown section is present
//    if (countdownContainer) {
//        sectionName = "countdown";
//        loadAPI("launches/next", countdownContainer, sectionName);
//    }
    // Check if 'last-mission' section is present
//    if (lastMissionContainer) {
//        sectionName = "lastMission";
//        loadAPI("launches/latest", lastMissionContainer, sectionName);
//    }
    // Check if 'next mission container' is present
//    if (nextMissionContainer) {
//        sectionName = "nextMission";
//        loadAPI("launches/next", nextMissionContainer, sectionName);
//    }
//})();