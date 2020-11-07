import React, {useEffect} from 'react';
import {useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

import PostFeed from '../components/PostFeed';
import Button from '../components/Button';

//Graphql query stored as a variable
const GET_POSTS = gql`
 query postFeed($cursor: String){
  postFeed(cursor: $cursor){
    cursor
    hasNextPage
    posts{
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
}
`;

function Posts() {
	useEffect(() => {
		document.title = 'Posts Silkway';
	});
	//query hook
	const { data, loading, error, fetchMore } = useQuery(GET_POSTS);

	//if the data is loading, display a loading message
	if (loading) return <p>Loading...</p>;
	
	if (error) return <p>Error!</p>;

	//if the dta is successful, display the dtata in our UI
	return (
    <React.Fragment>
      <PostFeed posts={data.postFeed.posts} />
    {/*Only display the load more if hasNextPage is true*/}
      {data.postFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.postFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  postFeed: {
                    cursor: fetchMoreResult.postFeed.cursor,
                    hasNextPage: fetchMoreResult.postFeed.hasNextPage,
                    //combine the new result and the old
                    posts: [
                      ...previousResult.postFeed.posts,
                      ...fetchMoreResult.postFeed.posts
                    ],
                    __typename: 'postFeed'
                  }
                };
              }
            })
          }
        >See more</Button>
      )}
    </React.Fragment>
		
	)
}

export default Posts;