/* eslint-env node */
/* eslint-disable no-process-env, camelcase */

export default (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      options: {},
      files: ['src/**/*.js', 'test/**/*.js']
    },
    clean: ['lib', 'dist'],
    exec: {
      rollup: {
        command: 'BABEL_ENV=build rollup -c'
      },
      test: {
        command: 'npm run test'
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
            rename: function (dest, src) {
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
            src: ['**/*.js', '!**/__tests__/**', '!**/__mocks__/**'],
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
    eslint: {
      target: ['src/**/*.js']
    }
  })
  this.registerTask(
    'build',
    'Builds a distributable version of the current project',
    ['clean', 'eslint', 'exec:test', 'babel', 'exec:rollup', 'uglify']
  )
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-exec')
}
