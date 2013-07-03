module.exports = function (grunt) {
	grunt.initConfig({
		typescript: {
			main: { // --declarations --sourcemap --target ES5 --out client/scripts/main.js client/scripts/main.ts
				src: ['src/main/typescript/Ignite.ts'],
				dest: 'src/main/webapp/scripts/',
				options: {
					target: 'es5',
					base_path: 'src/main/typescript',
					sourcemap: false,
					declaration_file: false
				}
			},
			test: {
				src: ['src/test/typescript/IgniteSpec.ts'],
				dest: 'src/test/typescript/IgniteSpec.js',
				options: {
					target: 'es5',
					sourcemap: false,
					declaration_file: false
				}
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'src/main/scss',
					cssDir: 'src/main/webapp/css',
					imagesDir: 'src/main/webapp/images',
					javascriptsDir: 'src/main/webapp/scripts',
					noLineComments: false,
					debugInfo: true,
					relativeAssets: true
				}
			},
			prod: {
				options: {
					environment: 'production',
					sassDir: 'src/main/scss',
					cssDir: 'src/main/webapp/css',
					imagesDir: 'src/main/webapp/images',
					javascriptsDir: 'src/main/webapp/scripts',
					noLineComments: true,
					debugInfo: false,
					relativeAssets: true
				}
			}
		},
		watch: {
			"typescript-main": {
				files: ['src/main/typescript/**/*.ts'],
				tasks: ['typescript:main']
			},
			"typescript-test": {
				files: [ 'src/test/typescript/**/*.ts'],
				tasks: ['typescript']
			},
			compass: {
				files: ['src/main/scss/**/*.scss'],
				tasks: ['compass:dev']
			},
			// mvn appengine:devserver と組み合わせた時用
			devserver: {
				files: ['src/main/webapp/**/*'],
				// tasks: ['devserver'] // なぜかtypescript周りがエラー出すので
				tasks: ['compass:dev', 'copy:devserver']
			}
		},
		concat: {
			dist: {
				src: [
					'src/test/resources/typescript/testdata-header.js.template',
					'src/test/resources/typescript/data/*.js',
					'src/test/resources/typescript/testdata-footer.js.template'
				],
				dest: 'src/test/typescript/testdata.js'
			}
		},
		bower: {
			install: {
				options: {
					targetDir: 'bower-task',
					layout: 'byType', // exportsOverride の左辺に従って分類
					install: true,
					verbose: true, // ログの詳細を出すかどうか
					cleanTargetDir: true,
					cleanBowerDir: false
				}
			}
		},
		copy: {
			bower: {
				files: [
					{expand: true, flatten: true, cwd: 'bower-task/', src: ['main-js/**/*.js'], dest: 'src/main/webapp/scripts/libs/'},
					{expand: true, flatten: true, cwd: 'bower-task/', src: ['main-css/**/*.css'], dest: 'src/main/webapp/css/'},

					{expand: true, flatten: true, cwd: 'bower-task/', src: ['test-js/**/*.js'], dest: 'src/test/typescript/libs/'},
					{expand: true, flatten: true, cwd: 'bower-task/', src: ['test-css/**/*.css'], dest: 'src/test/typescript/libs/'}
				]
			},
			tsd: {
				files: [
					{expand: true, cwd: 'd.ts/DefinitelyTyped/', src: ['*/*.d.ts'], dest: 'src/main/typescript/libs/DefinitelyTyped/'},
					{expand: true, cwd: 'd.ts/DefinitelyTyped/', src: ['*/*.d.ts'], dest: 'src/test/typescript/libs/DefinitelyTyped/'}
				]
			}
		},
		uglify: {
			dev: {
				options: {
					report: 'min',
					// 変数名の圧縮類は作業コストが大きすぎるのでやらない
					beautify:true,
					mangle: false,
					preserveComments: 'some',

					sourceMap: 'src/main/webapp/scripts/source.js.map',
					sourceMapRoot: '',
					sourceMappingURL: 'source.js.map'
				},
				files: {
					'src/main/webapp/scripts/main.min.js': [
						'src/main/webapp/scripts/libs/*.js',
						'src/main/webapp/scripts/controller/*.js',
						'src/main/webapp/scripts/service/*.js',
						'src/main/webapp/scripts/*.js'
					]
				}
			},
			prod: {
				options: {
					report: 'gzip',
					// 変数名の圧縮類は作業コストが大きすぎるのでやらない
					mangle: false,
					preserveComments: 'some'
				},
				files: {
					'src/main/webapp/scripts/main.min.js': [
						'src/main/webapp/scripts/libs/jquery/jquery.js',
						'src/main/webapp/scripts/libs/angular/angular.js',
						'src/main/webapp/scripts/controller/*.js',
						'src/main/webapp/scripts/service/*.js',
						'src/main/webapp/scripts/*.js'
					]
				}
			}
		},
		replace: {
			sourceMap: {
				src: ['src/main/webapp/scripts/source.js.map'],
				overwrite: true,
				replacements: [
					{
						from: "src/main/webapp/scripts/",
						to: ""
					}
				]
			},
			adhocFix: {
				src: ['src/test/typescript/libs/DefinitelyTyped/angularjs/angular-mocks.d.ts'],
				overwrite: true,
				replacements: [
					{ // 本体コード側の定義と重複読み込みして困るので
						from: '/// <reference path="angular.d.ts" />',
						to: ""
					}
				]
			}
		},
		clean: {
			clientCss: {
				src: [
					'src/main/webapp/css/*.css'
				]
			},
			clientScript: {
				src: [
					// client
					'src/main/webapp/scripts/*.js',
					'src/main/webapp/scripts/*.d.ts',
					'src/main/webapp/scripts/*.js.map',
					'src/main/webapp/scripts/service',
					'src/main/webapp/scripts/controller',
					// client test
					'src/test/typescript/*.js',
					'src/test/typescript/*.js.map',
					'src/test/typescript/*.d.ts',
					// minified
					'src/main/webapp/scripts/main.min.js',
					'src/main/webapp/scripts/source.js.map'
				]
			},
			tsd: {
				src: [
					// tsd installed
					'src/main/typescript/libs/DefinitelyTyped',
					'd.ts'
				]
			},
			bower: {
				src: [
					// bower installed
					'src/main/webapp/scripts/libs',
					'components',
					'bower-task'
				]
			}
		},
		karma: {
			unit: {
				options: {
					configFile: 'karma.conf.js',
					autoWatch: false,
					browsers: ['PhantomJS'],
					reporters: ['progress', 'junit'],
					singleRun: true,
					keepalive: true
				}
			}
		},
		open: {
			"test-browser": {
				path: 'src/test/typescript/SpecRunner.html'
			}
		},
		exec: {
			tsd: {
				cmd: function () {
					return "tsd install jquery angular jasmine angular-mocks";
				}
			},
			devserver: {
				cmd: function () {
					return "./node_modules/http-server/bin/http-server src/main/webapp";
				}
			}
		}
	});

	grunt.registerTask(
		'setup',
		"プロジェクトの初期セットアップを行う。",
		['clean', 'bower', 'exec:tsd', 'copy', 'replace:adhocFix']);

	grunt.registerTask(
		'default',
		"必要なコンパイルを行い画面表示できるようにする。",
		['clean:clientCss', 'clean:clientScript', 'typescript:main', 'compass:dev', 'uglify:dev', 'replace:sourceMap']);

	grunt.registerTask(
		'devserver',
		"ローカルサーバを起動する",
		['default', 'exec:devserver']);

	grunt.registerTask(
		'prod',
		"デプロイ用の環境を整える",
		['clean:clientCss', 'clean:clientScript', 'typescript:main', 'compass:dev', 'uglify:prod']);

	grunt.registerTask(
		'test',
		"必要なコンパイルを行いkarma(旧testacular)でテストを実行する。",
		['clean:clientScript', 'concat', 'typescript:test', 'karma']);
	grunt.registerTask(
		'test-browser',
		"必要なコンパイルを行いブラウザ上でテストを実行する。",
		['clean:clientScript', 'concat', 'typescript', 'uglify:dev', 'open:test-browser']);

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
