//Require mongoose lib
const mongoose = require('mongoose');

//Define the Job database schema
const chatAuthSchema = new mongoose.Schema(
	{
		code:{
			type: String,
			required: true
		},		
		client: {
			type: String,
			required: true
		},
				
	},
	{
		timestamps: true
	}
);

const ChartAuth = mongoose.model('ChartAuth', chatAuthSchema);

module.exports = ChartAuth;