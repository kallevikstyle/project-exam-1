
// Load data from SpaceX
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
    // Object containing all data needed for section
    const lastMissionSection = {
        parentContainer: document.querySelector('#last-mission .item-container'),
        keys: ["mission_patch_small", "mission_name", "launch_date_local", ["rocket", "rocket_name"], "site_name"],
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
                <img src="https://i.picsum.photos/id/884/400/400.jpg">
            `;
            itemDetails.innerHTML = `
                <div>
                    <p class="item-heading">Mission:</p>
                    <p class="item-value">${data.mission_name}</p>
                </div>
                <div>
                    <p class="item-heading">Launch:</p>
                    <p class="item-value">01.01.2020</p>
                </div>
                
                <div>
                    <p class="item-heading">Rocket:</p>
                    <p class="item-value">Falcon 9</p>
                </div>
                <div>
                    <p class="item-heading">Site:</p>
                    <p class="item-value">Sveio</p>
                </div>
            `;
            itemButton.innerHTML = `
                <a href="#">More info &gt;&gt;</a>
            `;
            // Appending elements to DOM
            flexDiv.appendChild(itemImg);
            flexDiv.appendChild(itemDetails);
            parentContainer.appendChild(flexDiv);
            parentContainer.appendChild(itemButton);
        }
    };

    if (lastMissionSection) {
        console.log("It exists");
        loadAPI("launches/next", lastMissionSection);
        // displayContent(lastMissionSection);

    } else {
        console.log("It does not exist");
    }
})();