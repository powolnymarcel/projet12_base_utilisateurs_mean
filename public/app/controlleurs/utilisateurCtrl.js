angular.module('utilisateurCtrl',['utilisateurService'])

.controller('UtilisateurControlleur',function($scope,Utilisateur){
	$scope.pageClass = 'page-contact';

	var UtilisateurControlleur = this;


	Utilisateur.tousLesUtilisateurs()
		.success(function(data){
			UtilisateurControlleur.utilisateurs = data;
		})


})
	.controller('UtilisateurCreationControlleur',function(Utilisateur,$location,$window){

		var UtilisateurCreationControlleur = this;


		UtilisateurCreationControlleur.faireInscription= function () {
			UtilisateurCreationControlleur.message='';
			Utilisateur.creer(UtilisateurCreationControlleur.donneesUtilisateur)
				.then(function(response){
					UtilisateurCreationControlleur.donneesUtilisateur={};
					UtilisateurCreationControlleur.message=response.data.message;

					$window.localStorage.setItem('token',response.data.token);
					$location.path('/')
				})
		}










	})
