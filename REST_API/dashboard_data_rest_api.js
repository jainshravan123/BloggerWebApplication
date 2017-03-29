var mysql = require("mysql");

function DASHBOARD_DATA_REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}


DASHBOARD_DATA_REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    
    //getting categories for dashboard of user
    router.get('/get_user_task', function(req, res){
        
        var query = "SELECT * FROM ??";
        var table = "user_task";
        query     = mysql.format(query, table);
        connection.query(query, function(err, rows){
            
            if(err){
                 res.json({"Error": true, "Message" : "Error Executing MySQL Query1"+err});
            }else{
                res.json({"Error": false, "Message" : "Success", "data" : rows});
            }
            
        });
    });
    
    //getting categories for dashboard of admin
    router.get('/get_admin_task', function(req, res){
        
        var query = "SELECT * FROM ??";
        var table = "admin_task";
        query     = mysql.format(query, table);
        connection.query(query, function(err, rows){
            
            if(err){
                 res.json({"Error": true, "Message" : "Error Executing MySQL Query1"+err});
            }else{
                res.json({"Error": false, "Message" : "Success", "data" : rows});
            }
            
        });
    });
    
}

module.exports = DASHBOARD_DATA_REST_ROUTER;
    