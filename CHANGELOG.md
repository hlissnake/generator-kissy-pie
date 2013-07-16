新版本修复了旧bug，新增了不少功能，也可能会有稳定性风险，请酌情升级。

### v0.2.0
- 1、去掉初始化完项目后马上进行子任务的提问
- 2、解决子任务（page）不管使用什么样式引擎都会生成index.less的问题
- 3、优化SASS相关的初始化内容
- 4、优化init.js的初始化内容
- 5、修改用户打包目标配置到abc.json中
- 6、使用matchdep模块简化载入npm grunt依赖的过程
- 7、去掉了README.md
- 7、去掉了tools目录
- 8、修改样式引擎问题中的css-combo为css
- 9、优化了watch的配置
- 10、解决page和common任务时，没有对utils中的html文件进行build的问题
- 11、common目录打包规则变更
    - 默认对所有层级文件进行打包，而不再只是对common根目录下文件进行打包
    - 所有以下划线“_”开头的文件将被忽略
- 12、对代码添加了持续集成


### v0.1.6

- 1、暂时去掉对于common目录的watch（无法很好地解决common下文件变更导致不断执行任务的问题）
- 2、删除page子任务中产生的历史遗留文件
- 3、修复sub generator不执行的问题
- 4、更新README.md
- 5、由于clean操作会导致`.svn`文件夹被删除，因此去掉clean

### V0.1.5

- 1、优化自模板，根据用户选择的样式引擎创建index.less/index.scss/index.css
- 2、去掉Gruntfile.js中的debug命令


### V0.1.2

- 1、优化部分模板逻辑
- 2、解决KMC没有将其他包打入脚本的问题
- 3、解决common下js文件打包覆盖源文件的问题
- 4、为uglifyJS添加unicode的处理
- 5、为compass的watch添加图片的watch
- 6、解决index.js中由于要复制README.md没有指定输出目录导致的程序错误
