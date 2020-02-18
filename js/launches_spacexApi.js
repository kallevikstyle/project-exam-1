// Loaded launches MODULE
const loadedLaunches = (function() {
    let pastLaunches = {
        allData: [],
        apiURL: "launches/past",
        parentContainer: document.querySelector('#past-launches .item-list'),
        sectionName: "pastLaunches",
        loadAmount: 25,
        loadIndex: 0,
        loadMore: function() {
            // Call function to create button
            createLoadMoreButton(this.parentContainer);
            this.loadMoreButton = document.querySelector('#past-launches .load-more-button');
        },
        removeLoadMore: function() {
            removeLoadMoreButton(this.parentContainer, this.loadMoreButton);
        }
    },
        comingLaunches = {
            allData: [],
            apiURL: "launches/upcoming",
            parentContainer: document.querySelector('#coming-launches .item-list'),
            sectionName: "comingLaunches",
            loadAmount: 25,
            loadIndex: 0,
            loadMore: function() {
                // Call function to create button
                createLoadMoreButton(this.parentContainer);
                this.loadMoreButton = document.querySelector('#coming-launches .load-more-button');
            },
            removeLoadMore: function() {
                removeLoadMoreButton(this.parentContainer, this.loadMoreButton);
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
    // Remove loadMoreButton
    function removeLoadMoreButton(parentContainer, button) {
        parentContainer.removeChild(button);
    }

    return {
        pastLaunches,
        comingLaunches
    }
})();
// -------- FUNCTIONS --------------
// Load API from SpaceX
function loadAPI(loadedLaunches) {
    fetch('https://api.spacexdata.com/v3/' + loadedLaunches.apiURL)
        .then(result => result.json())
        .then((data) => {
            // Send data to section object and call displayMissionHeads
            if (loadedLaunches.sectionName === "pastLaunches") {
                loadedLaunches.allData = data.reverse();
            } else {
                loadedLaunches.allData = data;
            }
            displayMissionHeads(loadedLaunches);
        })
        .catch(err => console.log(err));
};

// Display mission heads
function displayMissionHeads(loadedLaunches) {
    let i = loadedLaunches.loadIndex;
    const amount = loadedLaunches.loadAmount + i,
        data = loadedLaunches.allData;

    console.log(data);
    // Remove load more button if it exists
    if (loadedLaunches.loadMoreButton) {
        loadedLaunches.removeLoadMore();
    }
    // Loop through missions data array
    for (i; i < data.length && i <= amount; i++) {
        if (i < amount) {
            const missionWrapper = document.createElement('div'),
                missionHead = document.createElement('div');

            // Assign classes and id to elements
            missionWrapper.classList.add('mission-wrapper');
            missionWrapper.id = `flight${data[i].flight_number}`;
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
            
            // Event listener to open and close mission details container
            missionHead.addEventListener('click', function() {
                const itemContainer = missionWrapper.querySelector('.item-container');
                if (itemContainer) {
                    removeOpenItemContainer();
                } else {
                    displayMissionDetails(data, missionWrapper);
                }
            });
            // loadedLaunches.toggleMissionDetails(missionHead);
        } else if (i === amount && amount < data.length) {            
            // Create a 'load more' button from module object
            loadedLaunches.loadMore();
            // Event listener for button
            loadedLaunches.loadMoreButton.addEventListener('click', function() {
                // Update module with array index
                loadedLaunches.loadIndex = data.indexOf(data[i]);
                displayMissionHeads(loadedLaunches);
            }); 
        }
    }
}

// Display mission details in missionWrapper with corresponding ID
function displayMissionDetails(data, parentContainer) {
    const flightNumber = parseInt(parentContainer.id.match(/\d+/g)[0]),
        launch = data.filter(function(data) {
            return data.flight_number === flightNumber;
        }),
        itemContainer = document.createElement('div'),
        flexDiv = document.createElement('div'),
        itemImg = document.createElement('div'),
        itemDetails = document.createElement('div'),
        itemButton = document.createElement('div');
    let missionPatch = "";
    // Load fallback image if not present in API
    if (!launch[0].links.mission_patch_small) {
        missionPatch = "images/rocket_fallback.png";
    } else {
        missionPatch = launch[0].links.mission_patch_small;
    }
    // Close any open item containers
    removeOpenItemContainer();
    // Assigning classes to elements
    itemContainer.classList.add('item-container');
    flexDiv.classList.add('flex');
    itemImg.classList.add('item-img');
    itemDetails.classList.add('item-details');
    itemButton.classList.add('info-button');
    itemButton.classList.add('button');


    // Add content to elements
    itemImg.innerHTML = `
        <img src=${missionPatch}>
    `;
    itemDetails.innerHTML = `
        <div>
            <p class="item-heading">Mission:</p>
            <p class="item-value">${launch[0].mission_name}</p>
        </div>
        <div>
            <p class="item-heading">Launch:</p>
            <p class="item-value">${dateConverterLong(launch[0].launch_date_local)}</p>
        </div>
        <div>
            <p class="item-heading">Rocket:</p>
            <p class="item-value">${launch[0].rocket.rocket_name}</p>
        </div>
        <div>
            <p class="item-heading">Site:</p>
            <p class="item-value">${launch[0].launch_site.site_name}</p>
        </div>
    `;
    itemButton.innerHTML = `
        <a href="#">More info &gt;&gt;</a>
    `;
    // Append elements to DOM
    flexDiv.appendChild(itemImg);
    flexDiv.appendChild(itemDetails);
    itemContainer.appendChild(flexDiv);
    itemContainer.appendChild(itemButton);
    parentContainer.appendChild(itemContainer);
    
    // Add event listener to close mission details container
    // missionHead.addEventListener('click', function() {       
    //     removeOpenItemContainer();
    // });

}
// Remove any open item containers
function removeOpenItemContainer() {
    const itemContainers = document.getElementsByClassName('item-container');
    
    for (let i = 0; i < itemContainers.length; i++) {
        itemContainers[i].parentNode.removeChild(itemContainers[i]);
    }
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