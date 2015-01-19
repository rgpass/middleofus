angular.module('myApp')
.controller('AddressCtrl', ['$scope', '$timeout', 'addressesService', function ($scope, $timeout, addressesService) {

  $scope.isAllValid = true;
  $scope.isAllEmpty = true;

  var firstAddress = { address: "", placeholder: "address, city, or zip", isProcessing: false, isValid: true, isEmpty: true };
  var secondAddress = { address: "", placeholder: "optional second address, city, or zip", isProcessing: false, isValid: true, isEmpty: true };
  $scope.addresses = [firstAddress, secondAddress];

  $scope.addLocation = function() {
    // TODO: Figure out why this causes an error
    var newLocation = { address: "", placeholder: "optional address, city, or zip", isProcessing: false, isValid: true, isEmpty: true };
    $scope.addresses.push(newLocation);
  };

  $scope.$watch('addresses', function(newValue, oldValue) {

    for (var i = 0; i < newValue.length; i++) {
      newLocation = newValue[i];
      oldLocation = oldValue[i];
      if (newLocation.address != oldLocation.address) {
        newLocation.isEmpty = true;
        newLocation.isProcessing = true;
        addressesService.isValidAddress(newLocation);
      } else if (newLocation.address == "") {
        newLocation.isEmpty = true;
        newLocation.isProcessing = false;
        newLocation.isValid = true;
      }
    }
    if (newValue != oldValue) {
      $timeout(function() {
        $scope.isAllValid = true;
        $scope.isAllEmpty = true;
        _.each($scope.addresses, function(address) {
          if (address.isValid == false) {
            $scope.isAllValid = false;
          }
          if (address.isEmpty == false) {
            $scope.isAllEmpty = false;
          }
        })
      }, 1);
    }
  }, true);

  $scope.submitAddresses = function() {
    $scope.results = false;
    $scope.clearSelectedResult();
    var addressesOnly = _.map($scope.addresses, function(address) {
      return address.address;
    })
    $scope.addressesOnly = _.filter(addressesOnly, function(address) { return address });
    addressesService.getResults($scope.addressesOnly).success(setVariables).error(setVariables);
  };

  function setVariables() {
    $scope.processing = false;
    $scope.error      = addressesService.error;
    $scope.results    = addressesService.results;  
  }

  $scope.selectResult = function(result) {
    $scope.selectedResult = result;
  };

  $scope.clearSelectedResult = function() {
    $scope.selectedResult = null;
  };

  $scope.createMessage = function() {
    $scope.sendingText = true;
    var phoneNumber = $scope.phoneNumber;
    var place       = $scope.selectedResult.name;
    var address     = $scope.selectedResult.address;
    addressesService.sendMessage(phoneNumber, place, address).success(setTextVariables).error(setTextVariables);
  };

  function setTextVariables() {
    $scope.sendingText = null;
    $scope.sentText    = addressesService.sentText;
    $scope.textError   = addressesService.textError;  
  }

  $scope.map = {
    center: {
      latitude: 30,
      longitude: -84
    },
    zoom: 10
  };
  $scope.options = {
    scrollWheel: false
  };

  $scope.getGeolocation = function() {
    $scope.isGeolocationProcessing = true;
    $scope.addresses[0].placeholder = "Finding your location...";
    navigator.geolocation.getCurrentPosition(function(position) {
      $timeout(function() {
        $scope.addresses[0].address = position.coords.latitude + ", " + position.coords.longitude;
        $scope.isGeolocationProcessing = false;
        $scope.addresses[0].placeholder = "address, city, or zip";
      }, 1);
    });
  }

}]);