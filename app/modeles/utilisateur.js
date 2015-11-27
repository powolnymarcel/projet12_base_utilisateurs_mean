var mongoose = require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var Schema= mongoose.Schema;

var UtilisateursSchema= new Schema({
	nom:String,
	pseudo:{type:String,required:true,index:{unique:true}},
	password:{type:String,required:true,select:false}
});

//Hashage du password

UtilisateursSchema.pre('save',function(next){
	var utilisateur = this;
	if(!utilisateur.isModified('password')) return next();
	bcrypt.hash(utilisateur.password,null,null,function(err,hash){
		if(err)return next(err);
		utilisateur.password=hash;
		next();
	});
});

//Comparaison du password tapé dans le formulaire et dans la BDD
UtilisateursSchema.methods.comparerPassword=function(password){
	var utilisateur = this;
	return bcrypt.compareSync(password, utilisateur.password)
};




module.exports=mongoose.model('Utilisateur',UtilisateursSchema);
