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

	//User queries
	user: async(parent, { username }, { models }) => {
		//find a user given their username
		return await models.User.findOne({ username });
	},
	users: async(parent, args, { models, user }) => {
		//find all users
		return await models.User.find({});
	},
	me: async(parent, args, { models, user }) => {
		//find a user given the current user context
		return await models.User.findById(user.id);
	},
	postFeed: async(parent, { cursor }, {models}) => {
		//hardcode the limit to items
		const limit = 10;
		//set the default hasNextPage Value to false
		let hasNextPage = false;
		//if no cursor is passed the default query will be empty
		//this wiil pull the newest post from the db
		let cursorQuery = {};

		//if there is a cursor
		//our query will look for posts with an ObjId less than that of the cursor
		if (cursor) {
			cursorQuery = { _id: { $lt: cursor }};
		}

		//find the limit + 1 of posts in our db, sorted newest to oldest
		let posts = await models.Post.find(cursorQuery)
			.sort({ _id: -1 })
			.limit(limit + 1);

		//if the number of posts we find exceeds our limit
		//set hasNextPage to true and trim the posts to the limit
		if(posts.length > limit){
			hasNextPage = true;
			posts = posts.slice(0, -1);
		}

		//the new cursor will be the Mongo obj ID of the last item in the feed array
		const newCursor = posts[posts.length - 1]._id;
		return{
			posts,
			cursor: newCursor,
			hasNextPage
		};
	},
	jobFeed: async(parent, { cursor }, {models}) => {
		//hardcode the limit to items
		const limit = 10;
		//set the default hasNextPage Value to false
		let hasNextPage = false;
		//if no cursor is passed the default query will be empty
		//this wiil pull the newest post from the db
		let cursorQuery = {};

		//if there is a cursor
		//our query will look for posts with an ObjId less than that of the cursor
		if (cursor) {
			cursorQuery = { _id: { $lt: cursor }};
		}

		//find the limit + 1 of posts in our db, sorted newest to oldest
		let jobs = await models.Job.find(cursorQuery)
			.sort({ _id: -1 })
			.limit(limit + 1);

		//if the number of posts we find exceeds our limit
		//set hasNextPage to true and trim the posts to the limit
		if(jobs.length > limit){
			hasNextPage = true;
			jobs = jobs.slice(0, -1);
		}

		//the new cursor will be the Mongo obj ID of the last item in the feed array
		const newCursor = jobs[jobs.length - 1]._id;
		return{
			jobs,
			cursor: newCursor,
			hasNextPage
		};
	},

};