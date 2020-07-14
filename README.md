demo 性质,感觉 vite 还是不能上生产环境,社区对 esm 支持没有想象中的好,为了可以跑起来做了很多 fix 工作
而且 vite 首页打开也会慢一点,感觉在构建上浪费一点时间还好

> :warning: 跑不起来了 加了依赖后需要 fix 太多,fix 不动了

# 样板项目

> 基于 Electorn + vite + react + typeScirpt
> 配置了 eslint

## 安装

> npm i

## 运行

> npm run start

另开一个 terminal

> npm run start:electron

ps: `main.ts` 文件改了需要手动重新执行`npm run start:electron`

## 构建

> npm run build

## 提交代码

> 遵循 https://www.conventionalcommits.org/
> 也可以使用 npm run commit 来格式化提交

## 发布版本

> npm run release

ps: 只有在 1.0.0 之后的版本 feat 是 minor,fix 是 patch
