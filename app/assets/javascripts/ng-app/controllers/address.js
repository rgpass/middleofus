(function() {

  angular
    .module('myApp')
    .controller('AddressController',
      ['$timeout', 'addressesService', '$location', AddressController]);

    function AddressController($timeout, addressesService, $location) {

      var vm = this;

      vm.addLocation = addLocation;
      vm.addresses = addressesService.addresses;
      vm.addressesOnly = [];
      vm.checkIfValidAddress = checkIfValidAddress;
      vm.clearSelectedResult = clearSelectedResult;
      vm.createMessage = createMessage;
      vm.customUrl = addressesService.customUrl;
      vm.error      = addressesService.error;
      vm.getGeolocation = getGeolocation;
      vm.generateCustomUrl = generateCustomUrl;
      vm.geolocationErrorMessage = 'Your browser does not support geolocation.'
      vm.hideIcons = hideIcons;
      vm.isAllEmpty = true;
      vm.isAllValid = true;
      vm.isGeolocationProcessing = false;
      vm.isGeolocationError = false;
      vm.phoneNumber = '';
      vm.placeType = 'free wifi';
      vm.processing = false;
      vm.removeLocation = removeLocation;
      vm.results = false;
      vm.selectResult = selectResult;
      vm.selectedResult = null;
      vm.sendingText = false;
      vm.sentText    = false;
      vm.submitInfo = submitInfo;
      vm.textError   = false; 

      activate();


      ///// PUBLIC METHODS /////////////////////////////////////////////////////
      function activate() {
        checkIfAllEmptyAndValid();

        checkIfSharedLink();
      }

      function addLocation() {
        // TODO: Figure out why this causes an error
        var newLocation = {
          address: '',
          placeholder: 'optional address, city, or zip',
          isProcessing: false,
          isValid: true,
          isEmpty: true
        };

        vm.addresses.push(newLocation);
      }

      function checkIfValidAddress(address) {
        var actualAddress = address.address;

        if (actualAddress) {
          address.isEmpty = true;
          address.isProcessing = true;
          addressesService
            .isValidAddress(address)
            .success(checkIfAllEmptyAndValid);
        } else {
          address.isEmpty = true;
          address.isProcessing = false;
          address.isValid = true;
          checkIfAllEmptyAndValid();
        }
      }

      function clearSelectedResult() {
        $timeout(scrollToResults, 1);
        $timeout(function() {
          vm.selectedResult = null;
        }, 500);
      }

      function createMessage() {
        var phoneNumber = vm.phoneNumber,
          place         = vm.selectedResult.name,
          address       = vm.selectedResult.address;
        vm.sentText    = false;
        vm.textError   = false; 
        vm.sendingText = true;

        addressesService
          .sendMessage(phoneNumber, place, address)
            .success(setTextVariables)
            .error(setTextVariables);
      }

      function generateCustomUrl() {
        var addressesOnly = _.map(vm.addresses, function(address) {
          return address.address;
        });
        addressesService.generateCustomUrl(addressesOnly).success(function(data) {
          addressesService.customUrl = 'http://www.middleof.us/?l=' + data.key;
          vm.customUrl = addressesService.customUrl;
        })
      }

      function getGeolocation() {
        vm.isGeolocationProcessing = true;
        vm.isGeolocationError = false;
        vm.addresses[0].placeholder = 'Finding your location...';
        vm.addresses[0].address = '';
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $timeout(function() {
              var coords = position.coords.latitude + ', ' + position.coords.longitude;
              addressesService.addressFromGeolocation(coords);
              vm.isGeolocationProcessing = false;
            }, 1);
          }, function() {
            handleNoGeolocation(true);
          });
        } else {
          handleNoGeolocation(false);
        }
      }

      function hideIcons() {
        vm.sendingText = false;
        vm.sentText    = false;
        vm.textError   = false;
      }

      function removeLocation(address) {
        var i = vm.addresses.indexOf(address);
        vm.addresses.splice(i, 1);
      }

      function selectResult(result) {
        vm.selectedResult = result;
        vm.sentText       = false;
        vm.textError      = false; 
        $timeout(scrollToResult, 1);
      }

      function submitInfo() {
        var addressesOnly = _.map(vm.addresses, function(address) {
          return address.address;
        });
        vm.results = false;
        vm.selectedResult = null;
        vm.addressesOnly = _.filter(addressesOnly, function(address) { return address });
        addressesService.getResults(vm.addressesOnly, vm.placeType).success(setVariables).error(setVariables);
      }


      ///// PRIVATE METHODS ////////////////////////////////////////////////////
      function checkIfAllEmptyAndValid() {
        vm.isAllValid = true;
        vm.isAllEmpty = true;
        _.each(vm.addresses, function(address) {
          if (!address.isValid) {
            vm.isAllValid = false;
          }
          if (address.address) {
            vm.isAllEmpty = false;
          }
        });
      }

      function checkIfSharedLink() {
        var key = $location.search().l;
        if (key) {
          vm.addresses = [];
          $timeout(function() {
            addressesService.loadInAddresses(key).success(function() {
              vm.addresses = addressesService.addresses;
            });
          }, 1);
          $timeout(function() {
            _.each(vm.addresses, function(address) {
              address.isEmpty = true;
              address.isProcessing = true;
              addressesService.isValidAddress(address);
            });
          }, 1000);
        }
      }

      function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          vm.isGeolocationProcessing = false;
          vm.isGeolocationError = true;
          vm.geolocationErrorMessage = 'Geolocation failed. Try again.'
        } else {
          vm.isGeolocationProcessing = false;
          vm.isGeolocationError = true;
          vm.geolocationErrorMessage = 'Your browser does not support geolocation.'
        }
      }

      function scrollToResults() {
        $('body,html').animate({
          scrollTop: $('#results').offset().top
        }, 500);
      }

      function scrollToResult() {
        $('body,html').animate({
          scrollTop: $('#result').offset().top
        }, 250);
      }

      function setTextVariables() {
        vm.sendingText = false;
        vm.sentText    = addressesService.sentText;
        vm.textError   = addressesService.textError;  
      }

      function setVariables() {
        vm.processing = false;
        vm.error      = addressesService.error;
        vm.results    = addressesService.results;
        if (vm.error == null) {
          $timeout(scrollToResults, 1);
        }
      }
    }
})();
