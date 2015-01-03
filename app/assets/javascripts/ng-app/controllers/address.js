angular.module('myApp')
.controller('AddressCtrl', ['$scope', 'addressesService', function ($scope, addressesService) {
  $scope.formData = {
    address: ''
  };

  $scope.results = [];

  $scope.submitAddress = function() {
    addressesService.getResults($scope.formData.address).success(function(data) {
      $scope.results = data;
    }).error(function() {
      alert('Woops!');
    });
  };
}]);