/**
 * 针对 初始化 任务的文件以及内容检查
 */

'use strict';
var NPM = require( './helper/npm' );
var Grunt = require( './helper/grunt' );
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
                fs.copy( path.resolve( __dirname, 'build_common' ), path.resolve( __dirname, 'build_test' ), function( err ){
                    if( err ){
                        done( err );
                    }
                    else {
                        // 先安装依赖
                        NPM.install( path.resolve( __dirname, 'build_test' ), function(err){
                            if( err ){
                                done(err)
                            }
                            else {
                                Grunt.exec( path.resolve( __dirname, 'build_test' ), [ 'page' ], function( err ){

                                    if( err ){
                                        done( err );
                                    }
                                    else {

                                        Grunt.exec( path.resolve( __dirname, 'build_test' ), [ 'common' ], function( err ){

                                            // 检查文件
                                            helpers.assertFiles([
                                                'home/1.0',
                                                'home/20130712/page/init.js',
                                                'home/20130712/page/init-min.js',
                                                'home/1.0/page/mods/overlay-tpl.js',
                                                'common/package-config-min.js',
                                                'common/out-min.js',
                                                'common/tooltip/in-min.js',
                                                'common/mods/popup-tpl.js'
                                            ]);

                                            done();
                                        });
                                    }
                                }, true );
                            }
                        });
                    }
                });
            }
        });
    });
});