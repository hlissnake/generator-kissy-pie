'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = PageGenerator;

function PageGenerator(args, options, config) {
    var self = this;
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        console.log('\nSuccess Generated Page:%s', self.pagePath.green);
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.askFor = function askFor(pagePath) {
    var welcome = "\n    *------*" +
        "\n    | Page |" +
        "\n    *------*" +
        "\n";
    console.log(welcome.green);



    if (!pagePath) {
        var cb = this.async();
        this.prompt([{
            name: 'pageName',
            message: 'Name of you Page?'
        }, {
            name: 'pageVersion',
            message: 'version of the page?'
        }], function (err, props) {

            if (err) {
                return this.emit('error', err);
            }

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
    console.log('Generating Page. %s', this.pagePath);
    var pagePath = this.pagePath;
    this.mkdir(path.join(pagePath, 'test'));
    this.mkdir(path.join(pagePath, 'page', 'mods'));
    this.template('fb-build.bat', path.join(pagePath, 'fb-build.bat'));
    this.template('fb-build.sh', path.join(pagePath, 'fb-build.sh'));
    this.template('fb.page.json', path.join(pagePath, 'fb.page.json'));
    //TODO choose based on styleEngine
    this.template('index.less', path.join(pagePath, 'page', 'index.less'));
    this.template('init.js', path.join(pagePath, 'page', 'init.js'));
};
