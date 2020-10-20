//Require mongoose lib
const mongoose = require('mongoose');

//Define the Job database schema
const jobSchema = new mongoose.Schema(
	{
		title:{
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		languages: {
			type: String,			
		},
		duration: {
			type: String,
			required: true
		},
		price: {
			type: String,
			required: true
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		devCount: {
			type: Number,
			default: 0
		},
		devs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		],
	},
	{
		timestamps: true
	}
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;