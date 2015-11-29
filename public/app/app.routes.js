angular.module('Routesdelappli',['ngAnimate', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider,$locationProvider) {

	$stateProvider

	// Route pour montrer le formulaire (/form)
		.state('connexion', {
			url: '/',
			templateUrl: '/app/vues/pages/page-accueil.html',
			controller: 'PrincipalController'
		})
		.state('inscription', {
		url: '/inscription',
		templateUrl: '/app/vues/pages/page-inscription.html',
		controller: 'InscriptionController'
	})
		.state('dashboardMoi', {
		url: '/dashboard/moi',
		templateUrl: '/app/vues/pages/page-dashboard.html',
		controller: 'DashBoardController', authenticate: true
	});
	// Si aucunes routes ne correspond
	// envoie l'user au formulaire
	$urlRouterProvider.otherwise('/');

// use the HTML5 History API
	$locationProvider.html5Mode(true);
});
