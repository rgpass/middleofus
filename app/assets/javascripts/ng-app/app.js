angular
  .module('myApp', [
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ct.ui.router.extras',
    'uiGmapgoogle-maps',
    'templates'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'uiGmapGoogleMapApiProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, uiGmapGoogleMapApiProvider) {

      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyC1dmAqADx6Jsu2eeaWBMCIW2U1EW05B_c',
        v: '3.17',
        libraries: 'geometry,visualization'
      });

      $stateProvider
        .state('address', {
            url: '/',
            templateUrl: 'address.html',
            controller: 'AddressCtrl as addressCtrl'
        })
        .state('donations', {
          url: '/donations',
          templateUrl: 'donations.html'
        })
        .state('team', {
          url: '/team',
          templateUrl: 'team.html'
        })
        .state('tips', {
          url: '/tips',
          templateUrl: 'tips.html'
        });

      // default fall back route
      $urlRouterProvider.otherwise('/');

      // enable HTML5 Mode for SEO
      $locationProvider.html5Mode(true);
  }]);
