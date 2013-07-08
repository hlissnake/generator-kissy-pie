/*global describe, before, it, beforeEach */
'use strict';
var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;


describe('ABC - KISSY-PIE generator', function () {
    var KISSYPie;

    it('should generate dotfiles', function (done) {

        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                done(err);
            }
            KISSYPie = helpers.createGenerator('kissy-pie:app', [
                '../../app'
            ]);

            KISSYPie.options['skip-install'] = true;

            helpers.mockPrompt( KISSYPie, {
                projectName: "my_project",
                author: 'neekey',
                email: 'ni184775761@gmail.com',
                styleEngine: 'sass'
            });

            KISSYPie.run({}, function () {
                helpers.assertFiles(['.gitattributes', '.gitignore', '.editorconfig', '.jshintrc']);
                done();
            });

            done();
        });


    });
//
//    it('creates expected files', function (done) {
//        var expected = [
//            'utils/',
//            'common/',
//            'Gruntfile.js',
//            'package.json',
//            'abc.json'
//        ];
//        helpers.mockPrompt( KISSYPie, {
//            projectName: "my_project",
//            author: 'neekey',
//            email: 'ni184775761@gmail.com',
//            styleEngine: 'sass'
//        });
//
//        KISSYPie.run({}, function() {
//            helpers.assertFiles(expected);
//            done();
//        });
//    });

//    describe('Controller', function () {
//        it('should generate a new controller', function (done) {
//            var angularCtrl;
//            var deps = ['../../controller'];
//            angularCtrl = helpers.createGenerator('angular:controller', deps, ['foo']);
//
//            helpers.mockPrompt(angular, {
//                bootstrap: true,
//                compassBoostrap: true
//            });
//            angular.run([], function () {
//                angularCtrl.run([], function () {
//                    helpers.assertFiles([
//                        ['app/scripts/controllers/foo.js', /controller\('FooCtrl'/],
//                        ['test/spec/controllers/foo.js', /describe\('Controller: FooCtrl'/]
//                    ]);
//                    done();
//                });
//            });
//        });
//    });
//
//    describe('View', function () {
//        it('should generate a new view', function (done) {
//            var angularView;
//            var deps = ['../../view'];
//            angularView = helpers.createGenerator('angular:view', deps, ['foo']);
//
//            helpers.mockPrompt(angular, {
//                bootstrap: true,
//                compassBoostrap: true
//            });
//            angular.run([], function (){
//                angularView.run([], function () {
//                    helpers.assertFiles([
//                        ['app/views/foo.html']
//                    ]);
//                    done();
//                });
//            });
//        });
//    });
});