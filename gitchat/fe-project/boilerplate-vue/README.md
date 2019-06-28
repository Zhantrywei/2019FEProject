# gitchat - 透视前端工程化

## 第01课：模板功能设计
1. 目录结构
   1. boilerplate-vue
      1. package.json - npm配置文件
      2. README.md - 项目介绍和使用文件
      3. .gitignore - git忽略列表
      4. .babelrc - babel配置文件
      5. config 配置相关文件
      6. build - 构建相关文件
      7. mock - Mock假数据
      8. test - 测试相关文件
         1. unit
         2. e2e
      9. src - 业务代码
         1.  assets - 静态资源（图片、字体）
         2.  components - Vue组件
         3.  router - router路由文件
         4.  pages - 不同页面
         5.  app.js - 项目构建入口文件
         6.  App.vue - 视图层入口文件
      10. public - 公用静态资源
          1.  index.html - HTML入口模板文件
          2.  favicon.ico - 站点小图标
2. webpack的使用
   1. 安装
        ```bash
            mkdir webpack
            cd webpack
            npm init -y
            npm install webpack webpack-cli --save-dev
        ```
   2. 