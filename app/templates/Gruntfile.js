module.exports = function (grunt) {
    var path = require('path');

    var from = grunt.option('from');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        pageName: grunt.option('page') || 'home',
        version: grunt.option('ver') || '2.0',
        timestamp: grunt.option('ts') || '20121212',
        packgeName: grunt.option('pkgName') || 'page',
        pageBase: '<%%= pageName %>/<%%= version %>/<%%= packgeName %>',
        commonBase: 'common',
        pageBuildBase: '<%%= pageName %>/<%%= timestamp %>/<%%= packgeName %>',

        clean: {
            page: {
                src: '<%%= pageName %>/<%%=timestamp %>/'
            },
            common: {
                src: '<%%= commonBase %>/*.combo.js'
            }
        },

        kmc: {
            options: {
                packages: [
                    {
                        name: '<%%= pkgName %>',
                        path: '<%%= pageBase %>'
                    },
                    {
                        name: 'utils',
                        path: './utils'
                    },
                    {
                        name: 'common',
                        path: './common'
                    }
                ]
            },

            page: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= pageBase %>',
                        src: '*.js',
                        dest: '<%%= pageName%>/<%%=timestamp %>/page/'
                    }
                ]
            },

            common: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= commonBase %>',
                        src: '*.js',
                        ext: '.combo.js',
                        dest: '<%%= commonBase %>'
                    }
                ]
            }
        },

        ktpl: {
            page: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= pageBase %>',
                        dest: '<%%= pageBase %>',
                        src: '**/*-tpl.html',
                        ext: '.js'
                    }
                ]
            },

            utils: {
                files: [
                    {
                        expand: true,
                        cwd: 'utils',
                        dest: 'utils',
                        src: '**/*-tpl.html',
                        ext: '.js'
                    }
                ]
            }
        },


<% if(styleEngine === 'less') { %>
        less: {
            options: {
                paths: ['.', '<%%= pageBase %>']
            },

            page: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= pageBase %>',
                        src: '*.less',
                        dest: '<%%= pageBuildBase %>',
                        ext: '.css'
                    }
                ]
            },

            common: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= commonBase %>',
                        src: '*.less',
                        dest: '<%%= commonBase %>',
                        ext: '.css'
                    }
                ]
            }
        },
<% } %>

<% if(styleEngine === 'sass') { %>
        compass: {
            options: {
//                basePath: '', //Defaults to the same path as your Gruntfile.
                sassDir: '<%%= pageBase %>',
                cssDir: '<%%= pageBuildBase %>',
                imagesDir: '<%%= pageBase %>/images',
                outputStyle: 'nested',
                noLineComments: true,
//                generatedImagesDir: '<%%= pageBase %>/images',
                importPath: [ './' ]
            },

            page: {

            }
        },
<% } %>
        uglify: {
            options: {
                banner: '/*! <%%= pkg.name %> <%%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            page: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= pageBuildBase %>',
                        src: ['*.js', '!*-min.js'],
                        dest: '<%%= pageBuildBase %>',
                        ext: '-min.js'
                    }
                ]
            },

            common: {
                files: [
                    {
                        expand: 'true',
                        cwd: '<%%= commonBase %>',
                        src: '*.combo.js',
                        dest: '<%%= commonBase %>',
                        ext: '-min.js'
                    }
                ]
            }
        },

        cssmin: {
            page: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= pageBuildBase %>',
                        src: ['*.css', '!*-min.css'],
                        dest: '<%%= pageBuildBase %>',
                        ext: '-min.css'
                    }
                ]
            }
        },

        watch2: {
            page: {
            files: ['<%%= pageBase %>/**/*', '!**/*-tpl.js'],
            tasks: ['page']
            },
        common: {
            files: 'common/**/* %>',
            tasks: ['common']
            }
        },

        watch: {
<% if(enableLess) { %>
            'less': {
                files: [ '<%%= pageBase %>/**/*.less' ],
                tasks: 'less'
            },
<% } %>
<% if(enableSass) { %>
            'compass': {
                files: [ '<%%= pageBase %>/**/*.scss' ],
                tasks: 'compass'
            }
<% } %>
        }

    });


<% if(enableLess) {%>
   grunt.loadNpmTasks('grunt-contrib-less');
<% } %>
<% if(enableCSSCombo) {%>
    grunt.loadNpmTasks('grunt-css-combo');
<% } %>
<% if(enableSass) {%>
    grunt.loadNpmTasks('grunt-contrib-compass');
<% } %>
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-kissy-template');
    grunt.loadNpmTasks('grunt-kmc');

    // Task
    grunt.registerTask('default', ['ktpl:utils', 'page']);
    grunt.registerTask('page', ['clean:page', 'ktpl:page', 'kmc:page', 'uglify:page', <% if(enableLess) { %>'less:page',<% } %> <% if(enableSass) { %>'compass',<% } %>  'cssmin:page']);
    grunt.registerTask('buildCommon', ['ktpl:common', 'kmc:common', 'uglify:common', 'less:common', 'cssmin:common']);

};
