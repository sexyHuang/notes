## Lerna

lerna 同样是一个 monorepo 仓库管理工具，和 workspaces 不同的是它拥有更多高级的功能，特别在版本发布方面。

[快速入门](https://lernajs.bootcss.com/)
[Docs](https://github.com/lerna/lerna#readme)

### lerna.json

lerna 工具的配置文件
例子：

```js

{
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": [
    "packages/*"
  ],
  "version": "independent",
  "command": {
    "version": {
      // 合法分支
      "allowBranch": "master",
      // 忽略项
      "ignoreChanges": [
        "**/*.md"
      ],
      // git commit 信息
      "message": "chore(release): publish"
      // more setting:　https://github.com/lerna/lerna/tree/main/commands/version
    }
  }
}
```

### 常用命令

#### publish

```sh
# 普通发布
lerna publish

# 依照 Conventional Commits Specification 来区分发布语义化版本
lerna publish --conventional-commits

# 预发布
lerna publish --canary
```

[Conventional Commits Specification](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
