// Info Module
const loadedInfo = (function() {
	let spacexInfo = {
		allData: [],
		parentContainer: document.querySelector('#about-spacex .item-details'),
		getData: function(data) {
			this.allData = data;
			displayInfo(this.allData, this.parentContainer);
		}
	};
// Display SpaceX info on page
function displayInfo(data, parentContainer) {
	console.log(data);
	console.log(parentContainer);
}

	return {
		spacexInfo
	}
})();

// Load API from SpaceX
function loadAPI() {
    fetch('https://api.spacexdata.com/v3/info/')
        .then(result => result.json())
        .then((data) => {
        	// Load data into rockets object
	       	loadedInfo.spacexInfo.getData(data);
        })
        .catch(err => console.log(err));
};


(function() {
	loadAPI();
})();