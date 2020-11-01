import React, {useEffect} from 'react';

function Posts() {
	useEffect(() => {
		document.title = 'Posts Silkway';
	});

	return (
		<p>Post page</p>
	)
}

export default Posts;