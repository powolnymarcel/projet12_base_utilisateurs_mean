var Utilisateur = require('../modeles/utilisateur');
var Post = require('../modeles/post');

var config = require('../../config');

var cleSecrete=config.cleSecrete;

var jsonwebtoken= require('jsonwebtoken');
//fn pour créer le token, cette fn sera utilisée dans la vérification des infos login
function creerUnBeauToken(utilisateur){
	var token = jsonwebtoken.sign({
		id: utilisateur._id,
		nom:utilisateur.nom,
		pseudo:utilisateur.pseudo
	},cleSecrete,{
		expiresInMinute:1440
	});
return token;

};


module.exports= function(app, express){

	var dashboard=express.Router();
//***************************************************PHASE A, avant la connexion
	dashboard.post('/inscription',function(req,res){

		var utilisateur = new Utilisateur({
			//body est le bodyParser
			nom : req.body.nom,
			pseudo:req.body.pseudo,
			password:req.body.password
		});

		utilisateur.save(function(err){
			if(err){
				res.send(err);
				return;
			}
			res.json({message:'Utilisateur cree'});
		});
	});


dashboard.get('/utilisateurs',function(req,res){
	//find est une méthode de mongoose
	Utilisateur.find({},function(err,users){
		if(err){
			res.send(err);
			return
		}
		res.json(users);
	})
});


	dashboard.post('/connexion',function(req,res){
		//findOne trouvera un objet spécifique, findOne ira dans la bdd et cherchera si le user existe ou pas
		Utilisateur.findOne({
			pseudo: req.body.pseudo}).select('password').exec(function(err,utilisateur){
			if(err)throw err;
			//Si l'user n'existe pas on retourne un message
			if(!utilisateur){
				res.send({message :'Utilisateur n\'existe pas !'})
			}else if(utilisateur){
				//On va dans le modèle activer la fn pour comparer les password
				var passwordValide = utilisateur.comparerPassword(req.body.password);
				//Si password invalide
				if(!passwordValide){
					res.send({message :'Password invalide, eviter d\'etre précis sur ce type de réponse'})
				}
				else{
					//Si c'est correct on crée un jeton(token) (au lieu d'un cookie), on a besoin du module "jsonwebtoken"
					//le param utilisateur vient du param utilisateur de la ligne 60:76
					var token= creerUnBeauToken(utilisateur)
					res.json({
						success:true,
						message:"Connecté avec succes!",
						token:token
					});
				}
			}
		});
	});



	//Verification du token
dashboard.use(function(req,res,next){
	console.log('Quelqun sest connecte')
	var token= req.body.token || req.param('token') || req.headers['x-access-token'];
	// Verifier si le token existe
	if(token){
		jsonwebtoken.verify(token,cleSecrete,function(err,decoded){
			if(err){
				res.status(403).send({success:false, message:"Echec d'autentification"})
			}else{
				//
				req.decoded= decoded;
				next();
			}
		})
	}else{
		res.status(403).send({success:false,message:"Pas reçu de token"})
	}
});
//***************************************************PHASE B, après la connexion

	//routes multiple (chaining method)
	dashboard.route('/')
		.post(function(req,res){

			var post = new Post({
				//req.decoded.id car après avoir passé le middleware, les infos user se trouvent 100:17
				createur:req.decoded.id,
				contenu:req.body.contenu
			});
			post.save(function(err){
				if(err){
					res.send(err);
					return;
				}
				res.json({message:"Post crée"})
			})
		});


	return dashboard


};





















