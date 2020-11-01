import React from 'react';
import styled from 'styled-components';

import logo from '../pics/logo.png';

const HeaderBar = styled.header`
	width: 100%;
	padding: 0.5em 1em;
	display: flex;
	height: 64px;
	position: fixed;
	align-items: center;
	background-color: #fff;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
	z-index: 1;

`;

const LogoText = styled.h2`
	margin: 0;
	padding: 0;
	display: inline;
`;

function Header() {
	return (
		<HeaderBar>
			<img src={logo} alt="logo" width="40" height="30" />
			&nbsp;&nbsp;
			<LogoText>Silkway</LogoText>
		</HeaderBar>
	)
}

export default Header;