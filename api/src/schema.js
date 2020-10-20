const {gql} = require('apollo-server-express');

// Construct a schema, using GraphQL's schema language
module.exports = gql`
	scalar DateTime

	type User{
		id: ID!
		username: String!
		email: String!
		password: String!
		phone_number: String!
		institution: String!
		course: String
		course_year: String
		programming_proficiency: String
		github: String
		potfolio: String
		samble_projects: String
		references: String
		avatar: String
		jobs: [Job!]!
		posts: [Post!]!
		comments: [Comment!]!
		charts: [Chart!]!
		favorites: [Post!]!
		devProjects: [Job!]!
	}
	type Job{
		id: ID!
		title: String!
		description: String!
		languages: String
		duration: String!
		price: String!
		client: User!
		devCount: Int!
		devs: [User!]
		createdAt: DateTime!
		updatedAt: DateTime!
	}
	type Chart{
		id: ID!		
		message: String!
		attachment: String
		author: String!
		job: Job!
		createdAt: DateTime!
		updatedAt: DateTime!

	}
	type Post{
		id: ID!
		title: String!
		content: String!
		author: User!
		createdAt: DateTime!
		updatedAt: DateTime!
		comments: [Comment!]
		favoriteCount: Int!
		favoritedBy: [User!]
	}
	type Comment{
		id: ID!
		message: String!
		author: User!
		post: Post!
		createdAt: DateTime!
		updatedAt: DateTime!
	}
	type Chart_Auth{
		id: ID!
		code: String!
		client: String!
	}
	type PostFeed {
		posts: [Post]!
		cursor: String!
		hasNextPage: Boolean!
	}
	type JobFeed {
		jobs: [Job]!
		cursor: String!
		hasNextPage: Boolean!
	}
	type CommentFeed {
		comments: [Comment]!
		cursor: String!
		hasNextPage: Boolean!
	}
	type Query{
		jobs: [Job!]!
		job(id: ID!): Job!
		charts: [Chart!]!
		chart(id: ID!): Chart!
		posts: [Post!]!
		post(id: ID!): Post!
		comments: [Comment!]!
		comment(id: ID!): Comment!
		user(username: String!): User
		users: [User!]!
		me: User!
		postFeed(cursor: String): PostFeed
		jobFeed(cursor: String): JobFeed
		commentFeed(cursor: String): CommentFeed
	}
	type Mutation{
		newJob(title: String!, description: String!,languages: String,
			duration: String!,price: String!): Job!
		updateJob(id: ID!, title: String!, description: String,
			languages: String!, duration: String, price: String!): Job!
		deleteJob(id: ID!): Boolean!

		newPost(title: String!, content: String!): Post!
		updatePost(id: ID!, title: String!, content: String!): Post!
		deletePost(id: ID!): Boolean

		newChart(message: String!, attachment: String, job: String!, author: String!): Chart!
		updateChart(id: ID!, message: String!, attachment: String): Chart!
		deleteChart(id: ID!): Boolean

		newComment(id: ID!,message: String!): Comment!
		updateComment(id: ID!, message: String!): Comment!
		deleteComment(id: ID!): Boolean

		toggleFavorite(id: ID!): Post!
		interestedDevProjects(id: ID!): Job!
		

		signUp(
			username: String!, 
			email: String!, 
			password: String!,
			phone_number: String!
			institution: String!
			course: String
			course_year: String
			programming_proficiency: String
			github: String
			potfolio: String
			samble_projects: String
			references: String): String!
		signIn(username: String!, password: String!): String!
		updateProfile(
			id: ID!,
			username: String!,
			email: String!,
			password: String!
			phone_number: String!
			institution: String!
			course: String
			course_year: String
			programming_proficiency: String
			github: String
			potfolio: String
			samble_projects: String
			references: String
		): User!

	}
`;