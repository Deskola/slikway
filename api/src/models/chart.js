//Require mongoose lib
const mongoose = require('mongoose');

//Define the Job database schema
const chartSchema = new mongoose.Schema(
	{
		message:{
			type: String,
			required: true
		},
		attachment: {
			type: String,
			
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

const Chart = mongoose.model('Chart', chartSchema);

module.exports = Chart