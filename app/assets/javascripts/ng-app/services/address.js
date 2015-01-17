angular.module('myApp')
.service('addressesService', ["$http", function($http) {

  var that = this;
  var resultsUrl = '/results';
  var validityUrl = '/valid-address'

  this.getResults = function(addresses) {
    params = { addresses: JSON.stringify(addresses) };
    return $http.get(resultsUrl + '.json', { params: params }).success(function(data) {
      that.error    = null;
      that.results  = data;
    }).error(function() {
      that.error    = 'Something went wrong. Please check the address(es) and your internet connection.';
      that.results  = null;
    });
  };

  this.isValidAddress = function(address) {
    params = { address: address };
    return $http.get(validityUrl + '.json', { params: params});
  }

  this.isValidAddress2 = function(location) {
    params = { address: location.address };
    return $http.get(validityUrl + '.json', { params: params}).success(function(data) {
      location.isValid = data.is_valid;
      location.isEmpty = false;
      location.isProcessing = false;
    });
  }
  
}]);