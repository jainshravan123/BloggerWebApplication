(function(){
    
    'use strict';
    
    angular
        .module('BloggerApp', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngProgress', 'ngAnimate', 'toaster'])
        .config(ui_router);
    
    ui_router.$inject = ['$stateProvider', '$urlRouterProvider'];
    
    
    function ui_router($stateProvider, $urlRouterProvider)
    {
      
        $urlRouterProvider.otherwise('/home');
        
        $stateProvider.state('home',{
                                      url : '/home',
                              templateUrl : './views/home.html'                            
        });
        
        $stateProvider.state('signin',{
                                        url : '/signin',
                                templateUrl : './views/signin.html'
        });
        
        $stateProvider.state('dashboard', {
                                         abstract : true,
                                              url : '/dashboard',
                                      templateUrl : './views/trial.html'      
        });
        
        $stateProvider.state('dashboard.dashboardInner', {
                                              url : '/dashboardInner',
                                      templateUrl : './views/DashboardInner.html'      
        });
        
        $stateProvider.state('dashboard.blogs', {
                                              url : '/blogs',
                                      templateUrl : './views/Blogs.html'      
        });
        
        $stateProvider.state('dashboard.posts', {
                                              url : '/posts',
                                      templateUrl : './views/Posts.html'      
        });
        
        $stateProvider.state('dashboard.connections', {
                                              url : '/connections',
                                      templateUrl : './views/Connections.html'      
        });
        
        $stateProvider.state('dashboard.messages', {
                                              url : '/messages',
                                      templateUrl : './views/Messages.html'      
        });
        
        $stateProvider.state('dashboard.profile', {
                                              url : '/profile',
                                      templateUrl : './views/Profile.html'      
        });
        
        $stateProvider.state('dashboard.trash', {
                                            url : '/trash',
                                    templateUrl : './views/Trash.html'
        });
        
        
        $stateProvider.state('dashboard.settings', {
                                                url : '/settings',
                                        templateUrl : './views/Settings.html'
        });
        
    }
    
   
    
    
    
})();