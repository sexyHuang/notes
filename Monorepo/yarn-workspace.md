## Yarn Workspaces

yarn workspaces 是 yarn 的一种新的创建项目的工具，目的就是创建一个更适合 monorepo 模式的项目仓库。

### yarn Workspaces 的项目基本结构

```lua
    root -- 项目根目录
    ├── package.json -- 根目录下的package.json 用于workspaces相关配置
    ├── node_modules -- 共享依赖库
    └── packages -- 项目文件夹，项目管理配置在package.json里

```

### 根目录 package.json 基本配置

```js
{
  "private": true, // 必须，应该根目录不应该被发布，为了安全原因必须设为private
  "workspaces": ['packages/*'], // 配置到的符合npm包标准的文件夹都会被workspaces管理（通配符模式）
}
```

### 常用命令

- 查看 workspaces 的信息
  `yarn workspaces info`

- 执行项目内的脚本
  `yarn workspaces run <command>`

- 在选择 package 中执行 yarn 命令
  `yarn workspace <workspace_name> <command>`

- 依赖安装

  ```sh
  # at root
  yarn install
  ```

### Tips

如果不希望某个包通过 workspaces 管理，可以在包目录下创建`.yarnrc`文件并添加
`workspaces-experimental false`禁用。
