//Require mongoose lib
const mongoose = require('mongoose');

//Define the Job database schema
const commentSchema = new mongoose.Schema(
	{
		message:{
			type: String,
			required: true
		},		
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		post: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Post',
				required: true
			}	
		] 	
	},
	{
		timestamps: true
	}
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;