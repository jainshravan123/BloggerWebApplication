(function(){
   
   angular
       .module('BloggerApp')
       .controller('DashboardController', DashboardController)
       .config(theme);

    DashboardController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog', '$mdBottomSheet', 'userService', '$state'];
    theme.$inject           = ['$mdThemingProvider'];
    
    function DashboardController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog, $mdBottomSheet, userService, $state)
    {
      $scope.selectedMenu        =  selectedMenu;
      $scope.profile_avatar      =  '../images/avatar-1.svg';
      $scope.getMenuCategories   =  getMenuCategories; 
      $scope.getAdminCategories  =  getAdminCategories;
      $scope.getUserInfo         =  getUserInfo;
      $scope.selectedAdminTask   =  selectedAdminTask;  
      $scope.getAllBlogs         =  getAllBlogs;
        
      var menu      = [];
      var admin     = [];
      var user_data = "";    
      getMenuCategories();
      getAdminCategories();
      
      //getting the user information by calling the following method
      getUserInfo(localStorage.getItem("user_id"));
     
    
        
      this.isOpen = false;
      this.selectedMode = 'md-fling';
      this.selectedDirection = 'up';
        
        
      $scope.toggleSidenav = function(menuId) {
            $mdSidenav(menuId).toggle();
          }; 
        
    
      /* $rootScope.$on("CallGetUserInfo", function(user_id){
           $scope.getUserInfo(user_id);
        });    
        */
        
      function selectedMenu(item){
        console.log("Selected Menu Details : "+JSON.stringify(item));   
     
          switch(item.id){
               
              case 1: 
                          $state.go('dashboard.dashboardInner');
                          break;
              case 2:
                          $state.go('dashboard.blogs');
                          break;
              case 3: 
                          $state.go('dashboard.posts');
                          break;
              case 4: 
                          $state.go('dashboard.connections');
                          break;
              case 5: 
                          $state.go('dashboard.messages');
                          break;
              case 6: 
                          $state.go('dashboard.profile');
                          break;
                  
          }
      };
        
    
      function selectedAdminTask(item){
          
          switch(item.id){
                  
              case 1: 
                       $state.go('dashboard.trash');
                       break;
              case 2:
                       $state.go('dashboard.settings');
                       break;
              case 3:
                       localStorage.removeItem("user_id");
                       $state.go('home');
                       break;
          }
          
            /*if(item.id == 3){
            localStorage.removeItem("user_id");
            $location.path('/');
            }*/
        };    
         
      function getUserInfo(user_id)
      {
             $http.get(get_single_user_info_api + user_id).success(function(data)
            {
                 var comp_data  = JSON.stringify(data);
                 var obj        = JSON.parse(comp_data);
                 if(obj.Message == "Success"){
                      $scope.user_data = obj.Users[0];
                 }else{
                     console.log("Error is Occuring");
                 }
                 
                 
            })
            .error(function(err){
                console.log(err);
            });
      };
        
        
      function getMenuCategories(){
            
             $http.get(get_user_tasks_api).success(function(data)
            {
                 var comp_data  = JSON.stringify(data);
                 var obj        = JSON.parse(comp_data);
                 $scope.menu   =  obj.data;  
                 
            })
            .error(function(err){
                console.log(err);
            });
            
        };
        
        function getAdminCategories(){
            
            $http.get(get_admin_tasks_api).success(function(data)
            {
                 var comp_data  = JSON.stringify(data);
                 var obj        = JSON.parse(comp_data);
                 $scope.admin   =  obj.data;  
            })
            .error(function(err){
                console.log(err);
            });
            
        };
        
        
        
        
        function getAllBlogs(){
            
             $http.get(get_all_blogs_api).success(function(data)
            {
                 var comp_data  = JSON.stringify(data);
                 var obj        = JSON.parse(comp_data);
                 $scope.blogs   =  obj.data;  
                 var a1         = JSON.stringify($scope.blogs);
                
                  for(var i=0; i<obj.data.length; i++)
                  {
                     //console.log("Blog_Title : "+obj.data[i].blog_title);
                     //getUserInfo(obj.data[i].blogger_id);
                     
                  }
                  
            })
            .error(function(err){
                console.log(err);
            });
        };
    }
    
    
     function theme($mdThemingProvider)
     {
        $mdThemingProvider.theme('default')
         .primaryPalette('brown')
         .accentPalette('red');
     };
    
})();