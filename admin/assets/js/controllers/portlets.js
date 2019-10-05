'use strict';

/* Controllers */

angular.module('app')
    .controller('PortletCtrl', ['$rootScope','$scope', '$http', '$timeout','urls','$window','session', function($rootScope,$scope, $http, $timeout,urls,$window,session) {

    
    var sessionId=session.getSession();
    if(sessionId==null || sessionId=="undefined")
    	{
    	if($window.sessionStorage.sessionId==null || $window.sessionStorage.sessionId=="" || $window.sessionStorage.sessionId=="undefined")
    		window.location.href="#access/login";
    	sessionId=	$window.sessionStorage.sessionId;
    	}
    	
    	 $http.get(urls.getAdminInfo+"/"+sessionId).success(function(data){
       	  
       	
       	$rootScope.userInfo=data;
       	  
       	  if ($scope.userInfo == ''){window.location.href="#access/login";}
       	  else{
       		  
       		  
       		 $http.get(urls.getActiveUsers+"/"+sessionId).success(function(data){
             	  $scope.activeUsers=data;
               });
       		 
       		 $http.get(urls.getPendingUsers+"/"+sessionId).success(function(data){
            	  $scope.pendingUsers=data;
              });
       		 
       		 $http.get(urls.getActiveUserCount+"/"+sessionId).success(function(data){
           	  $scope.activeUserCount=data;
             });
       		 
       		 $http.get(urls.getPendingUserCount+"/"+sessionId).success(function(data){
           	  $scope.pendingUserCount=data;
             });
       	 
       		  
       	  }
       	  
         });
    	 
    	 
    	 $scope.approve=function(item)
    	 {
    		 console.log(item);
    		 var json={};
    		 json.userName=item.userEmail;
    			var req = {
						 method: 'POST',
						 url: urls.activateUser+"/"+sessionId,
						 headers: {
						   'Content-Type':'application/json'
						   
						 },
						 data: json
						}
				
				$http(req).then(function(response){
					console.log(response)
					$scope.pendingUsers.splice($scope.pendingUsers.indexOf(item),1);
					$scope.activeUsers.push(item);
				}, function(response){
					
				});
    	 }
    
    	 
    	 $scope.disApprove=function(item){
    		 console.log(item);
    		 var json={};
    		 json.userName=item.userEmail;
    			var req = {
						 method: 'POST',
						 url: urls.deActivateUser+"/"+sessionId,
						 headers: {
						   'Content-Type':'application/json'
						   
						 },
						 data: json
						}
				
				$http(req).then(function(response){
					console.log(response)
					$scope.activeUsers.splice($scope.activeUsers.indexOf(item),1);
					$scope.pendingUsers.push(item);
				}, function(response){
					
				});
    		 
    	 }
         
         $scope.logout=function()
         {
       	  $http.get(urls.logout+"/"+sessionId).success(function(data){
       		$window.sessionStorage.sessionId=null;
       		  window.location.href="#access/login";
         
             });
         }
    	
        $scope.refreshTest = function(portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    refresh: false
                });
            }, 2000);

        }

        $scope.refreshWithErrorTest = function(portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    error: "Something went terribly wrong!"
                });
            }, 2000);

        }


    }]);
