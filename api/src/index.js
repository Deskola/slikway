const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
require('dotenv').config();

//Local module imports
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

//get the user info from JWT
const getUser = token => {
	if (token) {
		try{
			//return the user info from the token
			return jwt.verify(token, process.env.JWT_SECRET);
		}catch(err){
			//if there is s problem with the token, throw an error
			throw new Error('Session invalid');
		}
	}
};


const app = express();
app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));

//connect to db
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
	validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
	introspection: true,
  	playground: true,
	context: ({req}) => {
		//get the user token from header
		const token = req.headers.authorization;
		//try to retrieve a user with the token
		const user = getUser(token);
		//log user to the console
		//console.log(user)
		return { models, user }
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