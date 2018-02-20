
module.exports = function(grunt) {
    
      grunt.initConfig({
          clean: {
              build: ['./dist', './src/**/*.js']
          },
          exec:{
              build:{
                  command: 'tsc -p \"./\"'
              },
              test:{
                  command:'npm run test'
              }
          },
          copy:{
              build:{
                  files: [
                      {expand: true,  cwd: './src', src: ['**/*'
                          ,'!**/*.ts'
                          ,'!**/test'
                          ,'!**/*.map'], 
                          dest: './dist'}
                  ]
              }
          }
      });
      
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-exec');
      grunt.loadNpmTasks('grunt-contrib-clean');
      
      grunt.registerTask('build', 'Compiles node code',['clean:build', 'exec:build', 'copy:build']);
      grunt.registerTask('test', 'test source code',[ 'exec:test' ]);
      grunt.registerTask('default','My default task',['build']);
    };   