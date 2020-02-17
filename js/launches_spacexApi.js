// Load API from SpaceX
function loadAPI(apiURL, parentContainer, sectionName) {
    fetch('https://api.spacexdata.com/v3/' + apiURL)
        .then(result => result.json())
        .then((data) => {
           getData(data, parentContainer, sectionName);
        })
        .catch(err => console.log(err));
};
// Receive data from API
function getData(data, parentContainer, sectionName) {
    // Send data to the correct section
    switch (sectionName) {
        case "pastLaunches":
            displayMissionHeads(data.reverse(), parentContainer);
            break;
        case "comingLaunches":
            displayMissionHeads(data, parentContainer);
            break;
        default:
            console.log("Error: Section not found");
    }    
}
// Display mission heads
function displayMissionHeads(data, parentContainer) {
    console.log(data);
    let i = 0;
    // Loop through missions data array
    for (i; i < data.length; i++) {
        const missionWrapper = document.createElement('div'),
            missionHead = document.createElement('div');

        // Assign classes to elements
        missionWrapper.classList.add('mission-wrapper');
        missionHead.classList.add('mission-head');
        missionHead.classList.add('flex');

        // Add content to mission head
        missionHead.innerHTML = `
            <div class="mission-head-date">${dateConverterShort(data[i].launch_date_local)}</div>
            <div class="mission-head-name">${data[i].mission_name}</div>
            <div class="mission-head-rocket">${data[i].rocket.rocket_name}</div>
            <div class="mission-head-arrow"><i class="fas fa-angle-right"></i></div>
        `;
        // Append mission head to container
        missionWrapper.appendChild(missionHead);
        parentContainer.appendChild(missionWrapper);
    }
}

// Display mission details
function displayMissionDetails(data, parentContainer) {
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
            <p class="item-value">${dateConverterLong(data.launch_date_local)}</p>
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
    parentContainer.appendChild(flexDiv);
    parentContainer.appendChild(itemButton);
}
// Convert dates to strings
function dateConverterLong(date) {
    const launchDate = new Date(date);
    return launchDate.toDateString();
};
function dateConverterShort(date) {
    const launchDate = new Date(date);
    let day = launchDate.getDate(),
        month = (launchDate.getMonth() + 1),
        year = launchDate.getFullYear();

    // Add leading zero
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    return day + "." + month + "." + year;
};

(function() {
    const pastLaunchesContainer = document.querySelector('#past-launches .item-list'),
        comingLaunchesContainer = document.querySelector('#coming-launches .item-list');
    let sectionName = "";

    // Check if 'past-launches' section is present
    if (pastLaunchesContainer) {
        sectionName = "pastLaunches";
        loadAPI("launches/past", pastLaunchesContainer, sectionName);
    }
    // Check if 'upcoming-launches' section is present
    if (comingLaunchesContainer) {
        sectionName = "comingLaunches";
        loadAPI("launches/upcoming", comingLaunchesContainer, sectionName);
    }

})();