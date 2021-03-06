// Loaded launches MODULE
const loadedLaunches = (function() {
    let pastLaunches = {
        allData: [],
        searchResult: [],
        apiURL: "launches/past",
        parentContainer: document.querySelector('#past-launches .item-list'),
        loadAmount: 25,
        loadIndex: 0,
        loadMoreButton: "",
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
        },
        startSearch: function(searchString) {
            this.loadIndex = 0;
            // Call search function and load search results into object
            this.searchResult = performSearch(searchString, this.allData);
            displayMissionHeads(this, this.searchResult);
        }
    },
        comingLaunches = {
            allData: [],
            searchResult: [],
            apiURL: "launches/upcoming",
            parentContainer: document.querySelector('#coming-launches .item-list'),
            loadAmount: 25,
            loadMoreButton: "",
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
            },
            startSearch: function (searchString) {
                this.loadIndex = 0;
                // Call search function and load search results into object
                this.searchResult = performSearch(searchString, this.allData);
                displayMissionHeads(this, this.searchResult);
            }
        };

    // Perform search in content
    function performSearch(searchString, data) {
        const searchPattern = new RegExp(searchString, 'i');
        let tempResult = [],
            allResults = [],
            uniqueResults = new Set();
        // Update searchResults with results from each category
        // Mission name
        tempResult = data.filter(function (data) {
            return searchPattern.test(data.mission_name);
        });
        allResults = allResults.concat(tempResult);
        // Flight number
        tempResult = data.filter(function (data) {
            return searchPattern.test(data.flight_number);
        });
        allResults = allResults.concat(tempResult);
        // Rocket
        tempResult = data.filter(function (data) {
            return searchPattern.test(data.rocket.rocket_name);
        });
        allResults = allResults.concat(tempResult);
        // launch site short and long
        tempResult = data.filter(function (data) {
            return searchPattern.test(data.launch_site.site_name);
        });
        allResults = allResults.concat(tempResult);
        tempResult = data.filter(function (data) {
            return searchPattern.test(data.launch_site.site_name_long);
        });
        allResults = allResults.concat(tempResult);
        // Crew
        tempResult = data.filter(function (data) {
            return searchPattern.test(data.crew);
        });
        allResults = allResults.concat(tempResult);
        // Launch year
        tempResult = data.filter(function (data) {
            return searchPattern.test(data.launch_year);
        });
        allResults = allResults.concat(tempResult);

        // Add all results to uniqueResults set
        for (let i = 0; i < allResults.length; i++) {
            uniqueResults.add(allResults[i]);
        }
        // Convert to array
        uniqueResults = Array.from(uniqueResults);

        // Return resulting array to object
        return uniqueResults;
    }
    
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
        if (button) {
            parentContainer.removeChild(button);
            // button.parentNode.removeChild(button);
        }
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
            displayMissionHeads(loadedLaunches, loadedLaunches.allData);
        })
        .catch(err => console.log(err));
};

// Display mission heads
function displayMissionHeads(loadedLaunches, data) {
    let i = loadedLaunches.loadIndex;
    const amount = loadedLaunches.loadAmount + i;

    // Remove load more button if it exists
    if (loadedLaunches.loadMoreButton) {
        loadedLaunches.removeLoadMore();
        delete loadedLaunches.loadMoreButton;
        
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
            // missionHead.setAttribute("role", "link");

            // Add content to mission head
            missionHead.innerHTML = `
            <div class="mission-head-date">${launchDate}</div>
            <div class="mission-head-name"><a href="#" title="See mission details" role="link">${data[i].mission_name}</a></div>
            <div class="mission-head-rocket">${data[i].rocket.rocket_name}</div>
            <div class="mission-head-arrow"><i class="fas fa-angle-right"></i></div>
            `;
            // Append mission head to container
            missionWrapper.appendChild(missionHead);
            loadedLaunches.parentContainer.appendChild(missionWrapper);
            
            // Event listener to open and close mission details container
            missionHead.addEventListener('click', function(e) {
                e.preventDefault();
                const itemContainer = missionWrapper.querySelector('.item-container');
                if (itemContainer) {
                    removeOpenItemContainer();
                } else {
                    displayMissionDetails(data, missionWrapper);
                    location.hash = "#" + missionWrapper.id;
                }
            });
        } else if (i === amount && amount < data.length) {
            // Create a 'load more' button from module object
            loadedLaunches.loadMore();
            // Event listener for button
            loadedLaunches.loadMoreButton.addEventListener('click', function() {
                // Update module with array index
                loadedLaunches.loadIndex = data.indexOf(data[i]);
                displayMissionHeads(loadedLaunches, data);
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
        launchDate = null;
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
    itemButtonContainer.classList.add('item-buttons');
    itemButtonContainer.classList.add('flex');
    itemDescription.classList.add('item-description');
    videoButton.classList.add('info-button');
    videoButton.classList.add('button');
    wikiButton.classList.add('info-button');
    wikiButton.classList.add('button');


    // Add content to elements
    itemImg.innerHTML = `
        <img src=${missionPatch} alt="${launch[0].mission_name}">
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
        return "Coming";
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
function myFunction() {
    console.log('Success');
}
(function() {
    const searchField = document.querySelector('#search-field'),
        searchButton = document.querySelector('#search-button'),
        resetSearch = document.querySelector('#reset-search'),
        resetSearchLink = document.querySelector('#reset-search a'),
        missionWrappers = document.getElementsByClassName('mission-wrapper');

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
            // Empty launch containers
            while (missionWrappers.length > 0) {
                missionWrappers[0].parentNode.removeChild(missionWrappers[0]);
            }
            loadedLaunches.pastLaunches.startSearch(searchField.value);
            loadedLaunches.comingLaunches.startSearch(searchField.value);
            // Show reset search button
            resetSearch.style.display = "block";
        }
    });
    searchField.addEventListener('keypress', function(e) {
        if (searchField.value && e.keyCode === 13) {
            e.preventDefault();
            // Empty launch containers
            while (missionWrappers.length > 0) {
                missionWrappers[0].parentNode.removeChild(missionWrappers[0]);
            }
            loadedLaunches.pastLaunches.startSearch(searchField.value);
            loadedLaunches.comingLaunches.startSearch(searchField.value);
            // Show reset search button
            resetSearch.style.display = "block";
        }
    });
    // Reset search
    resetSearchLink.addEventListener('click', function() {
        searchField.value = "";
        // Reset loadIndex
        loadedLaunches.pastLaunches.loadIndex = 0;
        loadedLaunches.comingLaunches.loadIndex = 0;
        // Empty launch containers
        while (missionWrappers.length > 0) {
            missionWrappers[0].parentNode.removeChild(missionWrappers[0]);
        }
        displayMissionHeads(loadedLaunches.pastLaunches, loadedLaunches.pastLaunches.allData);
        displayMissionHeads(loadedLaunches.comingLaunches, loadedLaunches.comingLaunches.allData);
        // Hide reset search button
        resetSearch.style.display = "none";

    });

})();