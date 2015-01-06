module.exports = function (grunt) {
    grunt.initConfig({
        monic: {
            compile: {
                options: {
                    flags: {
                        ie: true
                    }
                },

                files: {
                    './build/modal.js': ['src/modal.js']
                }
            }
        },

        uglify: {
            build:{
                files: {
                    'build/modal.min.js': ['build/modal.js']
                }
            }
        }
    });



    grunt.loadNpmTasks('grunt-monic');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['monic', 'uglify']);
};