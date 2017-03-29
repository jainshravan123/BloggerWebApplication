(function(){
   
   angular
       .module('BloggerApp')
       .controller('YourPostsController', YourPostsController);
    
    YourPostsController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog', '$mdBottomSheet', 'userService', '$state'];
   
    
    function YourPostsController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog, $mdBottomSheet, userService, $state)
    {
    };
    
    
    
    
    
})();