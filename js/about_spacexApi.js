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
	parentContainer.innerHTML = `
		<h3>About SpaceX</h3>
		<p>${data.summary}</p>
		<p>${data.founder} was the founder and SpaceX now has ${data.employees} employees. ${data.ceo} is the CEO and the company has its headquarters in ${data.headquarters.city}, ${data.headquarters.state}.</p>
		<div class="info-button button">
			<a href="#">Go to SpaceX.com &gt;&gt;</a></i>
		</div>
	`;
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