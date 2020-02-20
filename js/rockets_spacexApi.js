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
				imageSrc = {};

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
			// Find rocket image or fallback image
			imageSrc = findImage(item);

		    // Add content to elements
		    itemImg.innerHTML = `
		    	<figure>
		        	<img src=${imageSrc.imagePath} alt="${item.rocket_name} by SpaceX">
		        	<figcaption>${imageSrc.attribution}</figcaption>
		        </figure>
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
	// Find item image
	function findImage(item) {
		let imageExists = false; 
		const rocketImages = [
			{
				name: "falcon1",
				imagePath: "images/rocket_falcon1.jpg",
				attribution: `
					Image source: <a href="https://commons.wikimedia.org/wiki/File:Falcon_1_Flight_4_liftoff.jpg" title="Link to source" role="link" target="_blank">SpaceX&nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a><br>
					License: <a href="https://creativecommons.org/licenses/by-sa/3.0/" title="Link to CC license" role="link" target="_blank">CreativeCommons&nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a>
						`
			},
			{
				name: "falcon9",
				imagePath: "images/rocket_falcon9.jpg",
				attribution: `
					Image source: <a href="https://www.flickr.com/photos/spacex/49549022057/" title="Link to source" role="link" target="_blank">SpaceX&nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a><br>
					License: <a href="https://creativecommons.org/licenses/by-nc/2.0/" title="Link to CC license" role="link" target="_blank">CreativeCommons&nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a>
						`
			},
			{
				name: "falconheavy",
				imagePath: "images/rocket_falconheavy.jpg",
				attribution: `
					Image source: <a href="https://www.flickr.com/photos/spacex/38583829295/" title="Link to source" role="link" target="_blank">SpaceX&nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a><br>
					License: <a href="https://creativecommons.org/licenses/by-nc/2.0/" title="Link to CC license" role="link" target="_blank">CreativeCommons&nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a>
						`
			},
			{
				name: "starship",
				imagePath: "images/rocket_starship.jpg",
				attribution: `
					Image source: <a href="https://www.flickr.com/photos/spacex/48954138962/" title="Link to source" role="link" target="_blank">SpaceX&nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a><br>
					License: <a href="https://creativecommons.org/licenses/by-nc/2.0/" title="Link to CC license" role="link" target="_blank">CreativeCommons&nbsp;&nbsp;<i class="fas fa-external-link-alt"></i></a>
						`
			},
			{
				name: "fallback",
				imagePath: "images/rocket_fallback.png",
				attribution: `
					A SpaceX rocket
						`
			}
		];
		// Check if rocket exists in list of images
		for (let i = 0; i < rocketImages.length; i++) {
			if (rocketImages[i].name === item.rocket_id) {
				imageExists = true;
				return rocketImages[i];
			}
		}
		// Return fallback if image does not exist
		if (!imageExists) {
			return rocketImages.filter(function (rocketImages) {
	            return searchPattern.test("fallback");
	        });
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