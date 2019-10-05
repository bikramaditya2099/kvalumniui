/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

'use strict';

angular.module('app', [
    'ngStorage',                   
    'ui.router',
    'ui.utils',
    'oc.lazyLoad'
    
])
.constant('domain','http://ec2-54-212-201-118.us-west-2.compute.amazonaws.com:8080/AlumniProject/kvpa/app/')
.constant('getAdminInfo','getAdminInfo')
.constant('getActiveUsers','getActiveUsers')
.constant('getPendingUsers','getPendingUsers')
.constant('getActiveUserCount','getActiveUserCount')
.constant('getPendingUserCount','getPendingUserCount')
.constant('logout','logout')
.constant('adminlogin','adminlogin')
.constant('activateUser','activateUser')
.constant('deActivateUser','deActivateUser')
 .service('urls',function(domain,getAdminInfo,getActiveUsers,getPendingUsers,getActiveUserCount,getPendingUserCount,logout,adminlogin,activateUser,deActivateUser){ 
	 this.getActiveUsers = domain+getActiveUsers;
	 this.getPendingUsers=domain+getPendingUsers;
	 this.getActiveUserCount=domain+getActiveUserCount;
	 this.getPendingUserCount=domain+getPendingUserCount;
	 this.logout = domain+logout;
	 this.adminlogin=domain+adminlogin;	 
	 this.getAdminInfo=domain+getAdminInfo;
	 this.activateUser=domain+activateUser;
	 this.deActivateUser=domain+deActivateUser;
 })
;



 