## Querying and Mutating the data using Apollo-GraphQL with ReactJS


### 1. Install required packages
Go to your react application and run this command to install packages
```
npm i @apollo/client graphql
```

### 2. Open App.js and add following code
This code will ensure our connection with the graphql server that we provided with `HttpLink`
```js
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	HttpLink,
	from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphqlErrors, networkError }) => {
	if (graphqlErrors) {
		graphqlErrors.forEach(({ message, location, path }) => {
			alert(`GraphQL error: ${message}`);
		});
	}
});
const link = from([errorLink, new HttpLink({ uri: 'http://localhost:4000' })]);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      {/* add your components here */}
    </ApolloProvider>
  );
}

export default App;
```

### 3. Querying data
This component will fetch the users from graphql endpoint and render it when component is called.
```js
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const LOAD_USERS = gql`
	query {
		authors {
			id
			name
			verified
		}
	}
`;

const GetUsers = () => {
	const { error, loading, data } = useQuery(LOAD_USERS);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (loading) {
			console.log('Loading users');
		}
		if (data) {
			setUsers(data.authors);
		}
		if (error) {
			console.log(`Failed to fetch users: ${error}`);
		}
	}, [data]);
	return (
		<div>
			{users.map((user) => {
				return <h1 key={user.id}>{user.name}</h1>;
			})}
		</div>
	);
};

export default GetUsers;
```

### 4. Mutating the data
This component will create the new user on our graphql endpoint.
```js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
	mutation createUsers($author: AddAuthorInputs!) {
		addAuthor(author: $author) {
			id
			name
			verified
		}
	}
`;

const Form = () => {
	const [name, setName] = useState('');
	const [verified, setVerified] = useState(false);

	const [addAuthor, { data, error }] = useMutation(CREATE_USER_MUTATION);

	const addUser = () => {
		addAuthor({
			variables: {
				author: {
					name: name,
					verified: verified,
				},
			},
		});

		if (data) {
			console.log('User added successfully');
		}

		if (error) {
			console.log('Error while adding user: ' + error);
		}
	};
	return (
		<div>
			<input
				type='text'
				placeholder='Enter Name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type='radio'
				name='verfication'
				id='verified'
				value={verified}
				onChange={() => setVerified(true)}
			/>
			<label htmlFor='verified'>Verified</label>
			<input
				type='radio'
				name='verfication'
				id='unverified'
				value={verified}
				onChange={() => setVerified(false)}
			/>
			<label htmlFor='unverified'>Not Verified</label>
			<button onClick={addUser}>Add User</button>
		</div>
	);
};

export default Form;
```
