module.exports = function (grunt) {
	require("time-grunt")(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		opt: {
			client: {
				tsMain: "scripts",
				tsTest: "test",
				less: "less",

				jsMainOut: "scripts",
				jsTestOut: "test",
				jsEspowerOut: "testEspowered",
				cssOut: "stylesheets",
				imageOut: "images"
			}
		},

		ts: {
			options: {
				compile: true,                 // perform compilation. [true (default) | false]
				comments: false,               // same as !removeComments. [true | false (default)]
				target: 'es5',                 // target javascript language. [es3 (default) | es5]
				module: 'commonjs',            // target javascript module style. [amd (default) | commonjs]
				noImplicitAny: true,
				sourceMap: true,              // generate a source map for every output js file. [true (default) | false]
				sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
				mapRoot: '',                   // where to locate .map.js files. [(default) '' == generated js location.]
				declaration: false             // generate a declaration .d.ts file for every output js file. [true | false (default)]
			},
			clientMain: {
				src: ['<%= opt.client.tsMain %>/Ignite.ts']
			},
			clientTest: {
				src: ['<%= opt.client.tsTest %>/IgniteSpec.ts']
			}
		},
		less: {
			main: {
				options: {
					sourceMapBasepath: "<%= opt.client.less %>",
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapRootpath: "../<%= opt.client.less %>"
				},
				files: {
					"<%= opt.client.cssOut %>/main.css": "<%= opt.client.less %>/source.less"
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
				]
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
					'<%= opt.client.tsMain %>/**/*.ts'
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
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				}
			},
			main: {
				src: 'scripts/Ignite.js',
				dest: 'scripts/build.js'
			},
			test: {
				src: 'test/IgniteSpec.js',
				dest: 'test/buildSpec.js'
			}
		},
		dtsm: {
			client: {
				options: {
					// optional: specify config file
					confog: './dtsm.json'
				}
			}
		},
		clean: {
			clientCss: {
				src: [
					'<%= opt.client.cssOut %>/**/*.css'
				]
			},
			clientScript: {
				src: [
					// client
					'<%= opt.client.jsMainOut %>/**/*.js',
					'<%= opt.client.jsMainOut %>/**/*.d.ts',
					'<%= opt.client.jsMainOut %>/**/*.js.map',
					// client test
					'<%= opt.client.jsTestOut %>/**/*.js',
					'<%= opt.client.jsTestOut %>/**/*.js.map',
					'<%= opt.client.jsTestOut %>/**/*.d.ts',
					'<%= opt.client.jsEspowerOut %>/'
				]
			},
			dtsm: {
				src: [
					// dtsm installed
					'typings'
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
				path: 'test/SpecRunner.html'
			}
		},
		connect: {
			dev: {
				options: {
					port: 9000,
					base: "./",
					keepalive: true
				}
			}
		}
	});

	grunt.registerTask('setup', ['clean', 'dtsm']);
	grunt.registerTask('default', ['clean:clientCss', 'clean:clientScript', 'ts:clientMain', 'tslint','browserify:main', 'less']);
	grunt.registerTask('test', ['clean:clientScript', 'ts:clientTest', 'tslint','browserify:test', 'espower', 'karma']);
	grunt.registerTask('docs', ['typedoc']);
	grunt.registerTask('serve', ['connect:dev']);

	require('load-grunt-tasks')(grunt);
};
