angular.module('myApp')
.service('addressesService', ["$http", function($http) {

  var that = this;
  var resultsUrl = '/results';

  // 1. Validate the user's address


  // 2. Submit multiple users' addresses
  this.getResults = function(address) {
    params = { address: address };
    return $http.get(resultsUrl + '.json', { params: params });
  };
}]);