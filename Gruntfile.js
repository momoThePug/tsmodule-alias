module.exports = function(grunt) {
  grunt.initConfig({
    bump: {
      options: {
        files: ["package.json"],
        updateConfigs: [],
        commit: true,
        commitMessage: "Release v%VERSION%",
        commitFiles: ["package.json"],
        createTag: true,
        tagName: "%VERSION%",
        tagMessage: "Version %VERSION%",
        push: true,
        pushTo: "upstream",
        gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d",
        globalReplace: false,
        prereleaseName: false,
        metadata: "",
        regExp: false
      }
    },
    clean: {
      build: ["dist", "src/**/*.js"],
      postbuild: ["src/**/*.js"]
    },
    exec: {
      build: {
        command: 'tsc -p "./"'
      },
      test: {
        command: "npm run test"
      }
    },
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "src",
            src: ["**/*", "!**/*.ts", "!**/test", "!**/*.map"],
            dest: "dist"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-bump");
  grunt.registerTask("build", "Compiles node code", [
    "clean:build",
    "exec:build",
    "copy:build",
    "clean:postbuild"
  ]);
  grunt.registerTask("test", "test source code", ["exec:test"]);
  grunt.registerTask("default", "My default task", ["build"]);
};
