angular.module('principalCtrl',[])

//Le ctrl permet de manipuler les données et envoyer les données à la vue pour le rendu
.controller('PrincipalController',function ($scope,$rootScope, $location, Authentification) {
	var leCtrlFrontPrincipal = this;
	$scope.pageClass = 'page-accueil';
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
//****************************************************LOG IN
	//a chaque click sur le bouton submit du form "faireLeLogin()"
	leCtrlFrontPrincipal.faireLeLogin=function(){
		leCtrlFrontPrincipal.effectuer = true;
		leCtrlFrontPrincipal.error = '';

		//Voir le factory "authentificationFactory" et la methode connexion
		Authentification.connexion(leCtrlFrontPrincipal.donneesLogin.pseudo,leCtrlFrontPrincipal.donneesLogin.password)
			.success(function(data){
				leCtrlFrontPrincipal.effectuer=false;
				Authentification.recupereUtilisateur()
					.then(function(data){
						leCtrlFrontPrincipal.utilisateur=data.data
					});
				//Si le login s'est bien passé on redirgie vers la homepage
				if(data.success){
					$location.path('/fff');
				}else{
					leCtrlFrontPrincipal.error= data.message
				}
			})
	};
//****************************************************LOGOUT
	leCtrlFrontPrincipal.seDeconnecter=function(){
		//On se deconnecte , sur le serveur on activera "assignerToken" qui activera authentificationTokenFactory.assignerToken
		//Il y aura une condition si token ou si pas token
		Authentification.deconnexion();
		//On redirige
		$location.path('/deconnexion');
	}

	//Pas de return de l'objet ici car on appelle le ctrl dans la vue,
	//contrairement au factory qui son injectée dans les ctrl

});
