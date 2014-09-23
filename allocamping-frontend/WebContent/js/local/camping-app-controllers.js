/**
 * controlleur pour la gestion des utilisateurs
 */
campingApp.controller('UsersCtrl', function ($scope, $http){
	
	
	/**
	 * Enregistrer un nouvel utilisateur
	 */
	$scope.addUser = function(){
		identifiant = $scope.identifiant;
		email       = $scope.email;
		passwd		= $scope.passwd;
		
		var user = {"login" : identifiant, "email" : email, "passwd" : passwd};
		$http({
			method : 'POST',
		    url    : '/allocamping-services/utilisateurs',
		    data  : JSON.stringify(user)
		}).success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		    });
	};
	
	
	
});

/**
 * controlleur pour la gestion des campings
 */
campingApp.controller('CampingCtrl', function ($scope, $http, $routeParams, CampingServices){
	/**
	 * Ajouter un nouveau camping
	 */
	$scope.addCamping = function(){
		nomCamping = $scope.nomCamping;
		ville = $scope.ville;
		adresse = $scope.adresse;
		codePostal = $scope.codePostal;
		latitude = $scope.latitude;
		longitude = $scope.longitude;
		
		var camping = {"nomCamping" : nomCamping, "ville" : ville, "adresse" : adresse, "codePostal" : codePostal, "latitude" : latitude , "longitude":longitude};
		$http({
			method : 'POST',
		    url    : '/allocamping-services/camping',
		    data  : JSON.stringify(camping)
		}).success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		    });
	};
	
	
	if ($.trim($routeParams.id).length) {
	     CampingServices
	     .getCamping($.trim($routeParams.id))
	     .then(function(camping){
			$scope.nom = camping.nomCamping;
			$scope.adresse = camping.adresse;
			$scope.codePostal = camping.codePostal;
			$scope.ville = camping.ville;
		 });
	} else{

	};
	
	
});


campingApp.controller('connectCtrl', function ($scope, $http){
	$scope.addcamping = function(){
		email = $scope.email;
		mot = $scope.mot;
		mot = $scope.mot;

		
		var connect = { "email" :email, "mot" :mot};
		$http({
			method : 'POST',
		    url    : '/allocamping-services/connect',
		    data  : JSON.stringify(connect)
		}).success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		    });
	};
	
	
	
});

campingApp.controller('HomeCtrl', function ($scope, $http, $interval,$location, HomeServices){	
	//var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions); 
	//var campingsResults = HomeServices.getCampings();	
	
	$scope.map = {
	    center: {
					latitude:  48.8534100,
					longitude: 2.3488000
		    	},
	    zoom: 10,
	    bounds: {}
	};
	 $scope.options = {scrollwheel: false};
     $scope.markersModels = [];

     HomeServices
     .getCampings()
     .then(function(campings){
    	   // markersArray = donnees.data;
    		markers = [];
    		for (var i = 0; i < campings.length; i++) {
    			campings[i].id = campings[i].idStringValue;
    			markers.push(campings[i]);   	     
    	    }
    		
    		$scope.markersModels = markers;
		
	});
	
     $scope.markersEvents = {
             click: function (gMarker, eventName, model) {
            	 var infowindow = new google.maps.InfoWindow({
            		    content: '<div class="encart mod">'+
            		    			'<div class="bg left">'+
	            		    		 '<h5><a href="#/camping/'+model.idStringValue+'" title="'+model.nomCamping+'">'+ model.nomCamping+'</a></h5>'+
	            		    		 '<p>'+ model.adresse+'<br />'+ model.codePostal+' '+ model.ville+'</p>'+
	            		    		'</div>'+
	            		    		'<div class="bd right">'+
	            		    		'</div>'+
	            		    	 '</div>'
            		  });
            	 infowindow.open(gMarker.get('map'), gMarker); 
             }
     };
	$scope.rechercherCamping = function(){
		console.log("Rechercher camping");
		$location.path("/rechercher-camping");

	};

	$scope.proposerCamping = function(){
		console.log("Proposer camping");
		$location.path("/proposer-camping");

	};
	
	
	
});

campingApp.controller('RechcampingCtrl', function ($scope, $http, $interval,$location){	
	//var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions); 
	var campings ="";	
	$http({
		method : 'GET',
	    url    : '/allocamping-services/camping',   
	    data   : ''
	}).success(function(data, status, headers, config) {
		$scope.dynMarkers = [];
        for (var i = 0; i < 8; i++) {
          $scope.dynMarkers[i] = new google.maps.Marker({
            title: "Marker: " + i,
            setMap : $scope.map
          });
        }

        $scope.GenerateMapMarkers = function() {
          var d = new Date(); //To show marker location changes over time
          $scope.date = d.toLocaleString();

          var numMarkers = Math.floor(Math.random() * 4) + 4; //between 4 to 8 markers
          for (i = 0; i < numMarkers; i++) {
            var lat = 43.6600000 + (Math.random() / 100);
            var lng = -79.4103000 + (Math.random() / 100);

            var loc = new google.maps.LatLng(data[0].latitude, data[0].longitude);
            $scope.dynMarkers[i].setPosition(loc);
            //$scope.dynMarkers[i].setMap(c);
          }
        };
        
        

        $interval($scope.GenerateMapMarkers, 2000);
	    
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
    });
	 
	

	$scope.rechercherCamping = function(){
		console.log("Rechercher camping");
		$location.path("/rechercher-camping");

	};

	$scope.proposerCamping = function(){
		console.log("Proposer camping");
		$location.path("/proposer-camping");

	};
	
	
	$scope.map = {
	    center: {
					latitude:  48.8534100,
					longitude: 2.3488000
		    	},
	    zoom: 10
	};
});

