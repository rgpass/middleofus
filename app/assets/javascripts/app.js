angular.module('myApp', []);

angular.module('myApp')
.controller('myController', ['$scope', function ($scope) {
  $scope.query = "Heyo";
}]);