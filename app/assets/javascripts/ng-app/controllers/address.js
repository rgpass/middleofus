angular.module('myApp')
.controller('AddressCtrl', ['$scope', 'addressesService', function ($scope, addressesService) {

  $scope.submitAddress = function() {
    addressesService.getResults($scope.formData.address).success(function(data) {
      $scope.results = data;
    }).error(function() {
      alert('Something went wrong. Please confirm the address is correct and that you have an internet connection.');
    });
  };

}]);