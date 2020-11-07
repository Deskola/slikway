import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Post from './Post';

const PostWrapper = styled.div`
	max-width: 800px;
	margin: 0 auto;
	margin-bottom: 2em;
	padding-bottom: 2em;
	border-bottom: 1px solid #f5f4f0;
`;

function PostFeed({ posts }) {
	return(
		<div>
			{posts.map(post => (
				<PostWrapper key={post.id}>
					<Post post={post}/>
					<Link to={`post/${post.id}`}>Permalink</Link>
				</PostWrapper>
			))}
		</div>
	)
}

export default PostFeed;