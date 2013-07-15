/**
 * 针对 初始化 任务的文件以及内容检查
 */

'use strict';
var NPM = require( 'npm' );
var fs = require('fs-extra');
var path = require('path');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;


describe('ABC - KISSY-PIE generator', function () {

    it('基本build：page/common[html/js]', function (done) {

        // 先复制一份目录
        helpers.testDirectory(path.join(__dirname, 'build_test' ), function (err) {

            if( err ){
                done( err );
            }
            else {
//                console.log( path.resolve( __dirname, 'build_common' ), path.resolve( __dirname, 'build_test' ) )
                fs.copy( path.resolve( __dirname, 'build_common' ), path.resolve( __dirname, 'build_test' ), function( err ){
                    if( err ){
                        done( err );
                    }
                    else {
                        // 先安装依赖
                        NPM.load({},function(err){
                            if( err ){
                                done(err)
                            }
                            else {
                                NPM.commands.install(
                                    path.resolve( __dirname, 'build_test' ),
                                    require( path.resolve( __dirname, 'build_test/package.json') ).devDependencies,
                                    function( err, data ){

                                        if( err ){
                                            done( err );
                                        }
                                        else {
                                            // 执行grunt操作 打包page
                                            var spawn = require('child_process').spawn;
                                            var grunt = spawn('grunt', [ 'page' ] );

                                            grunt.stdout.on('data', function (data) {
                                                console.log('stdout: ' + data);
                                            });

                                            grunt.stderr.on('data', function (data) {
                                                console.log('stderr: ' + data);
                                            });

                                            grunt.on('close', function (code) {

                                                // 打包common
                                                var spawn = require('child_process').spawn;
                                                var grunt = spawn('grunt', [ 'common' ] );

                                                grunt.stdout.on('data', function (data) {
                                                    console.log('stdout: ' + data);
                                                });

                                                grunt.stderr.on('data', function (data) {
                                                    console.log('stderr: ' + data);
                                                });

                                                grunt.on('close', function () {

                                                    // 检查文件
                                                    helpers.assertFiles([
                                                        'home/1.0',
                                                        'home/20130712/page/init.js',
                                                        'home/20130712/page/init-min.js',
                                                        'home/1.0/page/mods/overlay-tpl.js',
                                                        'common/package-config-min.js',
                                                        'common/out-min.js',
                                                        'common/tooltip/in-min.js',
                                                        'common/mods/popup-tpl.js',
                                                    ]);

                                                    done();
                                                });
                                            });
                                        }
                                    });
                            }
                        });

                    }
                });
            }

        });
    });
});