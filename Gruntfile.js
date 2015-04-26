module.exports = function(grunt) {  
  var filesForStaticAnalysis = [ 'src/**/*.js' ];

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: filesForStaticAnalysis,
      options: {
        jshintrc: true
      }
    },
    maxlines : {
      options : {
        limit: 100
      },
      files: filesForStaticAnalysis
    }
  };

  grunt.initConfig(config);
  require('jit-grunt')(grunt);

  grunt.registerTask('test', ['jshint','maxlines']);
  grunt.registerTask('default', ['clear', 'test']);
};