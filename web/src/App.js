import React  from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Pages from './pages';
//import global style
import GlobalStyle from './components/GlobalStyle';

//config our API URI and cache
const uri = process.env.REACT_APP_API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({
	uri,
	cache,
	connectToDevTools: true
});

function App() {  
  return (
  	<ApolloProvider client={client} className="App">
  		<GlobalStyle />
    	<Pages />
  	</ApolloProvider>    
  );
}

export default App;
