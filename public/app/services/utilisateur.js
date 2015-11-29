angular.module('utilisateurService',[])

.factory('Utilisateur',function($http){
	var utilisateurFactory={};


//ON va chercher sur le dashboard(nodejs)
	utilisateurFactory.creer= function(donneesUtilisateur){
		return $http.post('/dashboard/inscription',donneesUtilisateur)
	}


	utilisateurFactory.tousLesUtilisateurs = function(){
		return $http.get('/dashboard/utilisateurs');
	}


	return utilisateurFactory;
});
