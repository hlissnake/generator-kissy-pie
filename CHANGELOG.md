### v0.1.6

- 1、解决watch时，common目录下文件变更导致不断执行任务的问题
- 2、删除page子任务中产生的历史遗留文件
- 3、修复sub generator不执行的问题
- 4、更新README.md

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