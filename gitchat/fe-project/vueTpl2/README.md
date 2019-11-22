# gitchat - 透视前端工程化

1. package-lock.json: package-lock 的主要功能是锁定当前依赖包的版本，确保用户的环境和依赖的包是一致的，保证项目的稳定性。
2. vue-loader 会解析 .vue 文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它默认导出一个 Vue.js 组件选项的对象。
3. vue-template-compiler 会接解析 template 标签中的内容，预处理为 JS 渲染函数，并最终注入到从 <script> 导出的组件中。
4. node-sass: npm 安装 node-sass 依赖时，会从 github.com 上下载 .node 文件。由于国内网络的原因，下载时间可能会很长，甚至导致超时失败。这是大家可能都会遇到的的问题。解决方案就是使用其他源，或者使用工具下载，然后将安装源指定到本地。另外，如果安装失败，再执行安装的话就不再触发下载了，这里建议先执行 npm uninstall node-sass 之后再重新安装。
5. postcss-preset-env: postcss 通过插件系统，提供了很多强大的功能，比如可以通过 autoprefixer 自动添加浏览器前缀，通过 postcss-preset-env 插件，我们可以使用尚未支持的 CSS 特性，插件会帮助我们将未来的 CSS 特性转换成现有的 CSS，类似于 Babel 将 ES6+ 的语法转换成 ES5 的语法。postcss-preset-env 插件已经包含了 autoprefixer 插件的功能，因此如果配置了 postcss-preset-env 的话，无需单独再安装 autoprefixer。