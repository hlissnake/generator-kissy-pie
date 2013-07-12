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

        // 先初始化目录
        helpers.mockPrompt( KISSYPie, {
            projectName: "my_project",
            author: 'neekey',
            email: 'ni184775761@gmail.com',
            styleEngine: 'sass'
        });

        KISSYPie.run({}, function () {
            var KISSYPiePage = helpers.createGenerator('kissy-pie:page', [
                '../../page'
            ]);

            helpers.mockPrompt( KISSYPiePage, {
                pageName: 'home',
                pageVersion: '1.0'
            });

            KISSYPiePage.run({}, function(){
                helpers.assertFiles([
                    'home/1.0/page/mods',
                    'home/1.0/page/init.js'
                ]);

                done();
            });
        });
    });

    describe( '使用不同类型样式引擎来创建page', function(){

        it('SASS类型page', function (done) {

            // 先初始化目录
            helpers.mockPrompt( KISSYPie, {
                projectName: "my_project",
                author: 'neekey',
                email: 'ni184775761@gmail.com',
                styleEngine: 'sass'
            });

            KISSYPie.run({}, function () {

                helpers.assertFiles([
                    [ 'abc.json', /"styleEngine"\:\s*"sass"/ ]
                ]);

                var KISSYPiePage = helpers.createGenerator('kissy-pie:page', [
                    '../../page'
                ]);

                helpers.mockPrompt( KISSYPiePage, {
                    pageName: 'home',
                    pageVersion: '1.0'
                });

                KISSYPiePage.run({}, function(){
                    helpers.assertFiles([
                        'home/1.0/page/images/i/attention.png',
                        'home/1.0/page/images/i/question.png',
                        'home/1.0/page/mods/_sprites.scss',
                        'home/1.0/page/index.scss'
                    ]);

                    done();
                });
            });
        });

        it('LESS类型page', function (done) {

            // 先初始化目录
            helpers.mockPrompt( KISSYPie, {
                projectName: "my_project",
                author: 'neekey',
                email: 'ni184775761@gmail.com',
                styleEngine: 'less'
            });

            KISSYPie.run({}, function () {

                helpers.assertFiles([
                    [ 'abc.json', /"styleEngine"\:\s*"less"/ ]
                ]);

                var KISSYPiePage = helpers.createGenerator('kissy-pie:page', [
                    '../../page'
                ]);

                helpers.mockPrompt( KISSYPiePage, {
                    pageName: 'home',
                    pageVersion: '1.0'
                });

                KISSYPiePage.run({}, function(){

                    helpers.assertFiles([
                        'home/1.0/page/index.less'
                    ]);

                    done();
                });
            });
        });

        it('CSS类型page', function (done) {

            // 先初始化目录
            helpers.mockPrompt( KISSYPie, {
                projectName: "my_project",
                author: 'neekey',
                email: 'ni184775761@gmail.com',
                styleEngine: 'css'
            });

            KISSYPie.run({}, function () {

                helpers.assertFiles([
                    [ 'abc.json', /"styleEngine"\:\s*"css"/ ]
                ]);

                var KISSYPiePage = helpers.createGenerator('kissy-pie:page', [
                    '../../page'
                ]);

                helpers.mockPrompt( KISSYPiePage, {
                    pageName: 'home',
                    pageVersion: '1.0'
                });

                KISSYPiePage.run({}, function(){
                    helpers.assertFiles([
                        'home/1.0/page/index.css'
                    ]);

                    done();
                });
            });
        });
    });
});