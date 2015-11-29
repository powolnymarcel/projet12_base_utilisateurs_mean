angular.module('dashBoardCtrl',[])

//Le ctrl permet de manipuler les données et envoyer les données à la vue pour le rendu
.controller('DashBoardController',function ($scope,$rootScope) {
	$scope.pageClass = 'page-dashboard';

});
