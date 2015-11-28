var mongoose = require('mongoose');

var Schema= mongoose.Schema;

var PostSchema= new Schema({
	createur:{ type: Schema.Types.ObjectId,ref:'Utilisateur'},
	contenu: String,
	cree:{type:Date, default:Date.now}
});



module.exports=mongoose.model('Post',PostSchema);
