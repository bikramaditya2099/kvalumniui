angular.module('app')
.service('session',function(){

  var sessionId="";
  this.saveSession=function(sessionId){        
       this.sessionId=sessionId;
  };

  this.getSession=function(){
    return this.sessionId;
  };

});


angular.module('app')

    .controller('appController', ['$rootScope','$scope', '$http','urls','utils','session','$window', function($rootScope,$scope, $http,urls,utils,session,$window) {
      
    
    	$scope.processLogin=function(){
    		
    	var loginjson={};
    	loginjson.userName=$scope.user.username;
    	loginjson.password=$scope.user.password;
    	loginjson.appid=utils.appId;
    	
    	
	$http.post("http://ec2-54-212-201-118.us-west-2.compute.amazonaws.com:8080/Rainutility/rain/app/login",loginjson).success(function(data){
		
	//	$http.post("http://localhost:8080/Rainutility/rain/app/login",loginjson).success(function(data){
    		
		if(data.values.role=="ADMIN")
			{
			$http.post(urls.adminlogin,loginjson).success(function(data){
	    		session.saveSession(data.sessionId);
	    		$window.sessionStorage.sessionId=data.sessionId;
	    		$scope.loginResponse=data;
	    		if($scope.loginResponse.code==3000)
	    			{window.location.href="#app/portlets";}
	    	});
			}
		
    	});
    
    
    	
    
    	}
    	
    	
    
    	
    }])