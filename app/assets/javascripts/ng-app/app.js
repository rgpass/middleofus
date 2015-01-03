angular
  .module('myApp', [
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ct.ui.router.extras',
    'templates'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      /**
       * Routes and States
       */
      $stateProvider
          .state('home', {
              url: '/',
              templateUrl: 'home.html',
              controller: 'HomeCtrl'
          })
          .state('donations', {
            url: '/donations',
            templateUrl: 'donations.html'
          });

      // default fall back route
      $urlRouterProvider.otherwise('/');

      // enable HTML5 Mode for SEO
      $locationProvider.html5Mode(true);
  }]);

