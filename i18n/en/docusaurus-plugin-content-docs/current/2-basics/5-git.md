---
sidebar_position: 5
title: git
---

### Difference between git reset and git revert; how to revert multiple MRs

1. **Reset**:
   - Effect: Move HEAD to a specified commit, and reset the working tree and index to that commit's state.
   - Characteristics:
     - Completely rewrites prior history. Suitable for private branches.
     - Removes the specified commit and all commits after it.
     - May discard working-tree changes.
2. **Revert**:
   - Effect: Create a new commit that undoes the changes of a specified commit.
   - Characteristics:
     - Preserves history. Suitable for public/shared branches.
     - Doesn't remove any commits — just adds a new "undo" commit.
     - Doesn't discard working-tree changes.



1. **Revert each MR individually**:

   - Command: `git revert <commit-hash>` (run once per MR to undo)
   - Action: For each MR, run `git revert` to produce an undo commit.

2. **Revert multiple MRs at once**:

   - Command: `git revert <commit-hash1> <commit-hash2> ... <commit-hashN>`
   - Action: Specify all MR commit hashes — Git creates a single commit containing all the reverts.



### How to undo files after `git add`

1. **Use `git reset` to unstage**
   - Command: `git reset HEAD <file>`
   - Effect: Move a file from staged back to unstaged.
2. **Use `git reset` to unstage all**
   - Command: `git reset`
   - Effect: Unstage all files.
3. **Use `git reset` to a specific commit**
   - Command: `git reset <commit-hash>`
   - Effect: Move HEAD to a specific commit and reset index/working tree.
4. **Use `git restore` to unstage**
   - Command: `git restore --staged <file>`
   - Effect: Unstage a file. Introduced in Git 2.23.
5. **Use `git checkout` to discard**
   - Command: `git checkout -- <file>`
   - Effect: Discard both staged and unstaged changes for a file, reverting to the previous commit's state.

### Common git commands

git init — initialize
git clone — clone from remote
git add — stage changes
git status — show stage/working-tree status
git diff — show file diffs
git commit — commit staged changes to the local repo
git reset — revert versions (unstage / move HEAD)
git restore — restore files (also creates new commits)
git checkout — switch / revert to previous state
git rm — remove files from the working tree
git log — show commit history
git remote — manage remotes
git pull — pull from remote
git push — push to remote
git reflog — view reference log
git rebase — move commits from one branch onto another
