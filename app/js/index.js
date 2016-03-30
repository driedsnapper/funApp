'use strict';
/* Controllers */

var funApp = angular.module('funApp', ['ngRoute']);

funApp.config(['$routeProvider', '$locationProvider', function($routeProvide, $locationProvider){
    $locationProvider.html5Mode(true);

    $routeProvide
        .when('/', {
            templateUrl: 'template/packs.html',
            controller: 'PacksCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

//Packs Controller
funApp.controller('PacksCtrl', ['$scope', '$http', '$location', 'Connector', function($scope, $http, $location, Connector) {

    var source = 'packs/packs.json';

    $scope.selected = {};
    $scope.select = function(index) {
        $scope.selected[index] = !$scope.selected[index];
    };

    Connector.getPosts(source)
        .success(function(data) {
            $scope.packs = data;
        })
        .error(function() {});

    $scope.mice = function(pack){
        var ceil =  Math.ceil(pack.weight);
        return ceil>1 ? ceil>4 ? ceil + ' мышей':ceil + ' мыши'  : 'мышь';
    }

}]);

//Factory
funApp.factory('Connector', function($http) {
    return{
        getPosts : function(source) {
            return $http.get(source, { headers: { 'Cache-Control' : 'no-cache' } });
        },
    }
});

