'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = AppGenerator;

function AppGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    // setup the test-framework property, Gruntfile template will need this
    this.testFramework = options['test-framework'] || 'mocha';

    // for hooks to resolve on mocha by default
    if (!options['test-framework']) {
        options['test-framework'] = 'mocha';
    }

    // resolved to mocha by default (could be switched to jasmine for instance)
    this.hookFor('test-framework', { as: 'app' });

    this.on('end', function () {
        console.log('\nI\'m all done. Just run ' + 'npm install'.bold.yellow + ' to install the required dependencies.');
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(AppGenerator, yeoman.generators.NamedBase);

AppGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // welcome message
    var welcome =
          " _   ___                "+   "______ _      ".yellow +
        "\n| | / (_)               "+   "| ___ (_)     ".yellow +
        "\n| |/ / _ ___ ___ _   _  "+   "| |_/ /_  ___ ".yellow +
        "\n|    \\| / __/ __| | | | "+  "|  __/| |/ _ \\".yellow +
        "\n| |\\  \\ \\__ \\__ \\ |_| | "+"| |   | |  __/".yellow +
        "\n\\_| \\_/_|___/___/\\__, | "+"\\_|   |_|\\___|".yellow +
        "\n                  __/ |               "+
        "\n                 |___/                "


    console.log(welcome);
    console.log('Out of the box I include HTML5 Boilerplate, jQuery and Modernizr.');

    var prompts = [{
        name: 'compassBootstrap',
        message: 'Would you like to include Twitter Bootstrap for Sass?',
        default: 'Y/n',
        warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
    }];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }

        // manually deal with the response, get back and store the results.
        // we change a bit this way of doing to automatically do this in the self.prompt() method.
        this.compassBootstrap = (/y/i).test(props.compassBootstrap);

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

AppGenerator.prototype.mainStylesheet = function mainStylesheet() {
    return;
    if (this.compassBootstrap) {
        this.write('app/styles/main.scss', '$iconSpritePath: "../images/glyphicons-halflings.png";\n$iconWhiteSpritePath: "../images/glyphicons-halflings-white.png";\n\n@import \'sass-bootstrap/lib/bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
    } else {
        this.write('app/styles/main.css', 'body {\n    background: #fafafa;\n}\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
    }
};

AppGenerator.prototype.app = function app() {
    this.mkdir('utils');
    this.mkdir('tools');
    this.mkdir('common');
    this.template('package-config.js', 'common/package-config.js');
    this.template('fb.json');
    this.template('app-update.bat', 'tools/app-update.bat');
    this.template('app-update.sh', 'tools/app-update.sh');
    this.template('ki-ui.sh', 'tools/ki-ui.sh');
    this.template('ki-ui.bat', 'tools/ki-ui.bat');
};
