angular.module('myApp')
.directive('focusFirstEmptyInput', ['$timeout', function ($timeout) {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {

      var focustElement = function () {
        var keepGoing = true;
        angular.forEach(element[0], function (field) {
          if (!keepGoing) {
            return;
          }

          if (field.tagName.toLowerCase() !== 'input')
            return;

          var fieldValue = field.value;
          if (!fieldValue) {
            field.focus();
            keepGoing = false;
          }
        });
      };

      $timeout(focustElement, 0);
    }
  };
}]);