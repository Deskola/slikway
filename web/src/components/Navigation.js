import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import homeIcon from '../pics/home-icon.png';
import profileIcon from '../pics/profile-icon.jpg';
import jobIcon from '../pics/job-icon.png';
import postIcon from '../pics/post-icon.png';
import favoriteIcon from '../pics/favorite-icon.jpg';

const Nav = styled.nav`
	padding: 1em;
	background: #f5f4f0;

	@media (max-width: 700px) {
		padding-top: 64px;
	}

	@media (min-width: 700px) {
		position: fixed;
		width: 220px;
		height: calc(100% - 64px);
		overflow-y: scroll;
	}
	
`;

const NavList = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	line-height: 2;

	/* We can nest styles in styled-components */
	/* The following styles will apply to links within the NavList component */
	a {
		text-decoration: none;
		font-weight: bold;
		font-size: 1.1em;
		color: #333;
	}

	a:visited {
		color: #333;
	}

	a:hover,
	a:focus {
		color: #0077cc;
		border-bottom: 3px solid  #0077cc;
		
	}
	
`;

const NavLink = styled.li`
	display: flex;	
	padding: 10px;

`;

function Navigation() {

	return (
		<Nav>			
			<NavList>
				<NavLink>
					<img src={homeIcon} alt="home-icon" width="30" height="30" />
					&nbsp;
					<Link to="/">Home</Link>
				</NavLink>
				<NavLink>
					<img src={profileIcon} alt="home-icon" width="30" height="30" />
					&nbsp;					
					<Link to="/profile">Profile</Link>
				</NavLink>
				<NavLink>
					<img src={postIcon} alt="home-icon" width="30" height="30" />
					&nbsp;					
					<Link to="/posts">Posts</Link>
				</NavLink>
				<NavLink>
					<img src={jobIcon} alt="home-icon" width="30" height="30" />
					&nbsp;					
					<Link to="/jobs">Jobs</Link>
				</NavLink>
				<NavLink>
					<img src={favoriteIcon} alt="home-icon" width="30" height="30" />
					&nbsp;
					<Link to="/favorites">Favorites</Link>
				</NavLink>
			</NavList>
		</Nav>		
	)
}

export default Navigation;