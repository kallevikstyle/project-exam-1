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
        case "countdown":
            displayCountdown(data, parentContainer);
            break;
        case "nextMission":
        case "lastMission":
            displayMissionDetails(data, parentContainer);
            break;
        default:
            console.log("Error: Section not found");
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
    const countdownContainer = document.querySelector('#countdown #time-left'),
        nextMissionContainer = document.querySelector('#countdown .item-container'),
        lastMissionContainer = document.querySelector('#last-mission .item-container');
    let sectionName = "";

    // Check if 'next mission container' is present
    if (nextMissionContainer) {
        sectionName = "nextMission";
        loadAPI("launches/next", nextMissionContainer, sectionName);
    }
})();