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
	}
	type Job{
		id: ID!
		title: String!
		description: String!
		languages: String
		duration: String!
		price: String!
		client: User!
		createdAt: DateTime!
		updatedAt: DateTime!
	}
	type Chart{
		id: ID!		
		message: String!
		attachment: String
		author: String!

	}
	type Post{
		id: ID!
		title: String!
		content: String!
		author: String!
	}
	type Comment{
		id: ID!
		message: String!
		author: String!
		post: String!
	}
	type Chart_Auth{
		id: ID!
		code: String!
		client: String!
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
		user(id: ID!): User!
	}
	type Mutation{
		newJob(title: String!, description: String!,languages: String,
			duration: String!,price: String!, client: String!): Job!
		updateJob(id: ID!, title: String!, description: String,
			languages: String!, duration: String, price: String!): Job!
		deleteJob(id: ID!): Boolean!

		newPost(title: String!, content: String!, author: String!): Post!
		updatePost(id: ID!, title: String!, content: String!): Post!
		deletePost(id: ID!): Boolean

		newChart(message: String!, attachment: String, author: String!): Chart!
		updateChart(id: ID!, message: String!, attachment: String): Chart!
		deleteChart(id: ID!): Boolean

		newComment(message: String!, author: String!, post: String!): Comment!
		updateComment(id: ID!, message: String!): Comment!
		deleteComment(id: ID!): Boolean

		signUp(username: String!, email: String!, password: String!,phone_number: String!
			institution: String!): String!
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