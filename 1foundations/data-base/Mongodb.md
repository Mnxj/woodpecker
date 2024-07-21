
### 一、简介

MongoDB是一个基于分布式文件存储的数据库，官方地址 https://www.mongodb.com/

#### 数据库是什么

数据库是按照数据结构来组织、存储和管理数据的应用程序

#### 数据库管理数据的特点

相比纯文件管理数据，数据库管理数据有如下特点：

1. 速度更快
2. 拓展性更强
3. 安全性更强

#### 为什么旋转Mongodb

操作语法与javascript类似，容易上手，学习成本低

### 二、核心概念

- 数据库 数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存放很多集合
- 集合 集合类似于js中的数组，在集合中可以存放很多文档
- 文档 文档是数据库中的最小单位，类似于JS中的对象

- jos n文件好比是一个数据库，一个mongodb服务下可以有N个数据库
- json文件中一级属性的数组值好比是集合
- 数组中的对象好比是文档
- 对象中的属性有时也称之为字段

### 三、下载安装与启动

下载地址：https://www.mongodb.com/try/download/community

```shell
docker pull mongdb
docker run -itd --name mongo -p 27017:27017 mongo --auth
#进入到内部
docker exec -it mongo /bin/mongosh  
#切换数据库
use admin
#创建账户
db.createUser(
   {
     user: "user",
     pwd: "123",
     roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
   }
)
#验证
db.auth('user','123');
#进入服务器
docker exec -it mongo bash
# 登录
mongosh -u user -p 123
# 显示所有数据库
show dbs
# 创建集合
db.createCollection('name')
#显示curret database 所有的集合
show collections
#删除某个集合
db.集合名.drop()
#重命名
db.集合名.rename()
```

#### node链接mongdb

```js
npm i mongoose

const mongoose = require('mongoose')

mongoose.connect('mongodb://user:123@127.0.0.1:27017/admin')

// callback 
mongoose.connection.on('open',()=> {
    console.log('Success')
})
mongoose.connection.on('error',()=> {
    console.log('error')
})
mongoose.connection.on('close',()=> {
    console.log('close')
})
```


### mongodb常用语法

1. **数据库操作**
   - `use database_name`: 切换到指定的数据库
   - `db`: 查看当前所在的数据库
   - `show dbs`: 显示所有数据库
   - `db.dropDatabase()`: 删除当前数据库
2. **集合操作**
   - `db.createCollection("collection_name")`: 创建集合
   - `db.getCollectionNames()`: 查看所有集合
   - `db.collection_name.drop()`: 删除集合
3. **文档操作**
   - `db.collection_name.insert(document)`: 插入文档
   - `db.collection_name.find()`: 查找文档
   - `db.collection_name.update(query, update, options)`: 更新文档
   - `db.collection_name.remove(query, options)`: 删除文档
4. **查询操作**
   - `db.collection_name.find(query, projection)`: 查找文档
   - `db.collection_name.findOne(query, projection)`: 查找单个文档
   - `db.collection_name.find().pretty()`: 以美化的格式显示查询结果
   - `db.collection_name.find(query).count()`: 返回查询结果的数量
5. **条件查询**
   - `{field: value}`: 等于
   - `{field: {$gt: value}}`: 大于
   - `{field: {$lt: value}}`: 小于
   - `{field: {$in: [value1, value2]}}`: 在数组中
   - `{field: {$regex: /pattern/}}`: 正则表达式
6. **索引操作**
   - `db.collection_name.createIndex({field: 1})`: 创建索引
   - `db.collection_name.getIndexes()`: 查看索引
   - `db.collection_name.dropIndex("index_name")`: 删除索引
7. **聚合操作**
   - `db.collection_name.aggregate([{$group: {_id: "$field", count: {$sum: 1}}}])`: 聚合查询