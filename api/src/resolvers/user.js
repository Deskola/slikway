module.exports = {
	//Resolve the list of posts for a user when requested
	posts: async(user, args, {models}) => {
		return await models.Post.find({ author: user._id }).sort({ _id: -1 });
	},
	//Resolve the list of favorites for a user when requested
	favorites: async(user, args, {models}) => {
		return await models.Post.find({ favoritedBy: user._id}).sort({ _id: -1 });
	},
	//Resolve the list comments for a post when requested
	comments: async(user, args, {models}) => {
		return await models.Comment.find({ author: user._id }).sort({ _id: -1 });
	},
	//Resolve the list of jobs for a user when requested
	jobs: async(user, args, {models}) => {
		return await models.Job.find({ client: user._id}).sort({ _id: -1 });
	},
	//Resolve the list of applied jobs
	devProjects: async(user, args, {models}) => {
		return await models.Job.find({ devs: user._id }).sort({ _id: -1});
	},
}