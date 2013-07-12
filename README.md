A yeoman generator for kissy pie

[![Build Status](https://secure.travis-ci.org/neekey/generator-kissy-pie.png)](http://travis-ci.org/neekey/generator-kissy-pie)

## install
### 安装yeoman
````sh
npm install yo -g
````

### 安装Generator

第一步:

```sh
$ npm link
```

第二步, 在你的应用目录内:

```sh
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

之后则可以直接使用 `grunt` 或者 `grunt page`进行打包，使用`grunt watch`进行文件监控。 

## 命令行

使用命令行将覆盖`Gruntfile.js`中对于build目标的配置，具体使用如下：

```
单个页面：
     *          打包：     `grunt page --target home/1.0 --ts 20130412`
     *          watch：    `grunt watch --target home/1.0 --ts 20130412`      
多个页面：
     *          打包：     `grunt page --target home/1.0,intro/2.0 --ts 20130506`
     *          watch:    `grunt watch --target home/1.0,intro/2.0 --ts 20130506`
```
