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
