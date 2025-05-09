---
title: MySQL
sidebar_position: 3
---

## 为什么 MyISAM 查询性能好？


MyISAM 查询性能好的主要原因有以下几点：

- 简单的表锁设计 - MyISAM使用表级锁而非行级锁，这在读操作为主的场景下，减少了锁管理开销，使得读取操作更快。
- 查询缓存友好 - 由于不支持事务，MyISAM更容易利用MySQL的查询缓存机制，可以直接返回缓存结果。
- 非聚集索引结构 - MyISAM的索引与数据文件分离，索引文件只存储指向数据行的指针，这使得索引文件更小，可以更多地加载到内存中。
- 数据压缩支持 - MyISAM表可以压缩为只读表，减少磁盘I/O，提高查询速度。
- 全文索引原生支持 - 在早期MySQL版本中，MyISAM是唯一支持全文索引的引擎，使文本搜索更快。


---

## 说说事务特性(ACID) ?

事务的四大特性（ACID）是：

1. 原子性（Atomicity）：事务中的所有操作要么全部成功，要么全部失败，不能只执行其中的一部分。
2. 一致性（Consistency）：事务执行前后，数据库的状态必须保持一致，即满足所有约束条件。
3. 隔离性（Isolation）：多个事务并发执行时，每个事务的执行不受其他事务的影响，隔离性保证了事务的独立性。
4. 持久性（Durability）：事务一旦提交，其结果将永久保存，即使系统崩溃也不会丢失。

---

## 说说事务的隔离级别?

事务的隔离级别定义了事务之间的隔离程度，主要用于控制并发事务的可见性。MySQL支持以下四种隔离级别：

1. 读未提交（Read Uncommitted）：最低级别，允许脏读，即一个事务可以读取另一个事务未提交的数据。
2. 读已提交（Read Committed）：允许不可重复读，即一个事务在读取数据时，其他事务不能修改该数据，但可以读取未提交的数据。
3. 可重复读（Repeatable Read）：默认级别，允许幻读，即一个事务在读取数据时，其他事务不能修改该数据，但可以插入新的数据。
4. 串行化（Serializable）：最高级别，完全隔离，不允许任何并发操作，读取数据时会加锁，确保数据的一致性。

---

## 说说事务的传播行为?

事务的传播行为定义了事务在方法调用中的传播方式，主要用于控制事务的嵌套执行。MySQL支持以下几种传播行为：

1. REQUIRED：如果当前线程有事务，则加入该事务，否则创建一个新事务。
2. SUPPORTS：如果当前线程有事务，则加入该事务，否则以非事务方式执行。
3. MANDATORY：如果当前线程有事务，则加入该事务，否则抛出异常。
4. REQUIRES_NEW：无论当前线程是否存在事务，都会创建一个新事务。
5. NOT_SUPPORTED：无论当前线程是否存在事务，都以非事务方式执行。
6. NEVER：无论当前线程是否存在事务，都以非事务方式执行，如果存在事务则抛出异常。
7. NESTED：如果当前线程有事务，则创建一个嵌套事务，否则创建一个新事务。


---

## mysql数据库默认存储引擎，有什么优点？

MySQL从5.5.5版本开始，默认存储引擎是InnoDB，它具有以下优点：

1. **完整的ACID事务支持** - InnoDB支持事务，确保数据的原子性、一致性、隔离性和持久性，这对于财务和电子商务等应用至关重要。

2. **行级锁定** - 相比MyISAM的表级锁，InnoDB实现了行级锁定，大大提高了多用户并发写入性能，减少了锁冲突。

3. **外键约束** - InnoDB支持外键，帮助维护数据的引用完整性，确保关联表之间的数据一致性。

4. **崩溃恢复能力** - 通过事务日志机制，InnoDB能在服务器崩溃后自动恢复到崩溃前的状态，减少数据丢失风险。

5. **MVCC(多版本并发控制)** - 允许在高并发环境下实现非锁定读取，读操作不会阻塞写操作，提高了系统整体性能。

6. **自适应哈希索引** - InnoDB会自动为频繁访问的数据页建立哈希索引，进一步提高查询效率。

7. **数据缓冲** - InnoDB使用缓冲池来缓存数据和索引，减少磁盘I/O操作。

8. **聚集索引设计** - InnoDB的主键索引直接包含数据行，减少了二次查找，提高了按主键查询的性能。

这些特性使InnoDB成为大多数MySQL应用场景的理想选择，特别是对数据完整性要求高、并发访问频繁的应用。

5.5 之前

MySQL 5.5 之前的默认存储引擎是 MyISAM，它有以下优点：

1. **读取性能优越** - 对于以读取操作为主的应用，MyISAM 通常比 InnoDB 快，特别是在简单的 SELECT 查询中。

2. **较低的资源消耗** - MyISAM 比 InnoDB 占用更少的内存和存储空间，对于资源有限的服务器尤为重要。

3. **全文索引支持** - 在 MySQL 5.5 之前，MyISAM 是唯一支持全文索引的引擎，使其在文本搜索方面具有优势。

4. **简单高效的表锁** - 虽然表锁限制了并发写入，但在读多写少的场景下，简单的锁机制反而减少了开销。

5. **直接访问数据文件** - MyISAM 的数据以独立文件存储，可以直接复制、备份或移动到其他服务器，便于管理。

6. **计数器功能高效** - MyISAM 表维护了一个行数计数器，使得 COUNT(*) 等操作不需要全表扫描，执行速度非常快。

7. **热备份支持** - 可以在不锁定表的情况下复制 .MYI 和 .MYD 文件进行备份。

8. **可压缩表** - MyISAM 支持创建压缩的只读表，可以大幅减少存储空间，适合存档数据。

这些特点使 MyISAM 在某些特定场景下仍然是合适的选择，尤其是读密集型、低并发或静态内容为主的应用。



## MVCC 是什么？

MVCC（Multi-Version Concurrency Control，多版本并发控制）是InnoDB实现的一种并发控制机制，主要用于提高数据库的并发性能。

MVCC 的实现原理：

1. 事务隔离级别：InnoDB 支持四种事务隔离级别，包括读未提交（Read Uncommitted）、读已提交（Read Committed）、可重复读（Repeatable Read）和串行化（Serializable）。

2. 版本链：InnoDB 的每行数据都有一个版本链，版本链上保存了多个版本的数据，每个版本的数据都有一个唯一的事务ID（Transaction ID）。

3. 事务ID：每个事务都有一个唯一的事务ID，事务ID是根据事务的开始时间生成的，事务ID是递增的。

4. 隐藏列：InnoDB 的每行数据都有一个隐藏列，隐藏列中保存了事务ID、回滚指针等信息。

5. 读取操作：在读取数据时，InnoDB 会根据事务ID和回滚指针找到对应的版本数据。

---

## 说说MySQL的锁机制？

MySQL 的锁机制主要包括以下几种：

1. 表锁：表锁是 MySQL 中最基本的锁机制，用于控制对表的读写操作。表锁分为共享锁（Shared Lock）和排他锁（Exclusive Lock）。

2. 行锁：行锁是 InnoDB 引擎中的一种锁机制，用于控制对表中特定行的读写操作。行锁分为共享锁（Shared Lock）和排他锁（Exclusive Lock）。

3. 间隙锁：间隙锁是 InnoDB 引擎中的一种锁机制，用于控制对表中特定区间的读写操作。间隙锁分为共享锁（Shared Lock）和排他锁（Exclusive Lock）。

---

## 说说MySQL的索引结构？

MySQL 的索引结构主要包括以下几种：

1. B-Tree 索引：B-Tree 索引是 MySQL 中最常用的索引结构，它是一种平衡树结构，可以快速定位数据。

2. Hash 索引：Hash 索引是一种基于哈希表的索引结构，可以快速定位数据。

3. R-Tree 索引：R-Tree 索引是一种基于 R-Tree 树的索引结构，可以快速定位数据。

---

## 说说MySQL的存储引擎？

MySQL 的存储引擎主要包括以下几种：

1. MyISAM：MyISAM 是 MySQL 的默认存储引擎，它使用表级锁，读取操作速度快，适合读取密集型应用。

2. InnoDB：InnoDB 是 MySQL 的默认存储引擎，它使用行级锁，写入操作速度快，适合写入密集型应用。

3. Memory：Memory 是 MySQL 的默认存储引擎，它使用内存存储数据，读取操作速度快，适合读取密集型应用。

---

## 说说MySQL的查询优化？

MySQL 的查询优化主要包括以下几个方面：

1. 选择合适的索引：根据查询条件选择合适的索引，可以提高查询效率。
2. 优化查询语句：优化查询语句，可以提高查询效率。
3. 使用合适的存储引擎：根据应用场景选择合适的存储引擎，可以提高查询效率。
4. 使用合适的锁机制：根据应用场景选择合适的锁机制，可以提高查询效率。
