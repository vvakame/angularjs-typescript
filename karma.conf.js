// Testacular configuration
// Generated on Wed Jan 23 2013 13:03:48 GMT+0900 (JST)


// base path, that will be used to resolve files and exclude
basePath = './';


// list of files / patterns to load in the browser
files = [
	JASMINE,
	JASMINE_ADAPTER,
	'http://www.google.com/jsapi',
	'src/main/webapp/scripts/**/*.js',
	'src/test/typescript/testdata.js',
	'src/test/typescript/libs/*.js',
	'src/test/typescript/*.js'
];


// list of files to exclude
exclude = [
	'src/main/webapp/scripts/main.min.js',
	'src/test/typescript/libs/jasmine*.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress', 'junit'];


// web server port
port = 8080;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome', 'PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
