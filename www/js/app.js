// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //Main part of the code
    cordova.getAppVersion(function(version) {
      appVersion = version;
      console.info("Version: " + appVersion);
      registerPushNotification();
    });

    var androidConfig = {
      "senderID":"GOOGLE_PROJECT_API_KEY", //This is the project/sender ID from Google, created in Part A
      "ecb":"onAndroidNotification" //This is the function we will call when a push notification arrives. This will be detailed in the next step.
    };

    storedPushNotificationId = $localStorage.get("pushNotificationId", "");
    storedRegisteredAppVersion = $localStorage.get("registeredAppVersion", "");
    var shouldRegister = false;

    var registerPushNotification = function() {
      if (storedPushNotificationId == "") {
        shouldRegister = true;
      }
      else {
        if (storedRegisteredAppVersion != appVersion) {
          shouldRegister = true;
        }
      }

      if (shouldRegister) {
        if (device.platform == "Android") {
          $cordovaPush.register(androidConfig).then(function(result) {
            console.info('$cordovaPush.register succeeded. Result: '+ result);
          }, function(err) {
            console.info('$cordovaPush.register failed. Error: ' + err);
          });
        }
      }
      //End of main part of the code
    };
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      controller: 'TabCtrl'
    })

    // Each tab has its own nav history stack:

    .state('tab.alertas', {
      url: '/alertas',
      views: {
        'tab-alertas': {
          templateUrl: 'templates/tab-alertas.html',
          controller: 'AlertCtrl'
        }
      }
    })

    .state('tab.reportes', {
      url: '/reportes',
      views: {
        'tab-reportes': {
          templateUrl: 'templates/tab-reportes.html',
          controller: 'RepCtrl'
        }
      }
    })

    .state('tab.telefonos', {
      url: '/telefonos',
      views: {
        'tab-telefonos': {
          templateUrl: 'templates/tab-telefonos.html',
          controller: 'TelCtrl'
        }
      }
    })
    

    .state('tab.rutas', {
      url: '/rutas',
      views: {
        'tab-rutas': {
          templateUrl: 'templates/tab-rutas.html',
          controller: 'RutaCtrl'
        }
      }
    })

    .state('tab.trolley', {
      url: '/trolley',
      views: {
        'tab-trolley': {
          templateUrl: 'templates/tab-trolley.html',
          controller: 'TrolleyCtrl'
        }
      }
    })

    .state('tab.recursos', {
      url: '/recursos',
      views: {
        'tab-recursos': {
          templateUrl: 'templates/tab-recursos.html',
          controller: 'RecurCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');



});

