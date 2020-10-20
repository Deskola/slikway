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
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		favoriteCount: {
			type: Number,
			default: 0
		},
		favoritedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}		
		]
	},
	{
		timestamps: true
	}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post