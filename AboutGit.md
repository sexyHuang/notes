## git 相关拾遗

### 分布式 VS 集中式

集中式（SVN）：版本库放在中央服务器，要先从服务器拿到新版本，开发完成后推送回服务器。  
分布式（Git）：版本库本地存放，可以没有远程服务器（有的话方便协同开发，一般会有），可以离线开发。

### Git VS SVN

1. git 复杂概念多，svn 简单易上手
2. git 分支廉价（commit 指针），svn 分支昂贵（copy 目录）

### Git 核心概念

#### 工作流

- 工作区（Workspace）: 工作目录；
- 暂存区（Index）：缓存区域，临时保存改动；
- 仓库区（Repository）：本地仓库/远程仓库。

日常工作流程：
<image src="./images/git_daily_work.jpg">

### Git 命令集

#### 初始化

```bash
# 在当前目录新建git代码库
$ git init

# clone一个项目和它整个代码历史
$ git clone [url]
```

#### 配置

```bash
# 列出所有配置
$ git config -l

# 配置命令别名
$ git config --global alias.co checkout

# 设置用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```

Git 用户的配置文件位于 `~/.gitconfig`  
单仓库的配置文件位于`~/$PROJECT_PATH/.git/config`

#### 文件操作

```bash
# to Index

$ git add .

$ git add <file1> <file2>...

$ git add <dir>

$ git rm [file1] [file2] ...

# 停止跟踪文件，保留文件在Workspace
$ git rm --cached [file]

$ git mv [file-original] [file-renamed]

# 丢弃工作区修改
$ git checkout -- <file>

# 丢弃暂存区修改
$ git reset HEAD <file>
```

操作.gitignore，可以控制 git 跟踪文件范围。

#### 分支操作

```bash
$ git branch

$ git branch -a

$ git branch [branch-name]

$ git checkout -b [branch-name] [remote-branch]
```

### Rebase（变基）

把分叉的提交历史“整理”成一条直线，看上去更直观。缺点是本地的分叉提交已经被修改过了。
<a herf="https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA">详细</a>
