(function(){
   
   angular
       .module('BloggerApp')
       .controller('SigninDialogController', SigninDialogController)
       .config(theme);
       

    SigninDialogController.$inject  = ['$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', '$http', '$location', '$mdToast', '$mdDialog', 'userService', '$state', 'ngProgressFactory'];
    theme.$inject           = ['$mdThemingProvider'];
   
    
   function SigninDialogController($mdSidenav, $mdBottomSheet, $scope, $rootScope, $http, $location, $mdToast, $mdDialog, userService, $state, ngProgressFactory)
   {
       console.log("Inside Signin Controller");
      
       userService.setCurrentUser(1);
       console.log("CurrentUser value : "+userService.getCurrentUser());
       
        $scope.cancelDialogBox    = cancelDialogBox;
        $scope.signin             = signin;
        $scope.signup             = signup;
        $scope.signinWithGmail    = signinWithGmail;
        $scope.signinWithfacebook = signinWithfacebook;
        
       function cancelDialogBox()
       {
           console.log("Cancel Button");
            $(document).ready(function(){
                
                 $mdDialog.cancel();
                 $("#first_div").fadeTo(200, 1);
            });
            
       };
       
       //recognize whether esc button pressed or not
       $(document).on('keyup',function(evt) {
            if (evt.keyCode == 27) {
                $mdDialog.cancel();
                 $("#first_div").fadeTo(200, 1);
            }
        }); 


       function signin(user)
       {
             console.log("_________________________SignIn Button_________________________");  
             console.log("Username : "+user.username);
             console.log("Password : "+user.password);   
             console.log("________________________________________________________________");
            
           var data = {
                username      : user.username,
                password      : user.password
            };
           
            var config = {
                body : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
           
            //$scope.progressbar = ngProgressFactory.createInstance();
            // $scope.progressbar.setParent(angular.element('div'));
            //var element = $scope.progressbar.getDomElement();
            //console.log("Progress Bar Element : "+element);
            //$scope.progressbar.start();  
           
            $http.post(post_user_login_api, data, config)
            .success(function (data, status, headers, config) {
                
              //setTimeout(function(){  }, 6000);    
              // $scope.progressbar.complete();   
               var comp_data = JSON.stringify(data);
               var obj       = JSON.parse(comp_data);
               
               if(obj.result == 1){
                    $(document).ready(function(){
                           $("#invalid_credentials").hide();
                           $mdDialog.cancel();
                           $("#first_div").fadeTo(200, 1);
                    });
                    localStorage.removeItem("user_id");
                    //set user_id for further usage
                   localStorage.setItem("user_id", obj.Users[0].user_info_id);
                   //$location.path('/dashboard');
                   $state.go('dashboard.dashboardInner');
               }else{
                   
                   $(document).ready(function(){
                            $("#invalid_credentials").show();
                    });
               }    
                
               console.log('User signin Response'+ JSON.stringify(data));
               
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
           
           
          /* $(document).ready(function(){
                   $("#invalid_credentials").show();
            });
          */ 
        
       };
       
       
       
       function signup(user)
       {
           //$scope.firstname = "sharvan";
           console.log("_________________________SignUp Button_________________________");
           console.log("FirstName : "+user.firstname);
           console.log("LastName  : "+user.lastname);
           console.log("DOB       : "+user.dob);
           console.log("Gender    : "+user.gender);
           console.log("Username  : "+user.username);
           console.log("Password  : "+user.password);
           console.log("________________________________________________________________");
           
           var data1 = {
                country_id    : 1,
                state_id      : 1,
                city          : '0',
                area1         : '0',
                area2         : '0',
                pincode       : 0,
                first_name    : user.firstname,
                last_name     : user.lastname,
                dob           : user.dob,
                email         : user.username,
                gender        : user.gender,
                picture_path  : '../images/avatar-1.svg',
                user_status   : 0,
                username      : user.username,
                password      : user.password,
                login_status  : 0,
                contact_number: 0
            };
           
           var config = {
                body : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
           
           var transform = function(data){
                                    return data1;
                                }
           
           $http.post(post_user_sign_up_api, data1, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
               console.log('User Submition Response'+ JSON.stringify(data));
               
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
              
           
           
       };
       
       
       function signinWithGmail()
       {
           console.log("SignIn With Gmail"); 
       };
       
       function signinWithfacebook()
       {
           console.log("SignIn With Facebook"); 
       };
       
       
   }
    
    
     function theme($mdThemingProvider)
     {
        $mdThemingProvider.theme('default')
         .primaryPalette('brown')
         .accentPalette('red');
     };
    
})();