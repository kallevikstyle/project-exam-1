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
    // Send the data to the correct section
    switch (sectionName) {
        case "pastLaunches":
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
    // Loop through missions in reverse order
    for (i = data.length - 1; i > 0; i--) {
        const missionHead = document.createElement('div');

        // Assign classes to elements
        missionHead.classList.add('mission-head');
        missionHead.classList.add('flex');

        // Add content to mission head
        missionHead.innerHTML = `
            <div class="mission-head-date">${dateConverter(data[i].launch_date_local)}</div>
            <div class="mission-head-name">${data[i].mission_name}</div>
            <div class="mission-head-rocket">${data[i].rocket.rocket_name}</div>
            <div class="mission-head-arrow"><i class="fas fa-angle-right"></i></div>
        `;
        // Append mission head to container
        parentContainer.appendChild(missionHead);
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
    parentContainer.appendChild(flexDiv);
    parentContainer.appendChild(itemButton);
}
// Convert dates to strings
function dateConverter(date) {
    const launchDate = new Date(date);
    return launchDate.toDateString();
};

(function() {
    const missionHeadContainer = document.querySelector('#past-launches .item-list');
    let sectionName = "";

    // Check if 'past-launches' section is present
    if (missionHeadContainer) {
        sectionName = "pastLaunches";
        loadAPI("launches/past", missionHeadContainer, sectionName);
    }
})();