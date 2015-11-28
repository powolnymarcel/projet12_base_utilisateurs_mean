var express = require('express');
var bodyParser = require('body-parser');
//morgan fait un log dans le cli
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');

var app = express();
//Connexion à la base de données
mongoose.connect(config.database,function(err){
	if(err){
		console.log(err)
	}else{
		console.log('Connecté à la base de données')
	}
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
//Permet un render de tous les fichiers,dossier css/js dans le dossier public
app.use(express.static(__dirname+'/public'));

var dashboard = require('./app/routes/dashboard')(app,express);
app.use('/dashboard',dashboard);




app.get('*',function(req,res){
	res.sendFile(__dirname + '/public/app/vues/index.html')
});

app.listen(config.port, function(err){
	if(err){
		console.log(err)
	}else{
		console.log('Ecoute sur le port 3000')
	}
});
