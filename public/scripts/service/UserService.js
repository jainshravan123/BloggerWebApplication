(function(){
    
    'use strict';
    
     angular.module("BloggerApp").service("userService", userService);
    
     function userService()
     {
       var user; 
       var user_id;     
         
       this.setCurrentUser = function(user){
           
           this.user = user; 
       };
         
       this.getCurrentUser = function(){
         
           return this.user;
       };
         
      this.setUserId = function(user_id){
        
          this.user_id = user_id
      };
         
      this.getUserId = function(){
          
          return this.user_id;
      };     
           
     };
    
})();