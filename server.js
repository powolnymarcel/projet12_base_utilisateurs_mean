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



var api = require('./app/routes/api')(app,express);
app.use('/api',api);




app.get('*',function(req,res){
	res.sendFile(__dirname + '/public/vues/index.html')
});

app.listen(config.port, function(err){
	if(err){
		console.log(err)
	}else{
		console.log('Ecoute sur le port 3000')
	}
});
