//GraphQL query resolver for the schema
module.exports = {
	//Job model queries
	jobs: async(parent, args, { models }) => {
		return await models.Job.find();
	},
	job: async(parent, args, { models }) => {
		return await models.Job.findById(args.id);
	},

	//Post model queries
	posts: async(parent, args, { models }) => {
		return await models.Post.find();
	},
	post: async(parent, args, { models }) => {
		return await models.Post.findById(args.id);
	},

	//Chart queries
	charts: async(parent, args, { models }) => {
		return await models.Chart.find();
	},
	chart: async(parent, args, { models }) => {
		return await models.Chart.findById(args.id);
	},

	//Comment queries
	comments: async(parent, args, { models }) => {
		return await models.Comment.find();
	},
	comment: async(parent, args, { models }) => {
		return await models.Comment.findById(args.id);
	},
};