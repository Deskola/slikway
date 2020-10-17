//Require mongoose lib
const mongoose = require('mongoose');

//Define the Job database schema
const postSchema = new mongoose.Schema(
	{
		title:{
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		author: {
			type: String,
			required: true
		}		
	},
	{
		timestamps: true
	}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post