module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'prototype/assets/scss',
					src: ['main.scss'],
					dest: 'prototype/assets/css',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			combine: {
				files: {
					'prototype/assets/css/main.min.css': [
						'prototype/assets/css/normalize.min.css',
						'prototype/assets/css/main.css',
					]
				}
			}
		},
		uglify: {
			js: {
				files: {
					'prototype/assets/main.min.js': [
						'prototype/assets/js/lib/jquery-1.9.0.js',
						'prototype/assets/js/lib/screenfull.min.js',
						'prototype/assets/js/lib/js.cookie.js',
						'prototype/assets/js/*.js',
					]
				}
			}
		},
		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin']
			},
			js: {
				files: 'prototype/assets/js/*.js',
				tasks: ['uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['watch']);
};