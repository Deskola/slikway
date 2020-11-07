import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';


//keep post from extending wider than 800px
const StyledPost = styled.article`
	max-width: 800px;
	margin: 0 auto;
`;

const MetaData = styled.div`
	@media (min-width: 500px){
		display: flex;
		align-item: top;
	}
`;

const MetaInfo = styled.div`
	padding-right: 1em;	
`;

const UserActions = styled.div`
	margin-left: auto;
`;

function Post({post}) {
	return(
		<StyledPost>
			<MetaData>
				<MetaInfo>
					<img
						src={post.author.avatar}
						alt="{post.author.username} avatar"
						height="50px"
					/>
				</MetaInfo>
				<MetaInfo>
					<em>by</em> {post.author.username} <br />
					{new Date(post.createdAt).toLocaleDateString()} 
				</MetaInfo>
				<UserActions>
					<em>Favorites:</em> {post.favoriteCount}
				</UserActions>
			</MetaData>
			<h3>{post.title}</h3>
			<ReactMarkdown source={post.content} />
		</StyledPost>
	)
}

export default Post;