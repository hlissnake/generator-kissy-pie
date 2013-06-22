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


PageGenerator.prototype.page = function app() {
    this.log.writeln('Generating Page. %s', this.pagePath);
    var pagePath = this.pagePath;
    this.mkdir(path.join(pagePath, 'test'));
    this.mkdir(path.join(pagePath, 'page', 'mods'));
    this.template('index.less', path.join(pagePath, 'page', 'index.less'));
    this.template('init.js', path.join(pagePath, 'page', 'init.js'));
    var styleEngine = pkgInfo._kissy_pie.styleEngine;
    var styleMainFilename = styleEngine == 'less' ? 'index.less' :
        ( styleEngine == 'sass' ? 'index.scss' : 'index.css' );
    this.template('index.less', path.join(pagePath, 'page', styleMainFilename));

};
