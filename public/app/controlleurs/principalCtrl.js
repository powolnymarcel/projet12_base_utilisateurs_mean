angular.module('principalCtrl',[])

//Le ctrl permet de manipuler les données et envoyer les données à la vue pour le rendu
.controller('PrincipalController',function($rootScope,$location,Authentification){
	var leCtrlFrontPrincipal = this;

	//avoir les infos au niveau front si l'user est connecté
	leCtrlFrontPrincipal.connecte= Authentification.estConnecte();
	//Dans toutes les requetes on veut verifier l'user
				//Si la route change(c'est un eventListener)
	$rootScope.$on('$routeChangeStart',function(){
		//Alors on veut assigner le leCtrlFrontPrincipal.connecte
		leCtrlFrontPrincipal.connecte=Authentification.estConnecte();

		Authentification.recupereUtilisateur()
			.then(function(data){
				leCtrlFrontPrincipal.utilisateur= data.data;
			});
	});

	leCtrlFrontPrincipal.

});
