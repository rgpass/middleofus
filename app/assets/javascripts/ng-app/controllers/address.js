angular.module('myApp')
.controller('AddressCtrl', ['$scope', 'addressesService', function ($scope, addressesService) {

  $scope.isFirstValid = true;
  $scope.isSecondValid = true;

  $scope.$watch('formData.addressOne', setFirstValidations);
  $scope.$watch('formData.addressTwo', setSecondValidations);

  function setFirstValidations(newValue, oldValue) {
    if (newValue) {
      $scope.isFirstProcessing = true;
      $scope.isFirstEmpty = true;
      addressesService.isValidAddress($scope.formData.addressOne).success(function(data) {
        $scope.isFirstValid = data.is_valid;
        $scope.isFirstEmpty = false;
        $scope.isFirstProcessing = false;
      });
    } else {
      $scope.isFirstEmpty = true;
      $scope.isFirstValid = true;
    }
  }

  function setSecondValidations(newValue, oldValue) {
    if (newValue) {
      $scope.isSecondProcessing = true;
      $scope.isSecondEmpty = true;
      addressesService.isValidAddress($scope.formData.addressTwo).success(function(data) {
        $scope.isSecondValid = data.is_valid;
        $scope.isSecondEmpty = false;
        $scope.isSecondProcessing = false;
      });
    } else {
      $scope.isSecondEmpty = true;
      $scope.isSecondValid = true;
    }
  };

  $scope.submitAddresses = function() {
    var addresses = [$scope.formData.addressOne, $scope.formData.addressTwo];
    addressesService.getResults(addresses).success(setVariables).error(setVariables);
  };

  function setVariables() {
    $scope.processing = false;
    $scope.error      = addressesService.error;
    $scope.results    = addressesService.results;  
  };

}]);