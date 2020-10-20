module.exports = {
	//Reslove the author infor for a post when requseted
	author: async(post, args, {models}) => {
		return await models.User.findById(post.author);
	},
	//Resolve the favoritedBy info for a post when requested
	favoritedBy: async(post, args, {models}) => {
		return await models.User.find({ _id: { $in: post.favoritedBy }});
	},
	//Resolve the list comments for a post when requested
	comments: async(post, args, {models}) => {
		return await models.Comment.find({ post: post._id }).sort({ _id: -1 });
	}
}