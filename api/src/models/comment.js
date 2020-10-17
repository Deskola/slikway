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
			type: String,
			required: true
		},
		post: {
			type: String,
			required: true
		},		
	},
	{
		timestamps: true
	}
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;