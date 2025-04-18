---
sidebar_position: 5
title: git
---

### git reset 和revert区别 revert多个mr改如何处理

1. **Reset**:
   - 作用: 将 HEAD 指针重置到指定的提交,同时将工作区和暂存区的内容也重置到该提交时的状态。
   - 特点:
     - 彻底撤销之前的提交历史,适用于私有分支。
     - 会删除指定提交及之后的所有提交记录。
     - 可能会丢失工作区的修改内容。
2. **Revert**:
   - 作用: 生成一个新的提交,内容是撤销指定提交的变更。
   - 特点:
     - 保留之前的提交历史,适用于公共分支。
     - 不会删除任何提交记录,只是添加一个新的"撤销"提交。
     - 不会丢失工作区的修改内容。



1. **逐个 Revert 各个 MR**:

   - 命令: `git revert <commit-hash>` (对每个需要撤销的 MR 执行)
   - 操作: 针对每个需要撤销的 MR,执行 `git revert` 命令生成一个新的撤销提交。

2. **一次性 Revert 多个 MR**:

   - 命令: `git revert <commit-hash1> <commit-hash2> ... <commit-hashN>`
   - 操作: 一次性指定需要撤销的多个 MR 的提交 hash,Git 会生成一个包含所有撤销变更的新提交。

   

### git如何撤回add后的内容

1. **使用 `git reset` 撤回**
   - 命令: `git reset HEAD <file>`
   - 作用: 将指定文件从暂存区（staged）撤回到工作区（unstaged）。
2. **使用 `git reset` 撤回所有文件**
   - 命令: `git reset`
   - 作用: 将所有文件从暂存区（staged）撤回到工作区（unstaged）。
3. **使用 `git reset` 撤回到某个提交**
   - 命令: `git reset <commit-hash>`
   - 作用: 将 HEAD 指针重置到指定的提交,同时将工作区和暂存区的内容也重置到该提交时的状态。
4. **使用 `git restore` 撤回**
   - 命令: `git restore --staged <file>`
   - 作用: 将指定文件从暂存区（staged）撤回到工作区（unstaged）。这是 Git 2.23 版本引入的新命令。
5. **使用 `git checkout` 撤回**
   - 命令: `git checkout -- <file>`
   - 作用: 将指定文件从暂存区（staged）和工作区（unstaged）都撤回到上一个提交时的状态。

### git常见命令

git init 初始化
git clone 从远程克隆一份
git add 添加到缓存区
git status 查看缓存区状态 
git diff 比较文件的不同，
git commnit 缓存区提交到本地仓库
git rest 回退版本（从暂存区撤回到工作区）
git restore 回退（会生成新的提交）
git checkout 撤回（撤回到上一个提交状态） 
git rm 删除工作区文件
git log查看历史提交记录 
git remote 远程操控操作 
git pull 下载代码
git push 上传 
git reflog
git rebase 主要用于将一个分支的提交历史迁移到另一个分支上
