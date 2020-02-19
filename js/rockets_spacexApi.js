// Loaded launches MODULE
const loadedRockets = (function() {
	let rockets = {
		allData: [],
		parentContainer: document.querySelector('#rockets-container .item-list'),
		getData: function(data) {
			this.allData = data;
			displayRockets(this);
		}
	};

	function displayRockets(rockets) {
		console.log(rockets.allData);
		// Loop through items
		for (let i = 0; i < rockets.allData.length; i++) {
			const item = rockets.allData[i], 
				itemContainer = document.createElement('div'),
				flexDiv = document.createElement('div'),
				itemImg = document.createElement('div'),
		        itemDetails = document.createElement('div'),
		        itemButtonContainer = document.createElement('div'),
		        itemHeading = document.createElement('h4'),
		        itemDescription = document.createElement('div'),
		        imagesButton = document.createElement('div'),
		        wikiButton = document.createElement('div');

		        // Assign classes to elements
		        itemContainer.classList.add('item-container');
			    flexDiv.classList.add('flex');
			    itemImg.classList.add('item-img');
			    itemDetails.classList.add('item-details');
			    itemButtonContainer.classList.add('item-buttons');
			    itemButtonContainer.classList.add('flex');
			    itemDescription.classList.add('mission-description');
			    imagesButton.classList.add('info-button');
			    imagesButton.classList.add('button');
			    wikiButton.classList.add('info-button');
			    wikiButton.classList.add('button');

			    // Add content to elements
			    itemImg.innerHTML = `
			        <img src=${item.flickr_images[0]}>
			    `;
			    itemHeading.innerHTML = `${item.rocket_name}`;
			    itemDetails.innerHTML = `
			        <div>
			            <p class="item-heading">Flight&nbsp;number:</p>
			            <p class="item-value">${item.rocket_name}</p>
			        </div>
			        <div>
			            <p class="item-heading">Mission:</p>
			            <p class="item-value">${item.rocket_name}</p>
			        </div>
			        
			        <div>
			            <p class="item-heading">Launch:</p>
			            <p class="item-value">${item.rocket_name}</p>
			        </div>
			        <div>
			            <p class="item-heading">Rocket:</p>
			            <p class="item-value">${item.rocket_name}</p>
			        </div>
			        <div>
			            <p class="item-heading">Site:</p>
			            <p class="item-value">${item.rocket_name}</p>
			        </div>
			    `;
			    itemDescription.innerHTML = `
			        <p class="item-heading">Description:</p>
			        <p class="item-value">${item.rocket_name}</p>
			    `;
			    // Add buttons if links exist in API
			    if (item.wikipedia) {
			        wikiButton.innerHTML = `
			            <a href="${item.wikipedia}" title="Visit rocket Wikipedia page" role="link" target="_blank">Wikipedia page <i class="fas fa-external-link-alt"></i></a>
			        `;
			        itemButtonContainer.appendChild(wikiButton);
			    } else {
			        wikiButton.innerHTML = "";
			    }
			    if (item.flickr_images[0]) {
			        imagesButton.innerHTML = `
			            <a href="${item.flickr_images[0]}" title="See more photos" role="link" target="_blank">See photos <i class="fas fa-external-link-alt"></i></a>
			        `;
			        itemButtonContainer.appendChild(imagesButton);
			    } else {
			        imagesButton.innerHTML = "";
			    }
			    // Append elements to DOM
			    flexDiv.appendChild(itemImg);
			    flexDiv.appendChild(itemDetails);
			    itemContainer.appendChild(itemHeading);
			    itemContainer.appendChild(flexDiv);
			    itemContainer.appendChild(itemDescription);
			    itemContainer.appendChild(itemButtonContainer);
			    rockets.parentContainer.appendChild(itemContainer);
			} 
		}


	return {
		rockets
	}
})();
// FUNCTIONS
// ----------------------------------------------
// Load API from SpaceX
function loadAPI() {
    fetch('https://api.spacexdata.com/v3/rockets/')
        .then(result => result.json())
        .then((data) => {
        	// Load data into rockets object
	       	loadedRockets.rockets.getData(data);
        })
        .catch(err => console.log(err));
};


(function() {
	loadAPI();


})();