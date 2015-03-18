angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($scope, $http, $location) {

  // Function that handles login
  $scope.login = function() {
    $http.post('http://136.145.181.112:8080/api-token-auth/', {"username": $scope.email, "password": $scope.password}).
      success(function(data, status, headers, config) {
        // On success save the token and redirect to home page
        if (status == 200) {
          window.localStorage['token'] = data.token;
          $location.path("/tab/alertas");
        };
      }).
      error(function(data, status, headers, config) {
        alert("Error during login.");
      });
  }

  // Function that redirects to register
  $scope.register = function() {
    $location.path("/register");
  }

  // If user is logged in redirect to home page
  // TODO: Actually query the API to verify that token is still valid
  var init = function() {
    if (window.localStorage['token'] !== undefined) {
      $location.path("/tab/alertas");
    }
  }
  // init();

})

// Abstract control for registration that handles all of the actual registration
// logic. TODO: All sorts of sanity checks and input validations
.controller('RegisterCtrl', function($scope, $location, $http) {

  // Function to login after actually creating a user.
  $scope.login = function() {
    $http.post('http://136.145.181.112:8080/api-token-auth/', {"username": $scope.user.email, "password": $scope.user.password}).
      success(function(data, status, headers, config) {
        // After sucesful login save the token and create the actual object
        // i.e. Business, Employee or Client
        if (status == 200) {
          window.localStorage['token'] = data.token;
          $location.path("/tab/alertas");
        };
      }).
      error(function(data, status, headers, config) {
        alert("Error during login. Please contact Christian.");
      });
  }

  // Function that creates the user in the db.
  $scope.createUser = function() {
    console.log($scope.user)
    $http.post('http://136.145.181.112:8080/register/', $scope.user).
      // On success attempt to login.
      success(function(data, status, headers, config) {
        console.log(status);
        // On success save the token and redirect to home page
        if (status == 201) {
          $scope.login();
        };
      }).
      error(function(data, status, headers, config) {
        alert('Error creating user. Please contact Alex.');
      });
  }

  // Function that redirects to register
  $scope.loginMove = function() {
    $location.path("/login");
  }

  // Empty user object to store the input information
  $scope.user = {};

})

.controller('AlertCtrl', function($scope, $ionicSlideBoxDelegate, $http) {

  $scope.myActiveSlide = 0;

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
    $scope.myActiveSlide = 1;
  }

  $scope.backSlide = function() {
    $ionicSlideBoxDelegate.previous();
    $scope.myActiveSlide = 0;
  }

  $scope.indexUpdate = function($index){

    $scope.myActiveSlide = $index;
  }

  $scope.alertas = [];
  $scope.reportes = [];

  $scope.getIncidents = function() {

    $http.get('http://136.145.181.112:8080/alerts/', {headers: {'Authorization': 'Token ' + window.localStorage['token']}}).
    success(function(data, status) {


      $scope.alertas = data.results;
      console.log($scope.alertas);
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status) {
      console.log("Buscando incidentes");
    });
  }

  $scope.getReports = function() {

    $http.get('http://136.145.181.112:8080/reports/', {headers: {'Authorization': 'Token ' + window.localStorage['token']}}).
    success(function(data, status) {


      $scope.reportes = data.results;
      console.log($scope.reportes);
      console.log("Buscando reportes");
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status) {
      console.log("Buscando reportes");
    });
  }

  $scope.getIncidents();
  $scope.getReports();

})

.controller('RepCtrl', function($scope) {

})

.controller('TelCtrl', function($scope, $http) {

  $scope.telefonos = [];

  $scope.getPhones = function() {

    $http.get('http://136.145.181.112:8080/phones/', {headers: {'Authorization': 'Token ' + window.localStorage['token']}}).
    success(function(data, status) {


      $scope.telefonos = data.results;
      console.log($scope.telefonos);
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status) {
      console.log("Buscando telefonos")
    });
  }

  $scope.getPhones();

})

.controller('RutaCtrl', function($scope) {

})

.controller('TrolleyCtrl', function($scope) {

})

.controller('RecurCtrl', function($scope, $http) {

  $scope.recursos = [];

  $scope.getServices = function() {

    $http.get('http://136.145.181.112:8080/services/', {headers: {'Authorization': 'Token ' + window.localStorage['token']}}).
    success(function(data, status) {


      $scope.recursos = data.results;
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status) {
      console.log("Buscando telefonos")
    });
  }

  $scope.getServices();
})

.controller('TabCtrl', function($scope, $ionicModal, $http, $location) {
  $ionicModal.fromTemplateUrl('create-alert.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Function that creates the user in the db.
  $scope.createAlert = function() {
    console.log($scope.alert);
    $http.post('http://136.145.181.112:8080/create-incident/', $scope.alert, {headers: {'Authorization': 'Token ' + window.localStorage['token']}}).
      // On success attempt to login.
      success(function(data, status, headers, config) {
        console.log(status);
        // On success save the token and redirect to home page
        if (status == 201) {
          $location.path("/tab/alertas");
        };
      }).
      error(function(data, status, headers, config) {
        alert('Error creating alert. Please contact Alex.');
      });
  }

  var init = function() {
    if (window.localStorage['token'] === undefined) {
      $location.path("/login");
    }
  }
  init();

  // Empty alert object to store the input information
  $scope.alert = {};
});

