### 什么是GraphQL？

API查询语言，由feedback开发，适合复杂系统和多变的需求场景， 

`核心思想`是用一个API来代替多个API，客户端可以获取所需的所有数据，而不需要调用多个API或者进行多次请求,支持实时数据查询和订阅，

- 查询

```json
query {
  user(id: "123") {
    name
    email
  }
}
```

- 变更

>  变更用于修改服务器上的数据。与查询类似，变更可以指定需要修改的数据字段。

```json
mutation {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
  }
}
```

- 订阅（Subscriptions）

> 订阅允许客户端接收实时数据更新。当服务器上的数据发生变化时，客户端会收到通知。

```json
subscription {
  newUserAdded {
    id
    name
  }
}
```

- 模式（Schema）

>  核心是模式（Schema），它定义了客户端可以请求的数据结构。Type声明

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

- 类型系统

支持标量类型（如 String、Int、Boolean）、枚举类型、接口类型和联合类型等。

- 解析器（Resolvers）

它们定义了如何获取数据。每个字段都有一个对应的解析器函数，该函数负责返回字段的值。

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

### 

### 如何在GraphQL中实现实时数据更新？

1. `WebSocket`是一种双向通信协议，可以在客户端和[服务器](https://cloud.tencent.com/developer/techpedia/2248)之间建立实时的通信连接。
2. `Subscription`一种用于实现实时数据更新的协议，它允许客户端订阅服务器端的数据更新事件。在GraphQL  schema中定义
3. Pub/Sub（Publish/Subscribe）是一种消息传递模式，允许多个客户端订阅同一主题，并在该主题上发布消息。在GraphQL中，可以使用

### 它如何与RESTful APIs⽐较？

数据获取方式: R 通过URL和HTTP方法来获取数据，客户端只能获取固定格式的数据,且数据可能包含不需要的数据，GraphQL通过查询语句来获取数据，客户端可以指定需要数据的格式和结构。

网络请求次数: R 需要进行多次请求才能获取所需的所有数据，而GraphQL只需要一次。

接口版本： R 需要为每个接口版本进行独立的开发和维护，而GraphQL只需要维护一个API接口

缓存: R 可以使用HTTP缓存来提高性能，而GraphQL由于查询语句的灵活性，缓存较为困难