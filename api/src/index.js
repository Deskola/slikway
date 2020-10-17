const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Local module imports
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;



const app = express();

//connect to db
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		return { models }
	}
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({
	app,
	path: '/api'
});

app.listen(port, () => 
	console.log(
		`GraphQl Server running at http://localhost:${port}${server.graphqlPath}`
	)
);