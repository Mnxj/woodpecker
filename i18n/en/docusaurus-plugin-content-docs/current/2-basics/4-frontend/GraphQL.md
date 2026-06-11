### What is GraphQL?

An API query language developed by Facebook, suited for complex systems and shifting requirements.

The `core idea` is one API instead of many — clients can fetch all the data they need without calling multiple endpoints or making multiple requests. It supports real-time queries and subscriptions.

- Queries

```json
query {
  user(id: "123") {
  name
  email
}
}
```

- Mutations

> Mutations modify data on the server. Like queries, mutations specify the fields to return.

```json
mutation {
  createUser(name: "John Doe", email: "john@example.com") {
  id
  name
}
}
```

- Subscriptions

> Subscriptions let clients receive real-time data updates. When data changes on the server, the client is notified.

```json
subscription {
  newUserAdded {
  id
  name
}
}
```

- Schema

> The core is the Schema, which defines the data shapes the client can request. Declared via Types.

```ts
type User {
    id: ID!
    name: String!
    email: String!
}

type Query {
    user(id: ID!): User
}

type Mutation {
    createUser(name: String!, email: String!): User
}
```

- Type system

Supports scalar types (String, Int, Boolean), enums, interfaces, and union types.

- Resolvers

Resolvers define how to fetch data. Each field has a resolver function that returns the field's value.

```javascript
const resolvers = {
    Query: {
        user(parent, args, context, info) {
            return users.find(user => user.id === args.id);
        }
    },
    Mutation: {
        createUser(parent, args, context, info) {
            const newUser = { id: users.length + 1, name: args.name, email: args.email };
            users.push(newUser);
            return newUser;
        }
    }
};
```

### How to implement real-time updates in GraphQL?

1. `WebSocket` — a bidirectional protocol for real-time communication between client and [server](https://cloud.tencent.com/developer/techpedia/2248).
2. `Subscription` — a protocol for real-time data updates that lets clients subscribe to server-side events. Defined in the GraphQL schema.
3. Pub/Sub (Publish/Subscribe) — a messaging pattern letting multiple clients subscribe to the same topic and publish messages on that topic. GraphQL can use it.

### How does GraphQL compare to RESTful APIs?

Data fetching: REST fetches data via URL and HTTP method; clients can only get fixed-format data, which often includes unwanted fields. GraphQL fetches data via query strings — clients specify the exact shape and structure.

Request count: REST often needs multiple requests to gather all required data; GraphQL needs just one.

API versioning: REST typically requires independent development and maintenance for each API version; GraphQL maintains a single API.

Caching: REST works well with HTTP caching; GraphQL's flexible queries make caching harder.
