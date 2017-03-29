(function(){

  'use strict';

  angular.module("BloggerApp").service("BlogsService", BlogsService);

  function BlogsService(){

     var blog;

     this.setCurrentBlog = function(blog){
           this.blog = blog;
     };

     this.getCurrentBlog = function(){
            return this.blog;
     };
   
  };

})();