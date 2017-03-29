(function(){
   
   angular
       .module('BloggerApp')
       .controller('BlogsController', BlogsController);
    
    BlogsController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog', '$mdBottomSheet', 'userService', '$state', 'BlogsService'];
   
    
    function BlogsController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog, $mdBottomSheet, userService, $state, BlogsService, home_scope, home_blog_title)
    {

      var temp_blog = localStorage.getItem("temp_blog");
      localStorage.removeItem("temp_blog");
      $scope.blog = JSON.parse(temp_blog);
      $scope.blog_id = $scope.blog.blog_id;
      
      $scope.cancel  = cancel;

    
      $http.get(get_single_blog_api+$scope.blog_id)
           .success(function(data){

                 var comp_data  = JSON.stringify(data);
                 var obj        = JSON.parse(comp_data);
                 
            $scope.blog_cmplt_data = obj.data[0];

            //temp variable
            $scope.blogger_image         = $scope.blog.picture_path;

            $scope.blog_small_desc       = $scope.blog_cmplt_data.blog_small_des;
            $scope.blog_full_description = $scope.blog_cmplt_data.blog_full_description;
            $scope.blog_title            = $scope.blog_cmplt_data.blog_title;
            $scope.first_name            = $scope.blog_cmplt_data.first_name;
            $scope.last_name             = $scope.blog_cmplt_data.last_name;
            $scope.blog_creation_time    = $scope.blog_cmplt_data.blog_creation_time;
            $scope.blog_images_id        = $scope.blog_cmplt_data.blog_images_id;
            $scope.blog_like_count       = $scope.blog_cmplt_data.blog_like_count;
            $scope.blog_comment_count    = $scope.blog_cmplt_data.blog_comment_count;
            $scope.blog_category         = $scope.blog_cmplt_data.blog_category;
            $scope.blog_sub_cat_name     = $scope.blog_cmplt_data.blog_sub_cat_name;
            $scope.blog_image1           = $scope.blog_cmplt_data.blog_image1;

           })
           .error(function(err){
            console.log("Error : "+err);
           });

      
       function cancel(){
          console.log("Cancel Clicked");
           $mdDialog.cancel();
                 $("#first_div").fadeTo(200, 1);
       };

      


           

    };
    
    
    
    
    
})();