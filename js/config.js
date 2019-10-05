/* ============================================================
 * File: config.js
 * Configure routing

 * ============================================================ */


var app = angular.module("kvapp", [
"ui.router", 
"oc.lazyLoad",  
]); 


app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',

    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $urlRouterProvider
            .otherwise('/home');

        $stateProvider
            /*.state('commitee', {
                abstract: true,
                url: "/commitee",
                templateUrl: "tpl/commitee.html"
            })*/
        .state('login', {
            url: "/login",
            templateUrl: "tpl/login.html",
            controller: 'loginController',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                            
                           
                            'analytics'
                            
                        ], {
                            insertBefore: '#lazyload_placeholder'
                        })
                }]
            }
        })
         .state('register', {
            url: "/register",
            templateUrl: "tpl/register.html",
            controller: 'loginController'
        })
             .state('commitee', {
                url: "/commitee",
                templateUrl: "tpl/commitee.html",
                controller: 'dataController'
            })
            .state('home', {
                url: "/home",
                templateUrl: "body.html",
                controller: 'kvcontroller',
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                
                                'theme',
                                'analytics'
                                
                            ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                            .then(function() {
                                return $ocLazyLoad.load([
                                   
                                                                      
                                    'vendor/rs-plugin/js/jquery.themepunch.tools.min.js',
                                    'vendor/rs-plugin/js/jquery.themepunch.revolution.min.js'
                                   
                                    
                                    
                                   
                                ]);
                            });
                    }]
                }
            })
             .state('gallery', {
            url: "/gallery",
            templateUrl: "tpl/gallery.html"
           
        })
           .state('aboutus', {
            url: "/aboutus",
            templateUrl: "tpl/aboutus.html",
            controller: 'kvcontroller'
           
        })
         .state('calender', {
            url: "/calender",
            templateUrl: "tpl/calender.html",
            controller: 'calenderController'
           
        })
        .state('donate', {
            url: "/donate",
            templateUrl: "tpl/donation.html"
            
           
        })
        .state('logout', {
            url: "/logout",
            templateUrl: "tpl/logout.html"
            
           
        })
         .state('profile', {
            url: "/profile",
            templateUrl: "tpl/profile.html",
            controller: 'kvcontroller'
            
           
        })
          .state('contactus', {
            url: "/contactus",
            templateUrl: "tpl/contactus.html"
            
           
        })
        
        .state('regResult', {
            url: "/regResult",
            templateUrl: "tpl/regResult.html"
            
           
        })
        
        .state('regResultFail', {
            url: "/regResultFail",
            templateUrl: "tpl/regResultFail"
            
           
        })
        
        
       
}]);


app.controller('kvcontroller', ['$location','$scope', '$rootScope', '$state','$window','$http','UserService','url', function($location,$scope, $rootScope, $state,$window,$http,UserService,url) {
	
	
	var sessionId=$window.sessionStorage.sessionId;
	$scope.sessId=$window.sessionStorage.sessionId;
	$scope.props=false;
	
	$scope.callme=function()
	{
		$scope.props=true;
	}
	
	$scope.callAfter=function()
	{
		$location.path('/home');
		$location.path('/profile');
	}
	$scope.submitForm=function()
	{
		
		
		/* var xhttp = new XMLHttpRequest();
		    xhttp.onreadystatechange = function() 
		    {
		        if (xhttp.readyState == 4 && xhttp.status == 200)
		        {
		            document.getElementById("result").innerHTML = xhttp.responseText;
		        }
		     };
		    
		     xhttp.open("POST", "/AlumniProject/kvpa/user/upload/"+sessionId, true);
		     xhttp.setRequestHeader("Accept", "multipart/form-data");
		     xhttp.send();*/

		   
		 $("#ppform").submit();
		setTimeout(function(){ 
			
			window.location.href = "#/home";
			window.location.href = "#/profile";
			$state.reload()
		
			
		}, 1000);
	}
	 var formdata = new FormData();
     $scope.getTheFiles = function ($files) {
         
    	  angular.forEach($files, function (value, key) {
              formdata.append(key, value);
          });
             
             var request = {
                     method: 'POST',
                     url: url.localurl+'/user/upload',
                     data: formdata,
                     headers: {
                         'Content-Type': undefined
                     }
                 };

                 // SEND THE FILES.
                 $http(request)
                     .success(function (d) {
                         alert(d);
                     })
                     .error(function () {
                     });
         
     };
	
	
	console.log($location.path());
	
	$window.scrollTo(0, 0);
	
	// Commom Plugins
	$http.get(url.localurl+"/app/getUserInfo/"+sessionId).success(function(data){
		console.log(data);
		$rootScope.info=data;
	})
	if($rootScope.info==null){
	$rootScope.info={};
	}
	
	$scope.formatDate=function(dateVal)
	{
		if(dateVal==undefined)
			{
			window.location.href = "#/login";
			}
			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			];

			  var date1 = dateVal.split('T')[0];
			  var date = new Date(date1);
			  var getDay = date.getDate();
			  var getMonth = date.getMonth();
			  var getYear = date.getFullYear();
			 
			  return  getDay +'-'+ monthNames[getMonth] + '-' +getYear
			
	}
function initialize()
{
	(function($) {

		'use strict';

		// Scroll to Top Button.
		if (typeof theme.PluginScrollToTop !== 'undefined') {
			theme.PluginScrollToTop.initialize();
		}

		// Tooltips
		if ($.isFunction($.fn['tooltip'])) {
			$('[data-tooltip]:not(.manual), [data-plugin-tooltip]:not(.manual)').tooltip();
		}

		// Popover
		if ($.isFunction($.fn['popover'])) {
			$(function() {
				$('[data-plugin-popover]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.popover(opts);
				});
			});
		}

		// Validations
		if (typeof theme.PluginValidation !== 'undefined') {
			theme.PluginValidation.initialize();
		}

		// Parallax
		if (typeof theme.PluginParallax !== 'undefined') {
			theme.PluginParallax.initialize();
		}

		// Match Height
		if ($.isFunction($.fn['matchHeight'])) {

			$('.match-height').matchHeight();

			// Featured Boxes
			$('.featured-boxes .featured-box').matchHeight();

			// Featured Box Full
			$('.featured-box-full').matchHeight();

		}

	}).apply(this, [jQuery]);

	// Animate
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginAnimate'])) {

			$(function() {
				$('[data-plugin-animate], [data-appear-animation]').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginAnimate(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Carousel
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginCarousel'])) {

			$(function() {
				$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginCarousel(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Chart.Circular
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginChartCircular'])) {

			$(function() {
				$('[data-plugin-chart-circular]:not(.manual), .circular-bar-chart:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginChartCircular(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Counter
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginCounter'])) {

			$(function() {
				$('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginCounter(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Flickr
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginFlickr'])) {

			$(function() {
				$('[data-plugin-flickr]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginFlickr(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Lazy Load
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginLazyLoad'])) {

			$(function() {
				$('[data-plugin-lazyload]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginLazyLoad(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Lightbox
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginLightbox'])) {

			$(function() {
				$('[data-plugin-lightbox]:not(.manual), .lightbox:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginLightbox(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Masonry
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginMasonry'])) {

			$(function() {
				$('[data-plugin-masonry]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginMasonry(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Match Height
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginMatchHeight'])) {

			$(function() {
				$('[data-plugin-match-height]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginMatchHeight(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Progress Bar
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginProgressBar'])) {

			$(function() {
				$('[data-plugin-progress-bar]:not(.manual), [data-appear-progress-animation]').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginProgressBar(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Revolution Slider
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginRevolutionSlider'])) {

			$(function() {
				$('[data-plugin-revolution-slider]:not(.manual), .slider-container .slider:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginRevolutionSlider(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Sort
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginSort'])) {

			$(function() {
				$('[data-plugin-sort]:not(.manual), .sort-source:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginSort(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Sticky
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginSticky'])) {

			$(function() {
				$('[data-plugin-sticky]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginSticky(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Toggle
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginToggle'])) {

			$(function() {
				$('[data-plugin-toggle]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginToggle(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Tweets
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginTweets'])) {

			$(function() {
				$('[data-plugin-tweets]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginTweets(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Video Background
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginVideoBackground'])) {

			$(function() {
				$('[data-plugin-video-background]:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginVideoBackground(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Word Rotate
	(function($) {

		'use strict';

		if ($.isFunction($.fn['themePluginWordRotate'])) {

			$(function() {
				$('[data-plugin-word-rotate]:not(.manual), .word-rotate:not(.manual)').each(function() {
					var $this = $(this),
						opts;

					var pluginOptions = $this.data('plugin-options');
					if (pluginOptions)
						opts = pluginOptions;

					$this.themePluginWordRotate(opts);
				});
			});

		}

	}).apply(this, [jQuery]);

	// Commom Partials
	(function($) {

		'use strict';

		// Sticky Header
		if (typeof theme.StickyHeader !== 'undefined') {
			theme.StickyHeader.initialize();
		}

		// Nav Menu
		if (typeof theme.Nav !== 'undefined') {
			theme.Nav.initialize();
		}

		// Search
		if (typeof theme.Search !== 'undefined') {
			theme.Search.initialize();
		}

		// Newsletter
		if (typeof theme.Newsletter !== 'undefined') {
			theme.Newsletter.initialize();
		}

		// Account
		if (typeof theme.Account !== 'undefined') {
			theme.Account.initialize();
		}

	}).apply(this, [jQuery]);
	}

try {
	initialize();
}
catch(err) {
    console.log(err);
}

$http.get("json/calender.json").success(function(data){
	  
 	 $scope.caldata=data; 
 	 $scope.allEvents=[];
 	  angular.forEach($scope.caldata, function (data, key) {
 		  
 		 angular.forEach(data.events, function (value, key) {
 	 		
 			value.date=new Date(value.date); 
 			var currDate=new Date();
 			if(value.date>currDate){
 			$scope.allEvents.push(value);
 			}
 	          
 	      });
          
      });
 	  
   });

$scope.logout=function()
{
	$rootScope.info={};
	$http.get(url.localurl+"/app/logout/"+sessionId).success(function(){
		$window.sessionStorage.sessionId=null;
		$scope.sessId=null;
	})
	$http.get(url.mainurl+"/logout").success(function(){
	})
	
}
}]);


