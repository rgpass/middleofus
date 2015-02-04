angular.module('myApp')
.service('addressesService', ["$http", function($http) {

  var that        = this;
  var resultsUrl  = '/results';
  var validityUrl = '/valid-address';
  var messageUrl  = '/message';


  var firstAddress = { address: "", placeholder: "address, city, or zip", isProcessing: false, isValid: true, isEmpty: true };
  var secondAddress = { address: "", placeholder: "optional address, city, or zip", isProcessing: false, isValid: true, isEmpty: true };
  this.addresses = [firstAddress, secondAddress];

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
      that.textError = false;
      that.sentText  = true;
    }).error(function() {
      that.textError = true;
      that.sentText  = false;
    })
  };

  this.isValidAddress = function(location) {
    params = { address: location.address };
    return $http.get(validityUrl + '.json', { params: params }).success(function(data) {
      location.isValid = data.is_valid;
      location.isEmpty = false;
      location.isProcessing = false;
      location.foundAddress = data.found_address;
    });
  };

  this.addressFromGeolocation = function(coords) {
    params = { address: coords };
    return $http.get(validityUrl + '.json', { params: params }).success(function(data) {
      that.addresses[0].address = data.found_address;
      that.addresses[0].isValid = data.is_valid;
      that.addresses[0].isEmpty = false;
      that.addresses[0].isProcessing = false;
      that.addresses[0].foundAddress = data.found_address;
      that.addresses[0].placeholder = "address, city, or zip";
    });
  }

  this.setAddresses = function(addresses) {
    that.addresses = addresses;
  }
  
}]);