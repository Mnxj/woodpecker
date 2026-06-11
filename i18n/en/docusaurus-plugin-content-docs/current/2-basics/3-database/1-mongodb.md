---
title: MongoDB
sidebar_position: 1
---


### 1. Introduction

MongoDB is a database based on distributed file storage. Official site: https://www.mongodb.com/

#### What is a database?

A database is an application that organizes, stores, and manages data using data structures.

#### Characteristics of database-managed data

Compared with managing data through plain files, databases offer:

1. Faster speed
2. Better scalability
3. Better security

#### Why pick MongoDB?

The syntax is similar to JavaScript — easy to pick up, low learning cost.

### 2. Core concepts

- Database — a database is a data warehouse; a server can host many databases; a database holds many collections
- Collection — a collection is like a JS array; it can hold many documents
- Document — the smallest unit in the database, similar to a JS object

- A JSON file is like a database; one MongoDB server can host N databases
- A top-level array in JSON is like a collection
- Objects in the array are like documents
- An object's properties are sometimes called fields

### 3. Download, install, and run

Download: https://www.mongodb.com/try/download/community

```shell
docker pull mongo
docker run -itd --name mongo -p 27017:27017 mongo --auth
# Enter the container
docker exec -it mongo /bin/mongosh
# Switch database
use admin
# Create user
db.createUser(
   {
     user: "user",
     pwd: "123",
     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
   }
)
# Authenticate
db.auth('user', '123');
# Enter the server
docker exec -it mongo bash
# Log in
mongosh -u user -p 123
# Show all databases
show dbs
# Create a collection
db.createCollection('name')
# Show collections in the current database
show collections
# Drop a collection
db.<collection>.drop()
# Rename
db.<collection>.rename()
```

#### Connect to MongoDB from Node

```js
npm i mongoose

const mongoose = require('mongoose')

mongoose.connect('mongodb://user:123@127.0.0.1:27017/admin')

// callbacks
mongoose.connection.on('open', () => {
    console.log('Success')
})
mongoose.connection.on('error', () => {
    console.log('error')
})
mongoose.connection.on('close', () => {
    console.log('close')
})
```


### Common MongoDB syntax

1. **Database operations**
   - `use database_name`: switch database
   - `db`: view the current database
   - `show dbs`: list all databases
   - `db.dropDatabase()`: drop the current database
2. **Collection operations**
   - `db.createCollection("collection_name")`: create a collection
   - `db.getCollectionNames()`: list collections
   - `db.collection_name.drop()`: drop a collection
3. **Document operations**
   - `db.collection_name.insert(document)`: insert a document
   - `db.collection_name.find()`: find documents
   - `db.collection_name.update(query, update, options)`: update documents
   - `db.collection_name.remove(query, options)`: remove documents
4. **Query operations**
   - `db.collection_name.find(query, projection)`: find documents
   - `db.collection_name.findOne(query, projection)`: find a single document
   - `db.collection_name.find().pretty()`: pretty-print results
   - `db.collection_name.find(query).count()`: count results
5. **Conditional queries**
   - `{field: value}`: equals
   - `{field: {$gt: value}}`: greater than
   - `{field: {$lt: value}}`: less than
   - `{field: {$in: [value1, value2]}}`: in an array
   - `{field: {$regex: /pattern/}}`: regex
6. **Index operations**
   - `db.collection_name.createIndex({field: 1})`: create an index
   - `db.collection_name.getIndexes()`: list indexes
   - `db.collection_name.dropIndex("index_name")`: drop an index
7. **Aggregation**
   - `db.collection_name.aggregate([{$group: {_id: "$field", count: {$sum: 1}}}])`: aggregation
