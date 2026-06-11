---
title: Redis
sidebar_position: 2
---

Redis is an open-source in-memory data structure store, often referred to as a NoSQL database. Key features and uses of Redis:

1. **In-memory storage**: Data lives entirely in memory, enabling extremely fast read/write speed.
   - Supports many data types — strings, hashes, lists, sets, sorted sets, etc.
2. **Persistence**:
   - Redis offers two persistence mechanisms: snapshots (RDB) and logs (AOF).
   - These periodically write in-memory data to disk for durability.
3. **High performance**:
   - Redis's in-memory model and non-blocking I/O design deliver millisecond response times.
   - It can handle hundreds of thousands to millions of requests per second — great for high-throughput applications.
4. **Versatile use cases**:
   - Cache system, message queue, state manager, real-time data store.
   - Counters, leaderboards, rate limiters, and more.
5. **Distributed and clustering**:
   - Supports master-slave replication and Sentinel mode for high availability and failover.
   - Provides cluster mode for horizontal scaling of capacity and throughput.
6. **Rich ecosystem**:
   - Many third-party libraries and tools supporting Python, Java, Node.js, etc.
   - Integrates seamlessly with many applications and frameworks.

Main Redis use cases:

- Caching: cache frequently accessed data to improve response times.
- Message queue: async task processing and event-driven middleware.
- Real-time apps: storing and managing real-time data — leaderboards, chat, dashboards.
- Counters and rate limiters: pageview counters, API rate limiting.
- Distributed locks and state management: coordinating concurrent access in distributed systems.



### Common Redis syntax

1. **Key-value operations**
   - `SET key value`: set a key
   - `GET key`: get a key's value
   - `DEL key`: delete a key
   - `EXPIRE key seconds`: set a key's TTL
2. **Data types**
   - String
     - `APPEND key value`: append to a string
     - `INCR key`: increment by 1
     - `DECR key`: decrement by 1
   - Hash
     - `HSET key field value`: set a field
     - `HGET key field`: get a field
     - `HDEL key field`: delete a field
   - List
     - `LPUSH key value1 [value2 ...]`: push to the head of a list
     - `RPOP key`: pop from the tail
     - `LRANGE key start stop`: get a range of elements
   - Set
     - `SADD key member1 [member2 ...]`: add members to a set
     - `SREM key member1 [member2 ...]`: remove members
     - `SMEMBERS key`: get all members
   - Sorted Set
     - `ZADD key score1 member1 [score2 member2 ...]`: add members with scores
     - `ZRANGE key start stop [WITHSCORES]`: get a range of members
     - `ZREM key member1 [member2 ...]`: remove members
3. **Transactions and locking**
   - `MULTI`: start a transaction
   - `EXEC`: execute the transaction
   - `DISCARD`: discard a transaction
   - `WATCH key [key ...]`: watch keys — abort the transaction if any of them change before EXEC
4. **Pub/Sub**
   - `PUBLISH channel message`: publish to a channel
   - `SUBSCRIBE channel [channel ...]`: subscribe to channels
5. **Persistence**
   - `SAVE`: save synchronously
   - `BGSAVE`: save asynchronously

