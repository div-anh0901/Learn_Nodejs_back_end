const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
        title : {
            type :String
        },
	description : {
		type: String
	},
	url : {
		type:String
	},
	status : {
		type:String,
		enum : ['TO LEARN' , 'LEARNING', 'LERANED']
	},
	user:{
		type:Schema.Types.ObjectId,
		ref : 'users'
	}
});

module.exports = mongoose.model('posts', PostSchema);

