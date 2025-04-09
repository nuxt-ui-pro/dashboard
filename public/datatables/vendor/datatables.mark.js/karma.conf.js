/*!***************************************************
 * datatables.mark.js
 * https://github.com/julmot/datatables.mark.js
 * Copyright (c) 2016–2018, Julian Kühnel
 * Released under the MIT license https://git.io/voRZ7
 *****************************************************/
'use strict';
module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine-jquery', 'jasmine'],
    files: [
      'vendor/jquery/dist/jquery.min.js',
      'vendor/datatables.net/js/jquery.dataTables.min.js',
      'vendor/mark.js/dist/jquery.mark.min.js',
      'dist/!(*.es6|*.min).js',
      'test/specs/configuration.js',
      'test/specs/*.js', {
        pattern: 'test/fixtures/*.html',
        included: false,
        served: true
      }
    ],
    exclude: [],
    reporters: ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    failOnEmptyTestSuite: false,
    plugins: [
      'karma-jasmine',
      'karma-jasmine-jquery',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-coverage'
    ],
    browsers: ['PhantomJS'],
    captureTimeout: 30000,
    browserNoActivityTimeout: 60000, // 60 sec
    singleRun: true,
    preprocessors: {
      'dist/datatables.mark.js': ['coverage']
    },
    coverageReporter: {
      dir: 'build/coverage/',
      reporters: [{
        type: 'html'
      }, {
        type: 'text'
      }]
    }
  });
};
