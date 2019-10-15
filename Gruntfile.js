/* eslint-env node */
/* eslint-disable no-process-env, camelcase */

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      options: {},
      files: ['src/**/*.js', 'test/**/*.js']
    },
    clean: ['lib', 'dist'],
    exec: {
      rollup: {
        command: 'rollup -c'
      },
      test: {
        command: 'yarn run test'
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
        preserveComments: 'some'
      },
      dist: {
        files: [
          {
            cwd: 'dist/',
            expand: true,
            src: ['*.js', '!*.min.js'],
            dest: 'dist/',
            rename: function(dest, src) {
              return dest + src.replace(/\.js$/, '.min.js')
            }
          }
        ]
      }
    },
    babel: {
      cjs: {
        files: [
          {
            cwd: 'src/',
            expand: true,
            src: '**/*.js',
            dest: 'lib/'
          }
        ]
      }
    },
    watch: {
      scripts: {
        options: {
          atBegin: true
        },

        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: ['eslint', 'exec:test']
      }
    },
    coveralls: {
      options: {
        force: false
      },

      coverage: {
        src: 'coverage/lcov.info'
      }
    },
    eslint: {
      target: ['src/**/*.js']
    },
    copy: {
      main: {
        files: [
          {
            expand: false,
            src: ['dist/neaps-tides.js'],
            dest: 'examples/browser/src/',
            filter: 'isFile'
          }
        ]
      }
    }
  })
  this.registerTask(
    'build',
    'Builds a distributable version of the current project',
    ['clean', 'eslint', 'exec:test', 'babel', 'exec:rollup', 'copy']
  )
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-exec')
  grunt.loadNpmTasks('grunt-coveralls')
}
