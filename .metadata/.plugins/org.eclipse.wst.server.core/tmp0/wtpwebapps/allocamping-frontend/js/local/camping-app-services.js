campingApp.service('HomeServices', function ($http, $q){
	
	// liste des campings
	this.getCampings = function(){
		var deferred = $q.defer();
		$http({
			method : 'GET',
		    url    : '/allocamping-services/camping'    	    
		}).success(function(data){
            deferred.resolve(data);
        }).error(function(){
             deferred.reject(error);
        });
		 
		return  deferred.promise;
	};
	
	
});


campingApp.service('CampingServices', function ($http, $q){
	
	// liste des campings
	this.getCamping = function(id){
		var deferred = $q.defer();
		$http({
			method : 'GET',
		    url    : '/allocamping-services/camping/'+id
		}).success(function(data){
            deferred.resolve(data);
        }).error(function(){
             deferred.reject(error);
        });
		 
		return  deferred.promise;
	};
	
	
});