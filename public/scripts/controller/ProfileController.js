(function(){
   
   angular
       .module('BloggerApp')
       .controller('ProfileController', ProfileController);
    
    ProfileController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog', '$mdBottomSheet', 'userService', '$state'];
   
    
    function ProfileController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog, $mdBottomSheet, userService, $state)
    {
    };
    
    
    
    
    
})();