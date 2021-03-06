//Grunt has concat, jsHint, uglify, css tasks that places the output files into the production folder. We created
//this in the beginning thinking we would use it but we got too lazy. For the legacy team, you can refactor the src and
//destination paths below to make everything into one file in the production folder if y'all wish.


module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint', 'concat', 'uglify', 'cssmin'
  ]);


  // grunt.registerTask('server-dev', function (target) {
  //   // Running nodejs in a different process and displaying output on the main console
  //   var nodemon = grunt.util.spawn({
  //        cmd: 'grunt',
  //        grunt: true,
  //        args: 'nodemon'
  //   });
  //   nodemon.stdout.pipe(process.stdout);
  //   nodemon.stderr.pipe(process.stderr);
  //   grunt.task.run([ 'watch' ]);
  // });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
       dist: {
        src: [
            'Client/Controller/*.js'  //Client/Controller
        ],
        dest: 'Client/production/production.js'
      }
    },

    uglify: {
      build: {
        src: 'Client/production/production.js',
        dest: 'Client/production/production.min.js'
      }
    },

    jshint: {
      files: [  //CHANGE ACCORDING TO ADDTIONAL FOLDERS FOR JS!!!!!!!!!!!!!!!!
        'Client/Controller/*.js'
      ],
      options: {
        force: 'true',
        reporterOutput: '',
        jshintrc: '.jshintrc',
        ignores: [
          'Client/production/*.js'
        ]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'Client',
          src: ['*.css', '!*.min.css'],
          dest: 'Client/production/',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          'Client/Controller/*.js',
        ],
        tasks: [
          'jshint',
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'Client/*.css',
        tasks: ['cssmin']
      }
    }
  });
};
