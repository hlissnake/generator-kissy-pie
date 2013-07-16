/**
 * 针对 初始化 任务的文件以及内容检查
 */

'use strict';
var Grunt = require( './helper/grunt' );
var fs = require('fs-extra');
var path = require('path');
var BuildMock = require( './helper/build_mocks' );
var helpers = require('abc-generator').test;


describe('ABC - KISSY-PIE generator build', function () {

    var KISSYPie;
    var TestTargetDir = path.join(__dirname, 'build_test' );

    beforeEach(function( done ){
        helpers.testDirectory( TestTargetDir, function (err) {
            if (err) {
                done(err);
            }
            KISSYPie = helpers.createGenerator('kissy-pie:app', [
                '../../app'
            ]);

            done();
        });
    });

    it('基本build：page/common[html/js]', function (done) {

        helpers.mockPrompt( KISSYPie, {
            projectName: "my_project",
            author: 'neekey',
            email: 'ni184775761@gmail.com',
            styleEngine: 'less'
        });

        KISSYPie.run({}, function () {

            BuildMock.mocks( TestTargetDir, [ 'common' ], function( err ){
                if( err ){
                    done( err );
                }
                else {
                    // build page
                    Grunt.exec( TestTargetDir, [ 'page' ], function( err ){

                        if( err ){
                            done( err );
                        }
                        else {

                            // build common
                            Grunt.exec( TestTargetDir, [ 'common' ], function( err ){

                                // 检查文件
                                helpers.assertFiles([
                                    'home/1.0',
                                    // page: KMC
                                    'home/20130712/page/init.js',
                                    // page: uglify
                                    'home/20130712/page/init-min.js',
                                    // page: ktpl
                                    'home/1.0/page/mods/overlay-tpl.js',
                                    // common: uglify
                                    'common/package-config-min.js',
                                    // common: root kmc & uglify
                                    'common/out-min.js',
                                    // common: subdir kmc & uglify
                                    'common/tooltip/in-min.js',
                                    // common: ktpl
                                    'common/mods/popup-tpl.js',
                                    // utils: ktpl
                                    'utils/utils-tpl.js'
                                ]);

                                done();
                            });
                        }
                    }, true );
                }
            });
        });
    });

    it('使用CSS-Combo：page/common', function (done) {

        helpers.mockPrompt( KISSYPie, {
            projectName: "my_project",
            author: 'neekey',
            email: 'ni184775761@gmail.com',
            styleEngine: 'css'
        });

        KISSYPie.run({}, function () {

            BuildMock.mocks( TestTargetDir, [ 'css_combo' ], function( err ){
                if( err ){
                    done( err );
                }
                else {
                    // build page
                    Grunt.exec( TestTargetDir, [ 'page' ], function( err ){

                        if( err ){
                            done( err );
                        }
                        else {

                            // build common
                            Grunt.exec( TestTargetDir, [ 'common' ], function( err ){

                                // 检查文件
                                helpers.assertFiles([
                                    'home/1.0',
                                    [ 'home/20130712/page/index.css', /\.page_mod/ ],
                                    [ 'home/20130712/page/index.css', /\.utils_mod/ ],
                                    'home/20130712/page/index-min.css',
                                    [ 'common/out-min.css', /\.common-mod/ ],
                                    [ 'common/out-min.css', /\.utils_mod/ ],
                                    [ 'common/out-min.css', /\.common-out/ ],
                                    [ 'common/sub/in-min.css', /\.common-mod/ ],
                                    [ 'common/sub/in-min.css', /\.utils_mod/ ],
                                    [ 'common/sub/in-min.css', /\.common-in/ ]
                                    // 测试文件不存在
//                                                '!common/mods/_common_mod-min.css'
                                ]);

                                done();
                            });
                        }
                    }, true );
                }
            });
        });
    });

    it( '使用LESS：page/common', function (done) {

        helpers.mockPrompt( KISSYPie, {
            projectName: "my_project",
            author: 'neekey',
            email: 'ni184775761@gmail.com',
            styleEngine: 'less'
        });

        KISSYPie.run({}, function () {

            BuildMock.mocks( TestTargetDir, [ 'less' ], function( err ){
                if( err ){
                    done( err );
                }
                else {
                    // build page
                    Grunt.exec( TestTargetDir, [ 'page' ], function( err ){

                        if( err ){
                            done( err );
                        }
                        else {

                            // build common
                            Grunt.exec( TestTargetDir, [ 'common' ], function( err ){

                                // 检查文件
                                helpers.assertFiles([
                                    'home/1.0',
                                    [ 'home/20130712/page/index.css', /\.page_mod/ ],
                                    [ 'home/20130712/page/index.css', /\.utils_mod/ ],
                                    'home/20130712/page/index-min.css',
                                    [ 'common/out.css', /\.common-mod/ ],
                                    [ 'common/out.css', /\.utils_mod/ ],
                                    [ 'common/out.css', /\.common-out/ ],
                                    'common/out-min.css',
                                    [ 'common/sub/in.css', /\.common-mod/ ],
                                    [ 'common/sub/in.css', /\.utils_mod/ ],
                                    [ 'common/sub/in.css', /\.common-in/ ],
                                    'common/sub/in-min.css'
                                    // 测试文件不存在
//                                                '!common/mods/_common_mod-min.css'
                                ]);

                                done();
                            });
                        }
                    }, true );
                }
            });
        });
    });

    /**
     * 由于使用了ruby，因此可能不方便测试
     */
    it('使用SASS：page/common', function (done) {

        helpers.mockPrompt( KISSYPie, {
            projectName: "my_project",
            author: 'neekey',
            email: 'ni184775761@gmail.com',
            styleEngine: 'sass'
        });

        KISSYPie.run({}, function () {

            BuildMock.mocks( TestTargetDir, [ 'sass' ], function( err ){
                if( err ){
                    done( err );
                }
                else {
                    // build page
                    Grunt.exec( TestTargetDir, [ 'page' ], function( err ){

                        if( err ){
                            done( err );
                        }
                        else {

                            // build common
                            Grunt.exec( TestTargetDir, [ 'common' ], function( err ){

                                // 检查文件
                                helpers.assertFiles([
                                    'home/1.0',
//                                                'home/1.0/page/images/i-*.png',
                                    'home/20130712/page/index.css',
                                    'home/20130712/page/index-min.css',
                                    'common/common.css',
                                    'common/common-min.css',
                                    'common/sub/in.css',
                                    'common/sub/in-min.css'
//                                                '!common/mods/_sprites.css',
//                                                '!common/images/i-*.png'
                                ]);

                                done();
                            });
                        }
                    }, true );
                }
            });
        });
    });
});