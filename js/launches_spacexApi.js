// Loaded launches MODULE
const loadedLaunches = (function() {
    let pastLaunches = {
        apiURL: "launches/past",
        parentContainer: document.querySelector('#past-launches .item-list'),
        sectionName: "pastLaunches",
        initialLoadAmount: 25,
        loadIndex: 0,
        loadMore: function() {
            // Call function to create button
            createLoadMoreButton(this.parentContainer);
            this.loadMoreButton = document.querySelector('#past-launches .load-more-button');
        }
    },
        comingLaunches = {
            apiURL: "launches/upcoming",
            parentContainer: document.querySelector('#coming-launches .item-list'),
            sectionName: "comingLaunches",
            initialLoadAmount: 25,
            loadIndex: 0,
            loadMore: function() {
                // Call function to create button
                createLoadMoreButton(this.parentContainer);
                this.loadMoreButton = document.querySelector('#coming-launches .load-more-button');
            }
        };
    // Create a load more button
    function createLoadMoreButton(parentContainer) {
        // Add a load more button
        const loadMoreButton = document.createElement('div');
        // Add classes to button
        loadMoreButton.classList.add('info-button');
        loadMoreButton.classList.add('button');
        loadMoreButton.classList.add('load-more-button');
        // Add content to button
        loadMoreButton.innerHTML = `
            <a>Load more <i class="fas fa-angle-down"></i></a>
        `;
        // Append button to container
        parentContainer.appendChild(loadMoreButton);
    }

    return {
        pastLaunches,
        comingLaunches
    }
})();

// Load API from SpaceX
function loadAPI(loadedLaunches) {
    fetch('https://api.spacexdata.com/v3/' + loadedLaunches.apiURL)
        .then(result => result.json())
        .then((data) => {
           getData(data, loadedLaunches);
        })
        .catch(err => console.log(err));
};
// Receive data from API
function getData(data, loadedLaunches) {
    console.log(data);
    // Send data to the correct section
    switch (loadedLaunches.sectionName) {
        case "pastLaunches":
            displayMissionHeads(data.reverse(), loadedLaunches);
            break;
        case "comingLaunches":
            displayMissionHeads(data, loadedLaunches);
            break;
        default:
            console.log("Error: Section not found");
    }    
}
// Display mission heads
function displayMissionHeads(data, loadedLaunches) {
    let i = 0;
    // Loop through missions data array
    for (i; i < data.length && i <= loadedLaunches.initialLoadAmount; i++) {
        if (i < loadedLaunches.initialLoadAmount) {
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
            loadedLaunches.parentContainer.appendChild(missionWrapper);
        } else {            
            // Update module with array index for next item
            loadedLaunches.loadIndex = data.indexOf(data[i]);
            // Create a 'load more' button from module object
            loadedLaunches.loadMore();
            // Event listener for button
            loadedLaunches.loadMoreButton.addEventListener('click', function() {
                console.log('CLICKED');
            });

            
        }
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
    // Check if 'past-launches' section is present
    if (loadedLaunches.pastLaunches.parentContainer) {
        sectionName = "pastLaunches";
        loadAPI(loadedLaunches.pastLaunches);

    }
    // Check if 'upcoming-launches' section is present
    if (loadedLaunches.comingLaunches.parentContainer) {
        sectionName = "comingLaunches";
        loadAPI(loadedLaunches.comingLaunches);
    }

})();