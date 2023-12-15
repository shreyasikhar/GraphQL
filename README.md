## Getting Started with Apollo Server - GraphQL

Open https://www.apollographql.com/docs/apollo-server/getting-started and follow the steps

```
npm init --yes && npm pkg set type="module"
npm install @apollo/server graphql
```

Create `index.js` file at the root directory

Update scripts in package.json and add schema and resolvers in `index.js` file as per the docs.

Create a schema ( see schema.js file ) and add resolvers.

Run `nodemon index` or `npm run start` to start the server which will run the `index.js` file.


## Examples

### 1. To read the data
```
query ReviewQuery( $id: ID!) {
  review(id: $id) {
    id,
    rating,
    content,
    game {
      title,
      reviews {
        id
      }
    },
    author {
      name
    }
  }
}
```
Add in Operations.
```
{
  "id": "2"
}
```
Add in Variables.

### 2. To delete the data
```
mutation DeleteMutation($id: ID!) {
  deleteGame(id: $id) {
    id,
    title,
    platform
  }
}
```
Add in Operations
```
{
  "id": "1"
}
```
Add in variables

### 3. To add the data
```
mutation AddMutation($game: AddGameInputs!) {
  addGame(game: $game) {
    id,
    title,
    platform
  }
}
```
Add in Operations
```
{
  "game": {
    "title": "A new game",
    "platform": ["switch", "PS5"]
  }
}
```
Add in Variables

### 4. To update the data
```
mutation EditMutation($id: ID!, $edits: EditGameInputs!) {
  updateGame(id: $id, edits: $edits) {
    id,
    title,
    platform
  }
}
```
Add in Operations
```
{
  "id": "2",
  "edits": {
    "title": "Final Fantasy 7 Remake Updated",
    "platform":["PS5", "Switch"]
  }
}
```
Add in Variables
