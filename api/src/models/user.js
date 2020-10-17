//Require mongoose lib
const mongoose = require('mongoose');

//Define the Job database schema
const userSchema = new mongoose.Schema(
	{
		username:{
			type: String,
			required: true,
			index: { unique: true }
		},		
		email: {
			type: String,
			required: true,
			index: { unique: true }
		},
		password: {
			type: String,
			required: true
		},
		phone_number: {
			type: String,
			required: true
		},
		institution: {
			type: String,
			required: true
		},
		course: {
			type: String,			
		},
		course_year: {
			type: String,			
		},
		programming_proficiency: {
			type: String,			
		},
		github: {
			type: String,
		},
		potfolio: {
			type: String,
			
		},
		samble_projects: {
			type: String,			
		},
		references: {
			type: String,			
		},
		avatar:{
			type: String
		}		
	},
	{
		timestamps: true
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;