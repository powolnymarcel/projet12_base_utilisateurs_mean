//va appeller toutes les API d'authentification dans routes.js
//Angular va appeller toutes les  valeurs json du serveur et les render sur la vue
//Le service va cherchers les data et les passe au controlleur, le Ctrl fera la logique, le ctrl passera le tout à la route et la route appelera la vue . C'est la modele MVC...


angular.module('serviceAuthentification',[])

//une des méthodes les plus pratique pour appeller les methodes d'API c'est d'utiliser une factory
//$q est la promesse
.factory('Authentification',function($http,$q,AuthentificationJetonToken,$location){

	//Toutes les routes d'API qui seront appellées avec http seront placees dans cette variable
	var authentificationFactory= {};

	//Va faire un post sur la route "/dashboard/connexion" sur le serveur et récup les données
	authentificationFactory.connexion=function(pseudo,password){
		return $http.post('/dashboard/connexion',{
			pseudo:pseudo,
			password:password
		})
			//Rappel: Si c'est un succes on aura aussi un token
			.success(function(data){
				AuthentificationJetonToken.assignerToken(data.token);
				return data;
			})
	};


	authentificationFactory.deconnexion=function(){
		//fera un clear du token
		AuthentificationJetonToken.assignerToken();
	};

	//A chaque requete http on veut checker si l'user à son token
	authentificationFactory.estConnecte=function(){
		if(AuthentificationJetonToken.recupererToken()){
			return true;
		}else{
			return false;
		}
	};

	//Recuperer toutes les infos utilisateur
	authentificationFactory.recupereUtilisateur=function(){
		if(AuthentificationJetonToken.recupererToken()){
			//return $http.get('/dashboard/moi')
			$location.path('/dashboard/moi');
		}else{
			return $q.reject({message : "Utilisateur sans token"})
		}
	};

	return authentificationFactory;
})

//Ce service recuperera le token via la navigateur, on lui donne en parametre l'objet window
.factory('AuthentificationJetonToken',function($window){

	var authentificationTokenFactory={};
	//Methode pour recup le token via le navigateur
	authentificationTokenFactory.recupererToken=function(){
		return $window.localStorage.getItem(('token'))
	};

	//Methode pour assigner le token dans le localStorage

	authentificationTokenFactory.assignerToken=function(token){
		if(token){
			$window.localStorage.setItem('token',token)
		}else{
			$window.localStorage.removeItem('token');
		}
	};
	return authentificationTokenFactory
})

	//Ce service va verifier toutes les requetes http pouru voir si le token est valide
.factory('IntercepteurAuthentification',function($q,$location,AuthentificationJetonToken){
		var intercepteurFactory={};

	intercepteurFactory.request=function(config){
		//verifie si il y a un token, si il existe...
		var token = AuthentificationJetonToken.recupererToken();
		//Si il y a un token on le mets dans les headers
		if(token){
			config.headers['x-access-token'] = token;
		}
		return config;
	};
		//Si un code 403 (forbidden) apparait on redirige vers login
	intercepteurFactory.responseError=function(response) {
		if (response.status == 403) {
			$location.path('/login')
		} else {
			return $q.reject(response);
		}
	}

	return intercepteurFactory


});






























