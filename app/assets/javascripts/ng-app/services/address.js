angular.module('myApp')
.service('addressesService', ["$http", function($http) {

  var that = this;
  var resultsUrl = '/results';

  this.getResults = function(address) {
    params = { address: address };
    return $http.get(resultsUrl + '.json', { params: params }).success(function(data) {
      that.error    = null;
      that.results  = data;
    }).error(function() {
      that.error    = 'Something went wrong. Please confirm the address is correct and that you have an internet connection.';
      that.results  = null;
    });
  };
  
}]);