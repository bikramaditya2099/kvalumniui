angular.module('app')
    .controller('notifyCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.notificationData=[
                                 {
                                	 sub:"notification one",
                                	 time:"few sec ago",
                                	 detail:"more details about the notification",
                                	
                                	 notify_class:"notification-item unread clearfix",
                                	 text_class:"text-complete pull-left"
        		
                                 },
                                 {
                                	 sub:"notification two",
                                	 time:"few sec ago",
                                	 detail:"more details about the notification",
                                	
                                	 notify_class:"notification-item clearfix",
                                	 text_class:"text-danger pull-left"
        		
                                 }
                                 
                                 ]
    }])
    
    .controller('rainUserController', ['$scope', '$http','urls','$window', function($scope, $http,urls,$window) {
       
    	 var sessionId=$window.sessionStorage.sessionId;
         $scope.logout=function()
         {
       	  $http.get(urls.logout+"/"+sessionId).success(function(data){
       		$window.sessionStorage.sessionId=null;
       		  window.location.href="#access/login";
         
             });
         }
        
       
    }])
    