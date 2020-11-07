import React from 'react';
import { useQuery, gql } from '@apollo/client';

//import the Post component
import Post from '../components/Post';

//the post query, which accepts an id variable
const GET_POST = gql`
	query post($id: ID!){
		post(id: $id){
			id
			createdAt
			title
			content
			favoriteCount
			author{
			  username
			  id
			  avatar
			}

		}
	}
`;


function PostPage(props) {
	//store the id found in the url as a variable
	const id = props.match.params.id;

	//query hooks, passing the id value as a variable
	const { loading, error, data } = useQuery(GET_POST, { variables: { id }});
	//if the data is loading, display a loading message
	if (loading) return <p>Loading...</p>;
	
	if (error) return <p>Error! Post not found</p>;

	//if the dta is successful, display the dtata in our UI
	return <Post post={data.post} />
	
}

export default PostPage;