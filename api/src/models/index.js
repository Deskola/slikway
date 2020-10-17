const User = require('./user');
const Job = require('./job');
const Post = require('./post');
const Comment = require('./comment');
const Chart = require('./chart');
const ChartAuth = require('./chart_auth');

const models = {
	User,
	Job,
	Post,
	Comment,
	Chart,
	ChartAuth
}

module.exports = models;