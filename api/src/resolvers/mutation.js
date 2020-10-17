//import libs
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	AuthenticationError,
	ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');

//GraphQL mutation resolver for the schema
module.exports = {
	//Law model mutations
	newJob: async(parent, args, { models }) => {
		//if there is no user on the context, throw an auth error
		return await models.Job.create({
			title: args.title,
			description: args.description,			
			languages: args.languages,
			duration: args.duration,
			price: args.price,
			client: args.client
		});
	},
	deleteJob: async(parent, { id }, { models }) => {
		try{
			await models.Job.findOneAndRemove({ _id: id });
			return true;
		}catch (err){
			return false;
		}
	},
	updateJob: async(parent, {id, title, description, language, duration, price }, {models}) =>{
		return await models.Job.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: { 
					title,
					description,
					language,
					duration,
					price					
				}
			},					
			{
				new: true
			}
		);
	},

	//Post Model Mutation
	newPost: async(parent, args, { models }) => {
		return await models.Post.create({
			title: args.title,
			content: args.content,
			author: args.author			
		});
	},
	deletePost: async(parent, { id }, { models }) => {
		try{
			await models.Post.findOneAndRemove({ _id: id });
			return true;
		}catch (err){
			return false;
		}
	},
	updatePost: async(parent, {id, title, content }, {models}) =>{
		return await models.Post.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: { 
					title,
					content
				}
			},					
			{
				new: true
			}
		);
	},

	//Chart Model Mutation
	newChart: async(parent, args, { models }) => {
		return await models.Chart.create({
			message: args.message,
			attachment: args.attachment,
			author: args.author					
		});
	},
	deleteChart: async(parent, { id }, { models }) => {
		try{
			await models.Chart.findOneAndRemove({ _id: id });
			return true;
		}catch (err){
			return false;
		}
	},
	updateChart: async(parent, {id, message, attachment }, {models}) =>{
		return await models.Chart.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: { 
					message,
					attachment					
				}
			},					
			{
				new: true
			}
		);
	},

	//Comment Model Mutation
	newComment: async(parent, args, { models }) => {
		return await models.Comment.create({
			message: args.message,
			author: args.author,
			post: args.post					
		});
	},
	deleteComment: async(parent, { id }, { models }) => {
		try{
			await models.Comment.findOneAndRemove({ _id: id });
			return true;
		}catch (err){
			return false;
		}
	},
	updateComment: async(parent, {id, message }, {models}) =>{
		return await models.Comment.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: { 
					message										
				}
			},					
			{
				new: true
			}
		);
	},

	//SignUp mutation
	signUp: async(parent, { username, email, password, institution, phone_number }, {models}) =>{
		//normalize email address
		email = email.trim().toLowerCase();
		//hash the password
		const hashed = await bcrypt.hash(password, 10);
		//create a gravatar url
		const avatar = gravatar(email);
		try{
			const user = await models.User.create({
				username,
				email,
				avatar,
				password: hashed,
				institution,
				phone_number
			});

			//create and return the json web token
			return jwt.sign({ id: user._id}, process.env.JWT_SECRET);

		}catch(err){
			console.log(err)
			//throw err if account fails to be created
			throw new Error('Error creating accout');
		}
	},

	//SignIn mutation
	signIn: async(parent, { username, password }, {models}) =>{
		// if (email) {
		// 	//normalize email addr
		// 	email = email.trim().toLowerCase();
		// }

		const user = await models.User.findOne({
			username 
		});

		//if no user is foun, throw an authentication error
		if (!user) {
			throw new AuthenticationError('Error signing in');
		}

		//if the password don't match, throw an auth error
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new AuthenticationError('Error signing in');
		}

		//create and return the json web token
		return jwt.sign({ id: user._id}, process.env.JWT_SECRET);
	}

}