angular.module('myApp')
.controller('AddressCtrl', ['$scope', 'addressesService', function ($scope, addressesService) {

  $scope.submitAddress = function() {
    addressesService.getResults($scope.formData.address).success(setVariables).error(setVariables);
  };

  function setVariables() {
    $scope.error    = addressesService.error;
    $scope.results  = addressesService.results;  
  };

}]);