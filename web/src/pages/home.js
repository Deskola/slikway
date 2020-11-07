import React, {useEffect} from 'react';


import Button from '../components/Button';



function Home() {
	useEffect(() => {
		document.title = 'Home Silkway';
	});

	return (
		<div>			
			<p>Home Page</p>
			<Button>Click me</Button>
		</div>		
	)
}

export default Home;