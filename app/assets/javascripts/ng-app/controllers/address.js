angular.module('myApp')
.controller('AddressCtrl', ['$scope', 'addressesService', function ($scope, addressesService) {

  $scope.submitAddresses = function() {
    var addresses = [$scope.formData.addressOne, $scope.formData.addressTwo];
    addressesService.getResults(addresses).success(setVariables).error(setVariables);
  };

  function setVariables() {
    $scope.error    = addressesService.error;
    $scope.results  = addressesService.results;  
  };

}]);