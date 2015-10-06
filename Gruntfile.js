module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'http/assets/scss',
					src: ['main.scss'],
					dest: 'http/assets/css',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			combine: {
				files: {
					'http/assets/css/main.min.css': [
						'http/assets/css/normalize.min.css',
						'http/assets/css/main.css',
					]
				}
			}
		},
		uglify: {
			js: {
				files: {
					'http/assets/main.min.js': [
						'http/assets/js/lib/jquery-1.9.0.js',
						'http/assets/js/lib/screenfull.min.js',
						'http/assets/js/lib/js.cookie.js',
						'http/assets/js/*.js',
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
				files: 'http/assets/js/*.js',
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