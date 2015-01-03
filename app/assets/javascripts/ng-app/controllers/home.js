angular.module('myApp')
.controller('HomeCtrl', ['$scope', function ($scope) {
  $scope.formData = {
    address: ''
  };

  $scope.submitForm = function() {
    alert("send a request to the server: " + JSON.stringify($scope.formData));
  };
}]);