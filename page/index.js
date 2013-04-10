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
    var welcome =
        '\n     _-----_' +
            '\n    |       |' +
            '\n    |'+'--(o)--'.red+'|   .--------------------------.' +
            '\n   `---------´  |    '+'Welcome to Yeoman,'.yellow.bold+'    |' +
            '\n    '+'( '.yellow+'_'+'´U`'.yellow+'_'+' )'.yellow+'   |   '+'ladies and gentlemen!'.yellow.bold+'  |' +
            '\n    /___A___\\   \'__________________________\'' +
            '\n     |  ~  |'.yellow +
            '\n   __'+'\'.___.\''.yellow+'__' +
            '\n ´   '+'`  |'.red+'° '+'´ Y'.red+' `\n';

    console.log(welcome);
    console.log('Generating Page. %s', pagePath);

    this.pagePath = pagePath;

};


PageGenerator.prototype.page = function app(pageName) {
    var pagePath = this.pagePath;
    this.mkdir(path.join(pagePath, 'test'));
    this.mkdir(path.join(pagePath, 'page', 'mods'));
    this.template('fb-build.bat', path.join(pagePath, 'fb-build.bat'));
    this.template('fb-build.sh', path.join(pagePath, 'fb-build.sh'));
    this.template('fb.page.json', path.join(pagePath, 'fb.page.json'));
    this.template('index.less', path.join(pagePath, 'page', 'index.less'));
    this.template('init.js', path.join(pagePath, 'page', pageName + '.js'));
};
