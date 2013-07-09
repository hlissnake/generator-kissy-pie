'use strict';

var util = require('util');
var path = require('path');
var Base = require('abc-generator').UIBase;
var pkgInfo = require( path.resolve( process.cwd(), 'abc.json' ) );

module.exports = PageGenerator;

function PageGenerator(args, options, config) {
    Base.apply(this, arguments);

    this.on('end', function () {
        this.log.writeln('done!');
    }.bind(this));

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(PageGenerator, Base);

/**
 * 对用户进行提问
 * @param {String} pagePath yo kissy-pie:page home/1.0 其中的 home/1.0
 */
PageGenerator.prototype.askFor = function askFor(pagePath) {

    this.log(this.abcLogo);

    if (!pagePath) {
        var cb = this.async();
        this.prompt([{
            name: 'pageName',
            message: 'My page name is:'
        }, {
            name: 'pageVersion',
            message: 'My page version is:'
        }], function ( props) {

            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.pageName = props.pageName;
            this.pagePath = path.join(props.pageName, props.pageVersion);

            cb();

        }.bind(this));
    } else {
        this.pagePath = pagePath;
    }
};

/**
 * 创建用户文件
 */
PageGenerator.prototype.page = function app() {
    this.log.writeln('Generating Page. %s', this.pagePath);
    var pagePath = this.pagePath;
    this.mkdir(path.join(pagePath, 'page', 'mods'));
    this.copy('init.js', path.join(pagePath, 'page', 'init.js'));

    var styleEngine = pkgInfo._kissy_pie.styleEngine;

    switch( styleEngine ){
        case "less":
            this.copy('index.less', path.join(pagePath, 'page', 'index.less'));
            break;
        case 'sass':
            this.mkdir(path.join(pagePath, 'page', 'images', 'i' ));
            this.copy('sass_sprites/attention.png', path.join(pagePath, 'page', 'images', 'i', 'attention.png'));
            this.copy('sass_sprites/question.png', path.join(pagePath, 'page', 'images', 'i', 'question.png'));
            this.copy('_sprites.scss', path.join(pagePath, 'page', 'mods', '_sprites.scss'));
            this.copy('index.scss', path.join(pagePath, 'page', 'index.scss'));
            break;
        default:
            this.copy('index.less', path.join(pagePath, 'page', 'index.css'));
            break;
    }
};
