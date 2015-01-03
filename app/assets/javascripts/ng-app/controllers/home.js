angular.module('myApp')
    .controller('HomeCtrl', ['$scope', function ($scope) {
        $scope.things = ['This is our app', 'What do you think', 'OMG', 'yeaaaaa'];
        
    }]);