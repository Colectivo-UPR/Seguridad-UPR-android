angular.module('starter.controllers', ['ionic'])

.controller('AlertCtrl', function($scope) {

})

.controller('TelCtrl', function($scope) {

})

.controller('RutaCtrl', function($scope) {

})

.controller('TrolleyCtrl', function($scope) {

})

.controller('RecurCtrl', function($scope) {
})

.controller('TabCtrl', function($scope, $ionicModal) {
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
});

