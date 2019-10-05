angular.module('kvapp')
.service('url',function(){ 
	 this.mainurl = "http://ec2-54-212-201-118.us-west-2.compute.amazonaws.com:8080/Rainutility/rain/app";
	//this.mainurl = "http://localhost:8080/Rainutility/rain/app"; 
	this.localurl="http://ec2-54-212-201-118.us-west-2.compute.amazonaws.com:8080/AlumniProject/kvpa"
 })
;

angular.module('kvapp')
.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ]);

angular.module('kvapp')
.service('UserService',function(){

	  var userInfo={};
	 
	  this.save=function(userInfo){        
	       this.userInfo=userInfo;
	  };

	  this.getUserInfo=function(){

	    return this.userInfo;

	  };

	});


angular.module('kvapp')
.service('utils',function(){ 
	 this.appId = "75xrem1Aloo4PWHzkq3dk/IvA7nuyr6U1SSD3ky9WfI=";
	 //this.appId="OluU0zbKamqUO/uMCe1q1gP8vqCpFvUIGqCHXjfKpvI=";
 })
;

angular.module('kvapp')
.controller('dataController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
	 $http.get("json/members.json").success(function(data){
      	  
      	 $scope.members=data;      	  
      	  
        });
}]);

angular.module('kvapp')
.controller('loginController', ['$scope', 'utils','url', '$http','UserService','$rootScope','$window', function($scope, utils, url,$http,UserService,$rootScope,$window) {
	
	var appId=utils.appId;
	console.log(appId);
	$scope.invalidCredentials=false;
	$scope.errCode=0;
	$scope.login=function(){
		var json={};
		json.userName=$scope.userName;
		json.password=$scope.password;
		json.appid=appId;
		console.log(json);
		$http.post(url.mainurl+"/login",json).success(function(data){
			$scope.invalidCredentials=false;
			$scope.errCode=0;
			if(data.code==3000)
				{
				$http.post(url.localurl+"/app/login",json).success(function(data){
				
					console.log(data);
					if(data.bean!=null){
					if(data.bean.code!=null)
						{
							$scope.errCode=data.bean.code;
						}
					else
						{
						$rootScope.info=data.bean;
						UserService.save(data.bean);
						$window.sessionStorage.sessionId=data.sessionId;
						window.location.href = "#/profile";
						}
					}
					else
						{
						$scope.errCode=data.code;
						}
				    });
				
				
				}
			else{
				$scope.invalidCredentials=true;
			}
		});
	}
	
	$scope.registerNew=function(){
		
		var json={};
		json.userEmail=$scope.email;
		json.password=$scope.password;
		json.dob=new Date($scope.dob);
		json.firstName=$scope.firstName;
		json.lastName=$scope.lastName;
		json.phone=$scope.cont;
		json.gender=$scope.gender;
		
		var req = {
				 method: 'POST',
				 url: url.mainurl+"/registerUser",
				 headers: {
				   'Content-Type':'application/json',
				   'appId':appId
				   
				 },
				 data: json
				}

				$http(req).then(function(response){
					console.log(response)
					if(response.data.code==5000){
					json.passoutYear=$scope.py;
					json.organization=$scope.org;
					json.designtion=$scope.desg;
					json.location=$scope.loc;
					json.contactNo=$scope.cont;
					json.address=$scope.addr;
					
					var req = {
							 method: 'POST',
							 url: url.localurl+"/user/save",
							 headers: {
							   'Content-Type':'application/json',
							   'appId':appId
							   
							 },
							 data: json
							}
					
					$http(req).then(function(response){
						console.log(response)
					}, function(response){
						
					});
					
					$scope.regStatus=response.data.message;
					window.location.href="#/regResult";
					}
					else if(response.data.code==2019)
						{
						$scope.regStatus=response.data.message;
						window.location.href="#/regResultFail";
						}
					
				
					
				}, function(response){
					
				});
		
		
		
	}
	

}]);

angular.module('kvapp')
.controller('calenderController', ['$scope', '$rootScope', '$http','$window', function($scope, $rootScope, $http,$window) {
	$window.scrollTo(0, 0);
	 $http.get("json/calender.json").success(function(data){
      	  
      	 $scope.calender=data;      	  
      	  
        });
}]);

