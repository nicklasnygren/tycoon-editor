'use strict';

angular.module('techtreeBuilderApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
