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
	//Job model mutations
	newJob: async(parent, args, { models, user }) => {
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}
		return await models.Job.create({
			title: args.title,
			description: args.description,			
			languages: args.languages,
			duration: args.duration,
			price: args.price,
			client: mongoose.Types.ObjectId(user.id)
		});
	},
	deleteJob: async(parent, { id }, { models, user }) => {
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		//find the note
		const job = await models.Job.findById(id);
		//if the job owner and current user don't match throw forbidden error
		if (job && String(job.client) !== user.id) {
			throw new ForbiddenError("You don't have permission to delete the job");
		}
		try{
			//if everything checkes out remove the note
			await job.remove();
			return true;
		}catch (err){
			return false;
		}
	},
	updateJob: async(parent, {id, title, description, language, duration, price }, {models, user}) =>{
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		//find the note
		const job = await models.Job.findById(id);
		//if the job owner and current user don't match throw forbidden error
		if (job && String(job.client) !== user.id) {
			throw new ForbiddenError("You don't have permission to delete the job");
		}

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
	newPost: async(parent, args, { models, user }) => {
		return await models.Post.create({
			title: args.title,
			content: args.content,
			author: mongoose.Types.ObjectId(user.id)		
		});
	},
	deletePost: async(parent, { id }, { models, user }) => {
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		//find the note
		const post = await models.Post.findById(id);
		//if the job owner and current user don't match throw forbidden error
		if (post && String(post.author) !== user.id) {
			throw new ForbiddenError("You don't have permission to delete the job");
		}

		try{
			await post.remove();
			return true;
		}catch (err){
			return false;
		}
	},
	updatePost: async(parent, {id, title, content }, {models, user }) =>{
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		//find the note
		const post = await models.Post.findById(id);
		//if the job owner and current user don't match throw forbidden error
		if (post && String(post.author) !== user.id) {
			throw new ForbiddenError("You don't have permission to delete the job");
		}

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
	newChart: async(parent, args, { models, user }) => {
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		return await models.Chart.create({
			message: args.message,
			attachment: args.attachment,
			author: args.author,
			job: args.job					
		});
	},
	deleteChart: async(parent, { id }, { models, user }) => {
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		//find the note
		const chart = await models.Chart.findById(id);
		//if the job owner and current user don't match throw forbidden error
		if (chart && String(chart.author) !== user.id) {
			throw new ForbiddenError("You don't have permission to delete the job");
		}

		try{
			await chart.remove();
			return true;
		}catch (err){
			return false;
		}
	},
	updateChart: async(parent, {id, message, attachment }, {models, user}) =>{
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		//find the note
		const chart = await models.Chart.findById(id);
		//if the job owner and current user don't match throw forbidden error
		if (chart && String(chart.author) !== user.id) {
			throw new ForbiddenError("You don't have permission to delete the job");
		}

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
	newComment: async(parent, args, { models, user }) => {
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}
		
		return await models.Comment.create({
			message: args.message,
			author: mongoose.Types.ObjectId(user.id),
			post: mongoose.Types.ObjectId(args.id)					
		});
	},
	deleteComment: async(parent, { id }, { models }) => {
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		//find the note
		const comment = await models.Comment.findById(id);
		//if the job owner and current user don't match throw forbidden error
		if (comment && String(comment.author) !== user.id) {
			throw new ForbiddenError("You don't have permission to delete the job");
		}

		try{
			await comment.remove();
			return true;
		}catch (err){
			return false;
		}
	},
	updateComment: async(parent, {id, message }, {models}) =>{
		//if there is no user on the context, throw an auth error
		if (!user) {
			throw new AuthenticationError('You must be signed in to post a job');
		}

		//find the note
		const comment = await models.Comment.findById(id);
		//if the job owner and current user don't match throw forbidden error
		if (comment && String(comment.author) !== user.id) {
			throw new ForbiddenError("You don't have permission to delete the job");
		}

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
	signUp: async(parent, {username,email,password,institution,phone_number,course,course_year,programming_proficiency,github,potfolio,samble_projects,references}, {models}) =>{
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
				phone_number,
				course,
				course_year,
				programming_proficiency,
				github,
				potfolio,
				samble_projects,
				references
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
	},

	toggleFavorite: async(parent, { id }, { models, user }) => {
		//if no user is foun, throw an authentication error
		if (!user) {
			throw new AuthenticationError('Error signing in');
		}

		//check to see if the user has already favorited the post
		let postCheck = await models.Post.findById(id);
		const hasUser = postCheck.favoritedBy.indexOf(user.id);

		//if the user exists in the list
		//pull them from the list and reduce the favoriedCount by 1
		if (hasUser >= 0) {
			return await models.Post.findByIdAndUpdate(
				id,
				{
					$pull:{
						favoritedBy: mongoose.Types.ObjectId(user.id)
					},
					$inc:{
						favoriteCount: -1
					}
				},
				{
					//set new to tru to return the update doc
					new: true
				}
			);
		} else {
			//if the user doesn't exist in the list
			//add them to the list and inc the favoriteCount
			return await models.Post.findByIdAndUpdate(
				id,
				{
					$push:{
						favoritedBy: mongoose.Types.ObjectId(user.id)
					},
					$inc:{
						favoriteCount: 1
					}
				},
				{
					//set new to tru to return the update doc
					new: true
				}
			);
		}
	},
	//Application for Jobs interested in 
	interestedDevProjects: async(parent, { id }, { models, user }) => {
		//if no user is foun, throw an authentication error
		if (!user) {
			throw new AuthenticationError('Error signing in');
		}

		//check to see if the user has already favorited the post
		let jobCheck = await models.Job.findById(id);
		const hasUser = jobCheck.devs.indexOf(user.id);

		//if the user exists in the list
		//pull them from the list and reduce the favoriedCount by 1
		if (hasUser >= 0) {
			return await models.Job.findByIdAndUpdate(
				id,
				{
					$pull:{
						devs: mongoose.Types.ObjectId(user.id)
					},
					$inc:{
						devCount: -1
					}
				},
				{
					//set new to tru to return the update doc
					new: true
				}
			);
		} else {
			//if the user doesn't exist in the list
			//add them to the list and inc the favoriteCount
			return await models.Job.findByIdAndUpdate(
				id,
				{
					$push:{
						devs: mongoose.Types.ObjectId(user.id)
					},
					$inc:{
						devCount: 1
					}
				},
				{
					//set new to tru to return the update doc
					new: true
				}
			);
		}
	},

}