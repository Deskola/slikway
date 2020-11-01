import React, {useEffect} from 'react';

function Favorites() {
	useEffect(() => {
		document.title = 'Favorites Silkway';
	});

	return (
		<p>Favorites page</p>
	)
}

export default Favorites;