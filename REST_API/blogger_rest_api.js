var mysql = require("mysql");

function BLOGGER_REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}


BLOGGER_REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    
    
   //Getting all blogs basic information 
    router.get("/blogs", function(req, res){
        
        var query = "SELECT b1.blog_id, b1.blog_category_id, b1.blog_sub_cat_id, b1.blog_title, b1.blog_small_des, b1.blogger_id, b1.blog_creation_time, b1.blog_images_id, b1.blog_like_count, b1.blog_comment_count, b2.first_name, b2.last_name, b2.picture_path, b3.blog_category, b4.blog_image1 FROM blog_info_table b1 INNER JOIN user_info b2 ON b1.blogger_id = b2.user_id INNER JOIN blog_category b3 ON b1.blog_category_id = b3.blog_category_id INNER JOIN blog_images b4 ON b1.blog_images_id = b4.blog_images_id";
        
        connection.query(query, function(err, rows){
            
            if(err){
                   res.json({"Error" : true, "Message" : "Error Executing MySQL Query "+err});
            }else{
                   res.json({"Error" : false, "Message" : "Success",  "Num_Rows" : rows.length, "data" : rows});
            }});
        });
    
    
    //Getting full details of blog on the basis of blog_id
    router.get("/blogs/:id", function(req, res){
        
        var query = "SELECT b1.blog_id, b2.blog_small_des, b1.blog_full_description, b2.blog_title, b5.first_name, b5.last_name, b2.blog_creation_time, b2.blog_images_id, b2.blog_like_count, b2.blog_comment_count, b3.blog_category,b4.blog_sub_cat_name, b6.blog_image1 FROM blog_content b1, blog_info_table b2, blog_category b3, blog_subcategory b4, user_info b5, blog_images b6 WHERE ?? = ?? AND ?? = ?? AND ?? = ?? AND ?? = ?? AND ?? = ? AND ??=??";
        var table = ["b1.blog_id", "b2.blog_id", "b2.blog_category_id", "b3.blog_category_id", "b2.blog_sub_cat_id", "b4.blog_sub_cat_id", "b2.blogger_id", "b5.user_id", "b2.blog_id", req.params.id, "b2.blog_images_id","b6.blog_images_id"];
        query     = mysql.format(query, table);
        connection.query(query, function(err, rows){
            
            if(err){
                res.json({"Error" : true, "Message" : "Erorr Executing MySQL Query "+err});
            }else{
                res.json({"Error" : false, "Message" : "Success",  "Num_Rows" : rows.length, "data" : rows});
          }});
    });
    
    
    
    //Getting all blogs sorted by category
    router.get("/blogs_by_cat/:cat_id", function(req, res){
        
        var query = "SELECT b1.blog_id, b1.blog_category_id, b1.blog_sub_cat_id, b1.blog_title, b1.blog_small_des, b1.blogger_id, b1.blog_creation_time, b1.blog_images_id, b1.blog_like_count, b1.blog_comment_count, b2.first_name, b2.last_name, b2.picture_path, b3.blog_category, b4.blog_image1 FROM blog_info_table b1 INNER JOIN user_info b2 ON b1.blogger_id = b2.user_id INNER JOIN blog_category b3 ON b1.blog_category_id = b3.blog_category_id INNER JOIN blog_images b4 ON b1.blog_images_id = b4.blog_images_id WHERE b1.blog_category_id=?";
        var table = [req.params.cat_id];
        query = mysql.format(query, table);
        connection.query(query, function(err, rows){
            
            if(err){
                   res.json({"Error" : true, "Message" : "Error Executing MySQL Query "+err});
            }else{
                   res.json({"Error" : false, "Message" : "Success", "Num_Rows" : rows.length, "data" : rows});
            }});
        });
    
    //Getting all categories    
   router.get("/blogs_categories", function(req, res){
       
       var query = "SELECT * from ??";
       var table = ["blog_category"];
       query     = mysql.format(query, table);
       connection.query(query, function(err,  rows){
           
           if(err){ 
               res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
           }else{
               res.json({"Error" : false, "Message" : "Success !", "data" : rows});
           }});
   });  
    
    
     
    //Getting sub category on basis of category
    router.get("/blogs/sub_cat/:cat_id", function(req, res){
       
       var query = "SELECT * from ?? WHERE ?? = ?";
       var table = ["blog_subcategory", "blog_cat_id", req.params.cat_id];
       query     = mysql.format(query, table);
       connection.query(query, function(err,  rows){
           
           if(err){ 
               res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
           }else{
               res.json({"Error" : false, "Message" : "Success !", "Num_Rows" : rows.length, "data" : rows});
           }});
   });
    
    
    
    
    //Getting number of likes on the basis of blog_id
    router.get("/blogs/likes/:blog_id", function(req, res){
       
       var query = "SELECT COUNT(*) from ?? WHERE ?? = ?";
       var table = ["blog_liked", "blog_id", req.params.blog_id];
       query     = mysql.format(query, table);
       connection.query(query, function(err,  rows){
           
           if(err){ 
               res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
           }else{
               res.json({"Error" : false, "Message" : "Success !", "Num_Rows" : rows.length, "Num_Comments": rows.length, "data" : rows});
           }});
   });
    
    
    //Getting all of the comments for a specific blog on the basis of blog_id
    router.get("/blogs/comments/:blog_id", function(req, res){
       
       var query = "SELECT b1.blog_comment_id, b1.blog_comment, b1.blog_id, b1.user_id, b2.first_name, b2.last_name FROM blog_comment b1, user_info b2 WHERE  ?? = ? AND ?? = ?? ";
       var table = ["b1.blog_id", req.params.blog_id, "b1.user_id", "b2.user_id"];
       query     = mysql.format(query, table);
       connection.query(query, function(err,  rows){
           
           if(err){ 
               res.json({"Error" : true, "Message" : "Error executing MySQL query"+err});
           }else{
               res.json({"Error" : false, "Message" : "Success !", "Num_Rows" : rows.length, "data" : rows});
           }});
   });
   
  
   //posting the like for a blog
   router.post("/blogs/like", function(req, res){
       
       var query = "INSERT INTO ??(??, ??) values(?, ?)";
       var table = ["blog_liked", "blog_id", "user_id", req.body.blog_id, req.body.user_id];
       query     = mysql.format(query, table);
       connection.query(query, function(err, rows){
           
           if(err){
               res.json({"Error": true, "Message" : "Error Executing MySQL Query1"+err});
           }else{
               
                   var query2 = "SELECT * from ?? WHERE ?? = ?";
                   var table2 = ["blog_liked", "blog_id", req.body.blog_id];
                   query2     = mysql.format(query2, table2);
                   connection.query(query2, function(err2,  rows2){
                   console.log("Like Count : "+rows2.length);
                       if(err2){ 
                           res.json({"Error" : true, "Message" : "Error executing MySQL query2"+err2});
                       }else{
                           
                              var query3 = "UPDATE ?? SET ?? = ? WHERE ?? = ?"; 
                              var table3 = ["blog_info_table", "blog_like_count", rows2.length, "blog_id", req.body.blog_id];
                              query3     = mysql.format(query3, table3);
                              connection.query(query3, function(err3, rows3){
                                  
                                  if(err3){
                                      res.json({"Error" : true, "Message" : "Error executing MySQL query3"+err3});
                                  }else{
                                      res.json({"Error" : false, "Message" : "Success !", "data" : rows3});
                                  }});
                       }});    
            }}); 
   }); 
    
    
   //Posting comment for a blog
   router.post("/blogs/comment", function(req, res){
       
       var query = "INSERT INTO ??(??, ??, ??) values(?, ?, ?)";
       var table = ["blog_comment", "blog_comment", "blog_id", "user_id", req.body.comment, req.body.blog_id, req.body.user_id];
       query     = mysql.format(query, table);
       connection.query(query, function(err, rows){
           
           if(err){
               res.json({"Error": true, "Message" : "Error Executing MySQL Query1"+err});
           }else{
               
                   var query2 = "SELECT * from ?? WHERE ?? = ?";
                   var table2 = ["blog_comment", "blog_id", req.body.blog_id];
                   query2     = mysql.format(query2, table2);
                   connection.query(query2, function(err2,  rows2){
                   console.log("Like Count : "+rows2.length);
                       if(err2){ 
                           res.json({"Error" : true, "Message" : "Error executing MySQL query2"+err2});
                       }else{
                           
                              var query3 = "UPDATE ?? SET ?? = ? WHERE ?? = ?"; 
                              var table3 = ["blog_info_table", "blog_comment_count", rows2.length, "blog_id", req.body.blog_id];
                              query3     = mysql.format(query3, table3);
                              connection.query(query3, function(err3, rows3){
                                  
                                  if(err3){
                                      res.json({"Error" : true, "Message" : "Error executing MySQL query3"+err3});
                                  }else{
                                      res.json({"Error" : false, "Message" : "Success !", "data" : rows3});
                                  }});
                       }});    
            }}); 
   });  
    
    
  //Posting Blog Short Description
  router.post("/blog/short_desc", function(req, res){
      
      var query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??) values(?, ?, ?, ?, ?, ?, ?, ?)";
      var table = ["blog_info_table", "blog_category_id", "blog_sub_cat_id", "blog_title", "blog_small_des", "blogger_id", "blog_images_id", "blog_like_count", "blog_comment_count", req.body.blog_category_id, req.body.blog_sub_cat_id, req.body.blog_title, req.body.blog_small_des, req.body.blogger_id, req.body.blog_images_id, req.body.blog_like_count, req.body.blog_comment_count];
      query     = mysql.format(query, table);
      connection.query(query, function(err, rows){
          
          if(err){
               res.json({"Error": true, "Message" : "Error Executing MySQL Query1"+err});
          }else{
              res.json({"Error": false, "Message" : "Success", "data" : rows});
          }});
   });  
    
    
  //Posting Complete Blog Data    
  router.post("/blog/full_desc", function(req, res){
      
      var query = "INSERT INTO ??(??,??) values(?,?)";
      var table = ["blog_content", "blog_id", "blog_full_description", req.body.blog_id, req.body.blog_full_description];
      query     = mysql.format(query, table);
      connection.query(query, function(err, rows){
         
          if(err){
              res.json({"Error": true, "Message" : "Error Executing MySQL Query1"+err});
          }else{
               res.json({"Error": false, "Message" : "Success", "data" : rows});
          }
          
      });
  });   

  router.get('/blog/search/:text', function(req, res){

        //var query = "SELECT * FROM ?? WHERE ";

  }); 
    
    
}

module.exports = BLOGGER_REST_ROUTER;