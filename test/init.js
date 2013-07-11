/**
 * 针对 初始化 任务的文件以及内容检查
 */

'use strict';
var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;


describe('ABC - KISSY-PIE generator', function () {

    var KISSYPie;

    beforeEach(function( done ){
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                done(err);
            }
            KISSYPie = helpers.createGenerator('kissy-pie:app', [
                '../../app'
            ]);

            KISSYPie.options['skip-install'] = true;
            done();
        });
    });

    it('基本文件检查', function (done) {

        helpers.mockPrompt( KISSYPie, {
            projectName: "my_project",
            author: 'neekey',
            email: 'ni184775761@gmail.com',
            styleEngine: 'sass'
        });

        var expected = [
            '.gitattributes', '.gitignore', '.editorconfig', '.jshintrc',
            'utils/',
            'common/',
            'Gruntfile.js',
            'package.json',
            'abc.json'
        ];

        KISSYPie.run({}, function () {
            helpers.assertFiles( expected );
            done();
        });
    });

    describe( '使用不同类型样式引擎', function(){

        it('使用SASS', function (done) {

            var expected = [
                // 检查模块依赖
                [ 'package.json', /grunt-contrib-compass/ ],
                // 检查插件配置
                [ 'Gruntfile.js', /compass\:\s*\{/ ],
                // 检查任务配置
                [ 'Gruntfile.js', /compass\:page/ ],
                [ 'Gruntfile.js', /compass\:common/ ],
                // 检查watch配置
                [ 'Gruntfile.js', /tasks\:\s*\[\s*\'compass\'/ ],
                // 检查abc信息
                [ 'abc.json', /"styleEngine"\:\s*"sass"/ ]
            ];
            helpers.mockPrompt( KISSYPie, {
                projectName: "my_project",
                author: 'neekey',
                email: 'ni184775761@gmail.com',
                styleEngine: 'sass'
            });

            KISSYPie.run({}, function() {
                helpers.assertFiles(expected);
                done();
            });
        });

        it('使用LESS', function (done) {

            var expected = [
                [ 'package.json', /grunt-contrib-less/ ],
                [ 'Gruntfile.js', /less\:\s*\{/ ],
                [ 'Gruntfile.js', /less\:page/ ],
                [ 'Gruntfile.js', /less\:common/ ],
                [ 'Gruntfile.js', /tasks\:\s*\[\s*\'less\'/ ],
                [ 'abc.json', /"styleEngine"\:\s*"less"/ ]
            ];
            helpers.mockPrompt( KISSYPie, {
                projectName: "my_project",
                author: 'neekey',
                email: 'ni184775761@gmail.com',
                styleEngine: 'less'
            });

            KISSYPie.run({}, function() {
                helpers.assertFiles(expected);
                done();
            });
        });

        it('使用CSS', function (done) {

            var expected = [
                [ 'package.json', /grunt-css-combo/ ],
                [ 'Gruntfile.js', /css_combo\:\s*\{/ ],
                [ 'Gruntfile.js', /css_combo\:page/ ],
                [ 'Gruntfile.js', /css_combo\:common/ ],
                [ 'Gruntfile.js', /tasks\:\s*\[\s*\'css_combo\'/ ],
                [ 'abc.json', /"styleEngine"\:\s*"css"/ ]
            ];
            helpers.mockPrompt( KISSYPie, {
                projectName: "my_project",
                author: 'neekey',
                email: 'ni184775761@gmail.com',
                styleEngine: 'css'
            });

            KISSYPie.run({}, function() {
                helpers.assertFiles(expected);
                done();
            });
        });
    });
});