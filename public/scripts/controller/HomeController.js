(function(){
   
   angular
       .module('BloggerApp')
       .controller('HomeController', HomeController)
       .config(theme);

    HomeController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog', 'toaster', '$state', '$mdMedia', 'BlogsService'];
    theme.$inject           = ['$mdThemingProvider'];
    
    
   function HomeController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog, toaster, $state, $mdMedia, BlogsService, BlogsController)
   {
        var categories      = [];
        var blogs           = [];
        var bloggers        = []; 
        $scope.searchText   = "";
    
        blog_categories();
        get_all_blogs();
       
        $scope.blog_categories  = blog_categories;
        $scope.get_all_blogs    = get_all_blogs;
        $scope.selectCategory   = selectCategory; 
        $scope.open_template    = open_template;
        $scope.reloadPage       = reloadPage;
        $scope.blogDescription  = blogDescription;


        $scope.status = '  ';
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');



        //for tooltip of signin/signup button
        $scope.demo = {
                  showTooltip : false,
                  tooltipDirection : 'bottom'
               };
       
        function blog_categories()
        {
            
            $http.get(get_blogs_categories_api).success(function(data)
            {
                 var comp_data      = JSON.stringify(data);
                 var obj            = JSON.parse(comp_data);
                 $scope.categories  =  obj.data;
                 
                // console.log("Object : "+JSON.stringify(obj.data[1]));
            })
            .error(function(err){
                console.log(err);
            });
            
        };
       
       
       
        function selectCategory(category)
        {
            console.log("cat id"+category.blog_category_id); 
            $http.get(get_blog_by_category_api + category.blog_category_id).success(function(data)
            {
                 var comp_data  = JSON.stringify(data);
                 var obj        = JSON.parse(comp_data);
                
                 var num_rows = parseInt(obj.Num_Rows);
                 if(num_rows>0)
                 {
                   $scope.blogs   =  obj.data;      
                 }
                 else
                 {
                    /* $mdToast.show({
                          hideDelay   : 3000,
                          position    : 'top right',
                          controller  : 'ToastController',
                          templateUrl : 'toast-template.html'
                        });
                     */
                     toaster.pop({
                                    type: 'error',
                                    title: 'Error',
                                    body: 'Data is not available',
                                    showCloseButton: true,
                                    closeHtml: '<button>Close</button>'
                                });
                     
                 console.log("No data Found in "+category.blog_category_id);    
                 }
                 
                     
                 
            })
            .error(function(err){
                console.log(err);
            });
         
        };
       
       
        function get_all_blogs()
        {
            $http.get(get_all_blogs_api).success(function(data)
            {
                 var comp_data      = JSON.stringify(data);
                 var obj            = JSON.parse(comp_data);
                 $scope.blogs       =  obj.data;  
                 $scope.blog_rel_data  = JSON.stringify($scope.blogs);
                //console.log("Blogs Data : "+$scope.blog_rel_data);
                  for(var i=0; i<obj.data.length; i++)
                  {
                     //console.log("Blog_Title : "+obj.data[i].blog_title);
                      get_user_info(obj.data[i].blogger_id);
                     
                  }
                  
            })
            .error(function(err){
                console.log(err);
            });
        };
       
       
       
        function get_user_info(user_id)
        {
            $http.get(get_single_user_info_api+user_id).success(function(data)
            {
                console.log("Users data : "+JSON.stringify(data));
                var comp_data = JSON.stringify(data);
                var obj       = JSON.parse(comp_data);
                bloggers.push(data);
                 
            })
            .error(function(err){
                console.log(err);
            });
        };
       
        
        function open_template(ev)
        {
            console.log("Inside Open Template Function");
            $(document).ready(function(){
            console.log("Now Document is Ready !!!");        
            
                
                    $("#first_div").fadeTo(0.2, 0.1, function(){
                        
                        $mdDialog.show({ 
                                          controller: 'ToastController',
                                          templateUrl: 'signin--signup-template.html',
                                          clickOutsideToClose:false, 
                                          targetEvent: ev
                                        })
                                        .then(function(answer) {
                                               $scope.alert = 'You said the information was "' + answer + '".';
                                              }, function() {
                                                    $scope.alert = 'You cancelled the dialog.';
                                       });
                        
                    });
                });
            //$location.path('/signin');
        };
       
     
       function blogDescription(blog, ev){
     
         //alert("Blogger Name : "+blog.first_name);

         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        // BlogsService.setCurrentBlog(blog);
        // $rootScope.$broadcast('getBlogCompleteData');
        
        localStorage.setItem("temp_blog", JSON.stringify(blog));

         $mdDialog.show({
                          templateUrl         : 'dialog.blog.description.html',
                          parent              : angular.element(document.body),
                          targetEvent         : ev,
                          clickOutsideToClose : true,
                          fullscreen          : useFullScreen,
                          home_scope          : $scope,
                          preserveScope       : true,
                          controller          : BlogsController
                        })
                        .then(function(answer) {
                          $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                          $scope.status = 'You cancelled the dialog.';
                        });
     
        $scope.$watch(function() {
                        return $mdMedia('xs') || $mdMedia('sm');
                                  }, function(wantsFullScreen) {
                        $scope.customFullscreen = (wantsFullScreen === true);
                                  });               

       };


      function reloadPage()
      {
        location.reload();
      };
        
   }
    
    function theme($mdThemingProvider)
    {
        $mdThemingProvider.theme('default')
         .primaryPalette('brown')
         .accentPalette('red');
    };
     
})();