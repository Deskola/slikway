import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from './home';
import Profile from './profile';
import Posts from './posts';
import Jobs from './jobs';
import Favorites from './favorites';

function Pages() {
	return(
		<Router>
			<Layout>
				<Route exact path='/' component={Home} />
				<Route path='/profile' component={Profile} />
				<Route path='/jobs' component={Jobs} />
				<Route path='/posts' component={Posts} />
				<Route path='/favorites' component={Favorites} />
			</Layout>			
		</Router>
	)
}

export default Pages;