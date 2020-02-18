// Loaded launches MODULE
const loadedLaunches = (function() {
    let pastLaunches = {
        allData: [],
        apiURL: "launches/past",
        parentContainer: document.querySelector('#past-launches .item-list'),
        sectionName: "pastLaunches",
        loadAmount: 25,
        loadIndex: 0,
        getData: function(data) {
            // Sort array in descending order
            data.sort((a, b) => (a.launch_date_local > b.launch_date_local) ? -1 : 1);
            this.allData = data;
        },
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
            getData: function(data) {
                let unknownDates = [];
                // Sort array in ascending order
                data.sort((a, b) => (a.launch_date_local > b.launch_date_local) ? 1 : -1);
                this.allData = data;
            },
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
            loadedLaunches.getData(data);
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
            let launchDate = null;
            // Check if launch date is confirmed
                launchDate = confirmDate(data[i]);

            // Assign classes and id to elements
            missionWrapper.classList.add('mission-wrapper');
            missionWrapper.id = `flight${data[i].flight_number}`;
            missionHead.classList.add('mission-head');
            missionHead.classList.add('flex');

            // Add content to mission head
            missionHead.innerHTML = `
                <div class="mission-head-date">${launchDate}</div>
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
        itemButtonContainer = document.createElement('div'),
        itemHeading = document.createElement('h4'),
        itemDescription = document.createElement('div'),
        videoButton = document.createElement('div'),
        wikiButton = document.createElement('div');
    let missionPatch = "",
        missionDescription = "",
        launchDate = null,
        videoLink = null,
        wikiLink = null;
    // Load fallback image if not present in API
    if (!launch[0].links.mission_patch_small) {
        missionPatch = "images/rocket_fallback.png";
    } else {
        missionPatch = launch[0].links.mission_patch_small;
    }
    // Write fallback text if description is not available
    if (!launch[0].details) {
        missionDescription = "Detailed information about this mission is not available yet. Check back for updates!";
    } else {
        missionDescription = launch[0].details;
    }
    // Check if launch date is confirmed
    launchDate = confirmDate(launch[0]);
    
    // Close any open item containers
    removeOpenItemContainer();
    // Assigning classes to elements
    itemContainer.classList.add('item-container');
    flexDiv.classList.add('flex');
    itemImg.classList.add('item-img');
    itemDetails.classList.add('item-details');
    itemButtonContainer.id = 'item-buttons';
    itemButtonContainer.classList.add('flex');
    itemDescription.classList.add('mission-description');
    videoButton.classList.add('info-button');
    videoButton.classList.add('button');
    wikiButton.classList.add('info-button');
    wikiButton.classList.add('button');


    // Add content to elements
    itemImg.innerHTML = `
        <img src=${missionPatch}>
    `;
    itemHeading.innerHTML = `Flight number ${launch[0].flight_number}: ${launch[0].mission_name}`;
    itemDetails.innerHTML = `
        <div>
            <p class="item-heading">Flight&nbsp;number:</p>
            <p class="item-value">${launch[0].flight_number}</p>
        </div>
        <div>
            <p class="item-heading">Mission:</p>
            <p class="item-value">${launch[0].mission_name}</p>
        </div>
        
        <div>
            <p class="item-heading">Launch:</p>
            <p class="item-value">${launchDate}</p>
        </div>
        <div>
            <p class="item-heading">Rocket:</p>
            <p class="item-value">${launch[0].rocket.rocket_name}</p>
        </div>
        <div>
            <p class="item-heading">Site:</p>
            <p class="item-value">${launch[0].launch_site.site_name_long}</p>
        </div>
    `;
    itemDescription.innerHTML = `
        <p class="item-heading">Description:</p>
        <p class="item-value">${missionDescription}</p>
    `;
    // Add buttons if links exist in API
    if (launch[0].links.wikipedia) {
        wikiButton.innerHTML = `
            <a href="${launch[0].links.wikipedia}" title="Visit mission Wikipedia page" role="link" target="_blank">Wikipedia page <i class="fas fa-external-link-alt"></i></a>
        `;
        itemButtonContainer.appendChild(wikiButton);
    } else {
        wikiButton.innerHTML = "";
    }
    if (launch[0].links.video_link) {
        videoButton.innerHTML = `
            <a href="${launch[0].links.video_link}" title="Watch official launch video" role="link" target="_blank">Watch video <i class="fas fa-external-link-alt"></i></a>
        `;
        itemButtonContainer.appendChild(videoButton);
    } else {
        videoButton.innerHTML = "";
    }
    


    // Append elements to DOM
    flexDiv.appendChild(itemImg);
    flexDiv.appendChild(itemDetails);
    itemContainer.appendChild(itemHeading);
    itemContainer.appendChild(flexDiv);
    itemContainer.appendChild(itemDescription);
    itemContainer.appendChild(itemButtonContainer);
    parentContainer.appendChild(itemContainer);

}
// Remove any open item containers
function removeOpenItemContainer() {
    const itemContainers = document.getElementsByClassName('item-container');
    
    for (let i = 0; i < itemContainers.length; i++) {
        itemContainers[i].parentNode.removeChild(itemContainers[i]);
    }
}
// Check if launch date is confirmed
function confirmDate(item) {
    if (item.tentative_max_precision === 'hour' || item.tentative_max_precision === 'day') {
        return dateConverterShort(item.launch_date_local);
    } else {
        return "Unknown";
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
}
function performSearch(searchString) {
    console.log(searchString);
}

(function() {
    const searchField = document.querySelector('#search-field'),
        searchButton = document.querySelector('#search-button');

    

    // Check if 'past-launches' section is present
    if (loadedLaunches.pastLaunches.parentContainer) {
        loadAPI(loadedLaunches.pastLaunches);
    }
    // Check if 'upcoming-launches' section is present
    if (loadedLaunches.comingLaunches.parentContainer) {
        loadAPI(loadedLaunches.comingLaunches);
    }

    // Search event listeners
    // -----------------------
    searchButton.addEventListener('click', function() {
        if (searchField.value) {
            performSearch(searchField.value);
        }
    });
    searchField.addEventListener('keypress', function(e) {
        if (searchField.value && e.keyCode === 13) {
            e.preventDefault();
            performSearch(searchField.value);
        }
    });

})();