
// Objects containing section specific data
const sectionObjects = (function() {
    // Last mission section (index page)
    const lastMissionSection = {
        parentContainer: document.querySelector('#last-mission .item-container'),
        createElements: function(data) {
            const parentContainer = document.querySelector('#last-mission .item-container'),
                flexDiv = document.createElement('div'),
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
    };

    function dateConverter(date) {
        const launchDate = new Date(date);
        return launchDate.toDateString();
    };

    return {
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
}
// Display elements on page
function displayContent(data, section) {
    // Call function inside section object
    section.createElements(data);

}

(function() {
    if (sectionObjects.lastMissionSection.parentContainer) {
        console.log("It exists");
        loadAPI("launches/next", sectionObjects.lastMissionSection);
        // displayContent(lastMissionSection);

    } else {
        console.log("It does not exist");
    }
})();