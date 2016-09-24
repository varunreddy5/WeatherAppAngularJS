//MODULE

var weatherApp=angular.module("weatherApp",['ngRoute','ngResource']);

//ROUTES
weatherApp.config(function($routeProvider){
    $routeProvider
    
    .when('/',{
        templateUrl:'pages/home.html',
        controller:'homeController'
    })
    .when('/forecast',{
        templateUrl:'pages/forecast.html',
        controller:'forecastController'
    })
    .when('/forecast/:days',{
        templateUrl:'pages/forecast.html',
        controller:'forecastController'
    })
});
//SERVICES
weatherApp.service('cityService',function(){
    this.city="Hyderabad";  
})

//CONTROLLERS
weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){
    $scope.city=cityService.city;
    $scope.$watch('city',function(){
        cityService.city=$scope.city;
    })
}]);

weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService',function($scope,$resource,$routeParams,cityService){
        $scope.city=cityService.city;
        $scope.days=$routeParams.days || '3';
    
    $scope.weatherAPI=$resource("//api.openweathermap.org/data/2.5/forecast/daily",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
    $scope.weatherResult=$scope.weatherAPI.get({q:$scope.city,cnt:$scope.days,appid:'19d90ce3a6357882c338cf49a76a6fec'});
    
    
    $scope.convertToCelsius=function(degreeK){
        return Math.round(degreeK-273.15);
    }
    
    $scope.convertDate=function(wdate){
        var date = new Date(wdate*1000);

        return date; // "Dec 20"
    }

}]);
//DIRECTIVES
weatherApp.directive('weatherReport',function(){
    return {
        templateUrl:'directives/weatherresults.html',
        replace:true,
        scope:{
            weatherObject:'=',
            convertToStandard:'&',
            convertToDate:'&'
        }
    }
})
