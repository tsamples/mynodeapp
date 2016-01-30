var app = angular.module('myApp', [
  'ngRoute'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'MyCtrl'
      }).
      when('/stuff', {
      	templateUrl: 'partials/stuff.html',
      	controller: 'StuffCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);

app.controller('MyCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.helloString = 'Hello World!';

    $scope.pushButton = function() {
    	alert($scope.col1Text);
    }
  }]);

app.controller('StuffCtrl', ['$scope', '$http', 'myService', 'myFactory',
 
  function ($scope, $http, myService, myFactory) {
    $scope.helloString = myService.myFunction();
    $scope.factoryString = myFactory.title;
    myService.getColumns().success(function(data) {
    	$scope.columns = data;	
    });

    $scope.pushButton = function() {
    	alert($scope.col1Text);
    }
  }]);

app.service('myService', ['$http', function($http) {
	this.myFunction = function() {
		return 'This is cool';
	}
	this.getColumns = function() {
		return $http.get('http://titan.psclistens.com:3000/mynodeapp/hello')
	}
}]);

app.factory('myFactory', function() {
	var myObj = {};
	myObj.title = 'This is the title';
	return myObj;		
});

app.directive("myDirective", function() {
  return {
    scope: true,
    restrict: 'E',
    replace: 'true',
    link:function(scope, elem, attr) {
    	elem.css('color','red');
    	scope.helloString = attr.mystring;
    },
    templateUrl: 'partials/myDirective.html'
  };
});

app.directive("columnDirective", function() {
  return {
    scope: true,
    restrict: 'E',
    replace: 'true',
    link:function(scope, elem, attr) {
    	var header = attr.columnheader;
    	var paragraph = attr.columnparagraph;
    	scope.columnHeader = header;
    	scope.columnParagraph = paragraph;
    	var width = Math.floor(attr.colwidth);
    	scope.styleClass = 'col-sm-' + width;
    },
    templateUrl: 'partials/columnDirective.html'
  };
});