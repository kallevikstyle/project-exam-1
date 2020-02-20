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
			let status = "",
				textColor = "",
				imageSrc = "";

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

			// Check if rocket is active
			if (item.active) {
				status = "Active"
				textColor = `style="color:green;"`;
			} else {
				status = "Inactive"
				textColor = `style="color:#c93c39;"`;
			}
			// Find rocket image
			imageSrc = findImage(item);

		    // Add content to elements
		    itemImg.innerHTML = `
		        <img src=${imageSrc}>
		    `;
		    itemHeading.innerHTML = `${item.rocket_name}`;
		    itemDetails.innerHTML = `
		        <div>
		            <p class="item-heading">Status:</p>
		            <p class="item-value" ${textColor}>${status}</p>
		        </div>
		        <div>
		            <p class="item-heading">Country:</p>
		            <p class="item-value">${item.country}</p>
		        </div>
		        
		        <div>
		            <p class="item-heading">First flight:</p>
		            <p class="item-value">${dateConverterShort(item.first_flight)}</p>
		        </div>
		        <div>
		            <p class="item-heading">Height:</p>
		            <p class="item-value">${item.height.meters} m</p>
		        </div>
		        <div>
		            <p class="item-heading">Diameter:</p>
		            <p class="item-value">${item.diameter.meters} m</p>
				</div>
				 <div>
		            <p class="item-heading">Mass:</p>
		            <p class="item-value">${kilosToTons(item.mass.kg)} tons</p>
		        </div>
		    `;
		    itemDescription.innerHTML = `
		        <p class="item-heading">Description:</p>
				<p class="item-value">${item.description}</p>
				<p class="item-value">${item.rocket_name} has ${item.stages} stages and ${item.engines.number} ${item.engines.type} engine(s).</p>
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
		    flexDiv.appendChild(itemDetails);
		    flexDiv.appendChild(itemImg);
		    itemContainer.appendChild(itemHeading);
		    itemContainer.appendChild(flexDiv);
		    itemContainer.appendChild(itemDescription);
		    itemContainer.appendChild(itemButtonContainer);
		    rockets.parentContainer.appendChild(itemContainer);
		} 
	}
	// Find item image
	function findImage(item) {
		let imagePath = "images/rocket",
			imageTitle = null;
		const fallbackImage = "_fallback.png",
			rocketImages = [
			"falcon1",
			"falcon9",
			"falconheavy",
			"starship"
		];
		// Check if rocket exists in list of images
		for (let i = 0; i < rocketImages.length; i++) {
			if (rocketImages[i] === item.rocket_id) {
				imageTitle = rocketImages[i] + ".jpg";
			}
		}
		
		if (!imageTitle) {
			return imagePath + fallbackImage;
		} else {
			return imagePath + "_" + imageTitle;
		}
	}
	// Convert date
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
	// Convert kilos to tons with only one decimal
	function kilosToTons(kilos) {
		return Math.round((kilos / 1000) * 10) / 10;
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