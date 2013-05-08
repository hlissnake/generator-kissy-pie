a yeoman generator for kissy pie

## install
### 安装yeoman
````sh
npm install yo -g
````

### 安装Generator

第一步:

````sh
$ npm link
````

第二步, 在你的应用目录内:

````sh
$ mkdir my-app && cd myapp
$ yo kissy-pie #执行yeoman
````

## 快速使用

打开`Gruntfile.js`，找到文件上方的这个部分：

```js
 /**
     * 下列命令执行下面命令若不给定参数，则默认添加下面配置
     *      `grunt watch`
     *      `grunt page`
     *      `grunt common`
     * 可用配置：
     *      timestamp: {String} 时间戳目录,
     *      buildPage: {String|Array} pageName/version/pkgName
     */
    var DEFAULTS = {
        timestamp: '20130510',
        buildPages: [ 'finished_task/1.0']
    };
```

设置你需要打包的page，原码版本和对应的时间戳：

如，需要将`index`页面的`1.0`版本打包到时间戳`20130508`:

```js
    var DEFAULTS = {
        timestamp: '20130508',
        buildPages: [ 'index/1.0']
    };
```
