angular.module('myApp')
.service('addressesService', ["$http", function($http) {

  var that        = this;
  var resultsUrl  = '/results';
  var validityUrl = '/valid-address';
  var messageUrl  = '/message';

  this.getResults = function(addresses, placeType) {
    params = { addresses: JSON.stringify(addresses), place_type: placeType };
    return $http.get(resultsUrl + '.json', { params: params }).success(function(data) {
      that.error    = null;
      that.results  = data;
    }).error(function() {
      that.error    = 'Something went wrong. Please check the address(es) and your internet connection.';
      that.results  = null;
    });
  };

  this.sendMessage = function(phoneNumber, place, address) {
    params = { phone_number: phoneNumber, place: place, address: address };
    return $http.post(messageUrl + '.json', params).success(function() {
      that.textError = null;
      that.sentText  = true;
    }).error(function() {
      that.textError = true;
      that.sentText  = null;
    })
  };

  this.isValidAddress = function(location) {
    params = { address: location.address };
    return $http.get(validityUrl + '.json', { params: params}).success(function(data) {
      location.isValid = data.is_valid;
      location.isEmpty = false;
      location.isProcessing = false;
    });
  };
  
}]);