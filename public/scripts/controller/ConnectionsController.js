(function(){
   
   angular
       .module('BloggerApp')
       .controller('ConnectionsController', ConnectionsController);
    
    ConnectionsController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog', '$mdBottomSheet', 'userService', '$state'];
   
    
    function ConnectionsController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog, $mdBottomSheet, userService, $state)
    {
    };
    
})();