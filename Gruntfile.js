module.exports = function (grunt) {
	require("time-grunt")(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		opt: {
			"client": {
				"tsMain": "src/main/typescript",
				"tsMainLib": "src/main/typescript/libs",
				"tsTest": "src/test/typescript",
				"tsTestLib": "src/test/typescript/libs",
				"tsTestResource": "src/test/resources/typescript",
				"scss": "src/main/scss",
				"jsLib": "src/main/webapp/scripts/libs",

				"outBase": "src/main/webapp",
				"jsMainOut": "src/main/webapp/scripts",
				"jsTestOut": "src/test/typescript",
				"jsEspowerOut": "src/test/typescriptEspowered",
				"cssOut": "src/main/webapp/css",
				"imageOut": "src/main/webapp/images"
			}
		},

		ts: {
			options: {
				compile: true,                 // perform compilation. [true (default) | false]
				comments: false,               // same as !removeComments. [true | false (default)]
				target: 'es5',                 // target javascript language. [es3 (default) | es5]
				module: 'commonjs',            // target javascript module style. [amd (default) | commonjs]
				noImplicitAny: true,
				sourceMap: false,              // generate a source map for every output js file. [true (default) | false]
				sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
				mapRoot: '',                   // where to locate .map.js files. [(default) '' == generated js location.]
				declaration: false             // generate a declaration .d.ts file for every output js file. [true | false (default)]
			},
			clientMain: {
				src: ['<%= opt.client.tsMain %>/Ignite.ts'],
				out: '<%= opt.client.jsMainOut %>/Ignite.js'
			},
			clientTest: {
				src: ['<%= opt.client.tsTest %>/IgniteSpec.ts'],
				out: '<%= opt.client.jsTestOut %>/IgniteSpec.js'
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: '<%= opt.client.scss %>',
					cssDir: '<%= opt.client.cssOut %>',
					imagesDir: '<%= opt.client.imageOut %>',
					javascriptsDir: '<%= opt.client.jsMainOut %>',
					noLineComments: false,
					debugInfo: true,
					relativeAssets: true
				}
			},
			prod: {
				options: {
					environment: 'production',
					sassDir: '<%= opt.client.scss %>',
					cssDir: '<%= opt.client.cssOut %>',
					imagesDir: '<%= opt.client.imageOut %>',
					javascriptsDir: '<%= opt.client.jsMainOut %>',
					noLineComments: true,
					debugInfo: false,
					relativeAssets: true
				}
			}
		},
		tslint: {
			options: {
				formatter: "prose",
				configuration: grunt.file.readJSON("tslint.json")
			},
			files: {
				src: [
					'<%= opt.client.tsMain %>/**/*.ts',
					'<%= opt.client.tsTest %>/**/*.ts'
				],
				filter: function (filepath) {
					var mainClientLib = grunt.config.get("opt.client.tsMainLib") + "/";
					return filepath.indexOf(mainClientLib) === -1;
				}
			}
		},
		typedoc: {
			main: {
				options: {
					// module: "<%= ts.options.module %>",
					out: './docs',
					name: '<%= pkg.name %>',
					target: '<%= ts.options.target %>'
				},
				src: [
					'<%= opt.client.tsMain %>/**/*'
				]
			}
		},
		espower: {
			client: {
				files: [
					{
						expand: true,				// Enable dynamic expansion.
						cwd: '<%= opt.client.jsTestOut %>/',				// Src matches are relative to this path.
						src: ['**/*.js'],		// Actual pattern(s) to match.
						dest: '<%= opt.client.jsEspowerOut %>/',	// Destination path prefix.
						ext: '.js'					 // Dest filepaths will have this extension.
					}
				]
			}
		},
  		watch: {
			"typescript-main": {
				files: ['<%= opt.client.tsMain %>/**/*.ts'],
				tasks: ['typescript:main']
			},
			"typescript-test": {
				files: [ '<%= opt.client.tsTest %>/**/*.ts'],
				tasks: ['typescript']
			},
			compass: {
				files: ['<%= opt.client.scss %>/**/*.scss'],
				tasks: ['compass:dev']
			},
			// mvn appengine:devserver と組み合わせた時用
			devserver: {
				files: ['<%= opt.client.outBase %>/**/*'],
				// tasks: ['devserver'] // なぜかtypescript周りがエラー出すので
				tasks: ['compass:dev', 'copy:devserver']
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
		tsd: {
			client: {
				options: {
					// execute a command
					command: 'reinstall',

					//optional: always get from HEAD
					latest: false,

					// optional: specify config file
					config: './tsd.json'
				}
			}
		},
		copy: {
			bower: {
				files: [
					{expand: true, flatten: true, cwd: 'bower-task/', src: ['main-js/**/*.js'], dest: '<%= opt.client.jsLib %>/'},
					{expand: true, flatten: true, cwd: 'bower-task/', src: ['main-css/**/*.css'], dest: '<%= opt.client.cssOut %>/'},

					{expand: true, flatten: true, cwd: 'bower-task/', src: ['test-js/**/*.js'], dest: '<%= opt.client.tsTestLib %>/'},
					{expand: true, flatten: true, cwd: 'bower-task/', src: ['test-css/**/*.css'], dest: '<%= opt.client.tsTestLib %>/'}
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
					'<%= opt.client.jsMainOut %>/*.js',
					'<%= opt.client.jsMainOut %>/*.d.ts',
					'<%= opt.client.jsMainOut %>/*.js.map',
					'<%= opt.client.jsMainOut %>/service',
					'<%= opt.client.jsMainOut %>/controller',
					// client test
					'<%= opt.client.jsTestOut %>/*.js',
					'<%= opt.client.jsTestOut %>/*.js.map',
					'<%= opt.client.jsTestOut %>/*.d.ts',
					'<%= opt.client.jsEspowerOut %>/'
				]
			},
			tsd: {
				src: [
					// tsd installed
					'<%= opt.client.tsMainLib %>/typings'
				]
			},
			bower: {
				src: [
					// bower installed
					'<%= opt.client.jsLib %>',
					'bower_components',
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
			devserver: {
				cmd: function () {
					return "./node_modules/.bin/http-server src/main/webapp";
				}
			}
		}
	});

	grunt.registerTask(
		'setup',
		"プロジェクトの初期セットアップを行う。",
		['clean', 'bower', 'tsd', 'copy:bower']);

	grunt.registerTask(
		'default',
		"必要なコンパイルを行い画面表示できるようにする。",
		['clean:clientCss', 'clean:clientScript', 'ts:clientMain', 'tslint', 'compass:dev']);

	grunt.registerTask(
		'devserver',
		"ローカルサーバを起動する",
		['default', 'exec:devserver']);

	grunt.registerTask(
		'test',
		"必要なコンパイルを行いkarma(旧testacular)でテストを実行する。",
		['clean:clientScript', 'ts:clientTest', 'tslint', 'espower', 'karma']);
	grunt.registerTask(
		'test-browser',
		"必要なコンパイルを行いブラウザ上でテストを実行する。",
		['clean:clientScript', 'ts', 'tslint', 'open:test-browser']);

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
