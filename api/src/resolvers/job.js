module.exports = {
	//Reslove the author infor for a post when requseted
	client: async(job, args, {models}) => {
		return await models.User.findById(job.client);
	},
	//Reslove the devs info for a job when requested
	devs: async(job, args, {models}) => {
		return await models.User.find({ _id: { $in: job.devs }});
	}
}