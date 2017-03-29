(function(){
   
   angular
       .module('BloggerApp')
       .controller('MessagesController', MessagesController);
    
    MessagesController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog', '$mdBottomSheet', 'userService', '$state'];
   
    
    function MessagesController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog, $mdBottomSheet, userService, $state)
    {
        
    };
    
})();