//var root_domain_uri = "http://firstnodeapp-bloggie.rhcloud.com/api";

var root_domain_uri   = "http://localhost:3000/api";



//blogs api
var get_all_blogs_api           	= root_domain_uri + "/blogs";
var get_single_blog_api         	= root_domain_uri + "/blogs/";
var get_blog_by_category_api    	= root_domain_uri + "/blogs_by_cat/";
var get_blogs_categories_api     	= root_domain_uri + "/blogs_categories";
var get_blog_sub_categories_api  	= root_domain_uri + "/blogs/sub_cat/";
var get_blog_likes_api           	= root_domain_uri + "/blogs/likes/";
var get_blog_comments_api        	= root_domain_uri + "/blogs/comments/"; 
var post_blog_like_api           	= root_domain_uri + "/blogs/like";
var post_blog_comment_api        	= root_domain_uri + "/blogs/comment";
var post_blog_short_desc_api     	= root_domain_uri + "/blog/short_desc";
var post_blog_full_desc_api      	= root_domain_uri + "/blog/full_desc";

//user api
var get_all_users_api            	= root_domain_uri + "/users";
var get_single_user_info_api     	= root_domain_uri + "/users/";
var get_user_address_api         	= root_domain_uri + "/users/address/";
var get_all_countries_api        	= root_domain_uri + "/country";
var get_state_by_country_api     	= root_domain_uri + "/state/";
var update_single_user_info_api  	= root_domain_uri + "/users";
var update_single_user_address_api  = root_domain_uri + "/users/address/";



//dashboard api
var get_user_tasks_api 				=  root_domain_uri + "/get_user_task";
var get_admin_tasks_api             =  root_domain_uri + "/get_admin_task";

//login api
var post_user_login_api               	= root_domain_uri + "/users/check_login";
var update_user_login_status_api 	=  root_domain_uri + "/users/login_status";

//SignUp api
var post_user_sign_up_api                = root_domain_uri + "/users";  

