export const typeDefs = `#graphql
	type Game {
		id: ID!
		title: String!
		platform: [String!]!
		reviews: [Review!]
	}
	type Review {
		id: ID!
		rating: String!
		content: String!
		game: Game!
		author: Author!
	}
	type Author {
		id: ID!
		name: String!
		verified: Boolean!
		reviews: [Review!]
	}
	type Query {
		reviews: [Review]
		review(id: ID!): Review
		games: [Game]
		game(id: ID!): Game
		authors: [Author]
		author(id: ID!): Author
	}
	type Mutation {
		addGame(game: AddGameInputs!): Game
		deleteGame(id: ID!): [Game]
		updateGame(id: ID!, edits: EditGameInputs!): Game
	}
	input AddGameInputs {
		title: String!
		platform: [String!]!
	}
	input EditGameInputs {
		title: String
		platform: [String!]
	}
`;
