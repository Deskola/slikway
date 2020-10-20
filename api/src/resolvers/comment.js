module.exports = {
	//Resolve the post info for a comment when requested
	post: async(comment, args, {models}) => {
		return await models.Post.findById(comment.post);
	},
	//Resolve author info for a comment when requested
	author: async(comment, args, {models}) => {
		return await models.User.findById(comment.author);
	}

}