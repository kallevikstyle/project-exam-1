const spacexData = (function() {
    // Load data from SpaceX
    const loadAPI = function(apiURL) {
        fetch('https://api.spacexdata.com/v3/' + apiURL)
            .then(result => result.json())
            .then((data) => {
               getData(data);
            })
            .catch(err => console.log(err));
    };

    const getData = function(data) {
        console.log(data);
    
        
    };
    
    return {
        loadAPI
    }

})();

(function() {
    spacexData.loadAPI("launches/next");
})();