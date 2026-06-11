---
title: MySQL
sidebar_position: 3
---

## Why does MyISAM have good query performance?

The main reasons MyISAM performs well for queries:

- Simple table-level locking — MyISAM uses table-level locks instead of row-level locks, reducing lock-management overhead in read-heavy scenarios.
- Query-cache friendly — since it doesn't support transactions, MyISAM is easier for MySQL's query cache to leverage, returning cached results directly.
- Non-clustered index structure — MyISAM separates the index from the data file. The index file only stores pointers to data rows, making indexes smaller and more cacheable in memory.
- Compression support — MyISAM tables can be compressed as read-only, reducing disk I/O and speeding up queries.
- Native full-text indexing — in older MySQL versions, MyISAM was the only engine with full-text indexing, making text search faster.


---

## What are the ACID properties of transactions?

The four properties (ACID) of transactions:

1. Atomicity — all operations in a transaction either all succeed or all fail; you cannot execute only part of it.
2. Consistency — before and after a transaction, the database must remain in a consistent state — all constraints satisfied.
3. Isolation — when multiple transactions run concurrently, each is unaffected by the others, preserving transaction independence.
4. Durability — once a transaction commits, its results are persisted, even if the system crashes.

---

## Transaction isolation levels?

Isolation levels define how isolated transactions are from each other; they control visibility under concurrent execution. MySQL supports four:

1. Read Uncommitted — lowest level. Allows dirty reads: a transaction can read another transaction's uncommitted data.
2. Read Committed — allows non-repeatable reads: while reading, other transactions can't modify the data, but can read uncommitted data elsewhere.
3. Repeatable Read — the default. Allows phantom reads: while reading, other transactions can't modify the data, but can insert new rows.
4. Serializable — highest level, full isolation. No concurrent operations allowed; reads acquire locks to ensure consistency.

---

## Transaction propagation behaviors?

Propagation behavior defines how transactions propagate through method calls — useful for controlling nested transactions. MySQL supports:

1. REQUIRED — join the current transaction if one exists, otherwise create a new one.
2. SUPPORTS — join the current transaction if it exists, otherwise run without a transaction.
3. MANDATORY — join the current transaction; throw if none exists.
4. REQUIRES_NEW — always create a new transaction.
5. NOT_SUPPORTED — always run without a transaction.
6. NEVER — always run without a transaction; throw if one exists.
7. NESTED — if a transaction exists, create a nested one; otherwise create a new one.


---

## MySQL's default storage engine — what are the benefits?

Since MySQL 5.5.5, the default storage engine is InnoDB, which offers:

1. **Full ACID transaction support** — InnoDB supports transactions, ensuring atomicity, consistency, isolation, durability — critical for finance, e-commerce, etc.

2. **Row-level locking** — Compared to MyISAM's table locks, InnoDB has row-level locks, greatly improving concurrent write performance and reducing contention.

3. **Foreign keys** — InnoDB supports foreign keys to enforce referential integrity between related tables.

4. **Crash recovery** — InnoDB uses transaction logs (redo log) to recover automatically after a crash, reducing data loss risk.

5. **MVCC (Multi-Version Concurrency Control)** — non-locking reads in high-concurrency environments; reads don't block writes, improving overall performance.

6. **Adaptive hash index** — InnoDB automatically builds hash indexes for frequently accessed pages, further speeding up queries.

7. **Data buffering** — InnoDB uses a buffer pool to cache data and indexes, reducing disk I/O.

8. **Clustered index design** — InnoDB primary-key indexes contain the data rows, eliminating secondary lookups for primary-key queries.

These features make InnoDB the right choice for most MySQL applications — especially ones with strict data-integrity needs and high concurrency.

Pre-5.5

Before MySQL 5.5, the default storage engine was MyISAM, which had:

1. **Excellent read performance** — for read-heavy apps, MyISAM is often faster than InnoDB, especially for simple SELECT queries.

2. **Lower resource consumption** — MyISAM uses less memory and storage than InnoDB, important for resource-constrained servers.

3. **Full-text indexing** — before MySQL 5.5, MyISAM was the only engine with full-text indexes, advantageous for text search.

4. **Simple, efficient table locks** — table locks limit concurrent writes, but in read-heavy scenarios the simpler locking reduces overhead.

5. **Direct data-file access** — MyISAM stores data in independent files that can be copied, backed up, or moved to another server — easy management.

6. **Efficient counters** — MyISAM tables maintain a row-count counter, so `COUNT(*)` doesn't need a full-table scan and is very fast.

7. **Hot backups** — MyISAM data files (.MYI, .MYD) can be copied for backup without locking the table.

8. **Compressed tables** — MyISAM supports compressed read-only tables, greatly reducing storage for archival data.

These traits keep MyISAM a sensible choice in some scenarios — read-heavy, low-concurrency, or mostly static content apps.



## What is MVCC?

MVCC (Multi-Version Concurrency Control) is a concurrency-control mechanism implemented by InnoDB to improve database concurrency.

How MVCC works:

1. Isolation levels — InnoDB supports four: Read Uncommitted, Read Committed, Repeatable Read, Serializable.

2. Version chain — each row in InnoDB has a chain of versions; each version has a unique transaction ID.

3. Transaction IDs — each transaction has a unique, monotonically increasing ID based on start time.

4. Hidden columns — each row has hidden columns storing the transaction ID, rollback pointer, etc.

5. Read operations — InnoDB uses the transaction ID and rollback pointer to find the appropriate version of the data.

---

## MySQL's locking?

MySQL's locking mechanisms include:

1. Table locks — the most basic lock; controls read/write on a table. Divided into shared locks and exclusive locks.

2. Row locks — used by InnoDB; controls read/write on specific rows. Also shared and exclusive variants.

3. Gap locks — used by InnoDB; controls read/write over a range of rows. Also shared and exclusive variants.

---

## MySQL index structures?

MySQL's index structures include:

1. B-Tree index — the most common. A balanced tree for fast row lookups.

2. Hash index — based on a hash table.

3. R-Tree index — based on R-Tree, for spatial data.

---

## MySQL storage engines?

MySQL's main storage engines:

1. MyISAM — older default; table-level locks; fast reads; good for read-heavy workloads.

2. InnoDB — current default; row-level locks; fast writes; good for write-heavy workloads.

3. Memory — stores data in memory; fast reads; good for read-heavy workloads.

---

## MySQL query optimization?

Query optimization touches several areas:

1. Choose appropriate indexes based on query conditions to improve performance.
2. Optimize query statements themselves.
3. Choose the right storage engine for the workload.
4. Choose the right locking strategy for the workload.
