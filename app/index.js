'use strict';
var util = require('util');
var path = require('path');
var Base = require('abc-generator').UIBase;



module.exports = AppGenerator;

function AppGenerator(args, options, config) {
    Base.apply(this, arguments);
    
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.on('end', function () {
        this.log('Thanks for use "KISSY Pie", Have a good day!');
    }.bind(this));
}

util.inherits(AppGenerator, Base);

AppGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // welcome message
    this.log.writeln(this.abcLogo);

    var abcJSON = {};
    try {
        abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
    } catch (e) {
    }

    if (!abcJSON.author) {
        abcJSON.author = {
            name: '',
            email: ''
        }
    }
    if (!abcJSON._kissy_pie) {
        abcJSON._kissy_pie = {
            styleEngine: ''
        }
    }

    var prompts = [
        {
            name: 'projectName',
            message: 'Name of Project?',
            default: abcJSON.name || path.basename(process.cwd()),
            warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
        },
        {
            name: 'author',
            message: 'Author Name:',
            default: abcJSON.author.name,
            warning: ''
        },
        {
            name: 'email',
            message: 'Author Email:',
            default: abcJSON.author.email,
            warning: ''
        },
        {
            name: 'styleEngine',
            message: 'Whitch style engin do you use [css-combo|less|sass]?',
            default: abcJSON._kissy_pie.styleEngine,
            warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
        }
    ];

    this.prompt(prompts, function (err, props) {

        if (err) {
            return this.emit('error', err);
        }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.projectName = props.projectName;
        this.author = props.author;
        this.email = props.email;
        this.styleEngine = props.styleEngine;
        this.enableLess = (/less/i).test(this.styleEngine);
        this.enableSass = (/sass/i).test(this.styleEngine);
        this.enableCSSCombo = (/css-combo/i).test(this.styleEngine);

        cb();
    }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.app = function app() {
    this.mkdir('utils');
    this.mkdir('tools');
    this.mkdir('common');
    this.copy('README.md', 'README.md');
    this.template('abc.json');
    this.template('package-config.js', 'common/package-config.js');
};

AppGenerator.prototype.install = function install() {
    var cb = this.async();
    var self = this;
    this.npmInstall('', {}, function (err) {

        if (err) {
            cb(err);
            return;
        }
        self.log.writeln('\n\nnpm was installed successful. \n\n');

    });
};

AppGenerator.prototype.install = function install() {
    var cb = this.async();
    var self = this;
    this.npmInstall('', {}, function (err) {

        if (err) {
            cb(err);
            return;
        }

        self.log.writeln('\n\nnpm was installed successful. \n\n');
        cb();
    });
};

AppGenerator.prototype.installSub = function installSub() {

    console.log('install sub generator');
    var cb = this.async();

    this.prompt([{
        name: 'initPage',
        message: 'Do you add a page right now? (Y/n)',
        default: 'n',
        warning: ''
    }], function (err, props) {

        if (err) {
            cb(err);
            return;
        }

        this.initPage = (/y/i).test(props.initPage);

        if (this.initPage) {
            this.invoke('kissy-pie:page', {}, cb);
        }

    }.bind(this));
};

/**
 * Scan Project
 */
AppGenerator.prototype._scan = function _scan() {



    var pages = this.expand('/*/*.*/', {
        nomount: true,
        root: '.',
        mark: true
    });

    pages = pages.map(function(pathname){
        return {
            name: path.basename(path.dirname(pathname)),
            version: path.basename(pathname).replace(/[\\/]$/, '')
        };
    });

    return {
        pages: pages
    };

};