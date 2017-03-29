(function(){
   
   angular
       .module('BloggerApp')
       .controller('ToastController', ToastController)
       .config(theme);

   ToastController.$inject = ['$scope', '$mdToast'];
   theme.$inject           = ['$mdThemingProvider'];
    
    //controller for toast notification
    function ToastController($scope, $mdToast)
    {
         $scope.closeToast = function() {
      
                $mdToast
                  .hide()
                  .then(function() {
                    isDlgOpen = false;
                  });
         };
    }    
    
     function theme($mdThemingProvider)
     {
        $mdThemingProvider.theme('default')
         .primaryPalette('brown')
         .accentPalette('red');
     ;}
    
})();