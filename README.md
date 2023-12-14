### Getting Started with Apollo Server - GraphQL

Open https://www.apollographql.com/docs/apollo-server/getting-started and follow the steps

```
npm init --yes && npm pkg set type="module"
npm install @apollo/server graphql
```

Create `index.js` file at the root directory

Update scripts in package.json and add schema and resolvers in `index.js` file as per the docs.

Create a schema ( see schema.js file ) and add resolvers.

Run `nodemon index` or `npm run start` to start the server which will run the `index.js` file.
