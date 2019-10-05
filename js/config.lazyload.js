/* ============================================================
 * File: config.lazyload.js
 * Configure modules for ocLazyLoader. These are grouped by 
 * vendor libraries. 
 * ============================================================ */

angular.module('kvapp')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [{
                    name: 'theme',
                    files: [
                            'js/theme.js',
                            'js/examples/examples.carousels.js',
                            'js/examples/examples.gallery.js',
                            'js/examples/examples.lightboxes.js',
                            'vendor/rs-plugin/js/jquery.themepunch.tools.min.js',
                            'vendor/rs-plugin/js/jquery.themepunch.revolution.min.js',
                            'vendor/circle-flip-slideshow/js/jquery.flipshow.js',
                            'js/views/view.home.js',
                            'vendor/owl.carousel/owl.carousel.js',
                            
                    ]
                }, {
                    name: 'themeinit',
                    files: [
                        'js/theme.init.js'
                    
                    ]
                },
                {
                    name: 'analytics',
                    files: [
                         /*'js!https://www.googletagmanager.com/gtag/js?id=UA-109830739-1',   */
                        'js/custom.js'
                    
                    ]
                }
            ]
        });
    }]);