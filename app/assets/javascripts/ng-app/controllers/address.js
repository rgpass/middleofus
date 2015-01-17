angular.module('myApp')
.controller('AddressCtrl', ['$scope', '$timeout', 'addressesService', function ($scope, $timeout, addressesService) {

  $scope.isAllValid = false;

  var firstAddress = { address: "", placeholder: "i.e. 273 Buckhead Avenue Northeast, Atlanta, GA 30305", isProcessing: false, isValid: true, isEmpty: true };
  var secondAddress = { address: "", placeholder: "optional second address, city, or zip", isProcessing: false, isValid: true, isEmpty: true };
  $scope.addresses = [firstAddress, secondAddress];

  $scope.addLocation = function() {
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
        addressesService.isValidAddress2(newLocation);
      } else if (newLocation.address == "") {
        newLocation.isEmpty = true;
        newLocation.isProcessing = false;
        newLocation.isValid = true;
      }
    }
    if (newValue != oldValue) {
      $timeout(function() {
        $scope.isAllValid = true;
        _.each($scope.addresses, function(address) {
          if (address.isValid == false) {
            $scope.isAllValid = false;
          }
        })
      }, 1);
    }
  }, true);

  $scope.submitAddresses = function() {
    var addressesOnly = _.map($scope.addresses, function(address) {
      return address.address;
    })
    addressesService.getResults(addressesOnly).success(setVariables).error(setVariables);    
  };

  function setVariables() {
    $scope.processing = false;
    $scope.error      = addressesService.error;
    $scope.results    = addressesService.results;  
  };

  $scope.selectResult = function(result) {
    $scope.selectedResult = result;
  }

  $scope.clearSelectedResult = function() {
    $scope.selectedResult = null;
  }

}]);