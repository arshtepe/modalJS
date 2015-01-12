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
                    './dist/modal.js': ['src/modal.js']
                }
            }
        },

        uglify: {
            build:{
                files: {
                    'dist/modal.min.js': ['dist/modal.js']
                }
            }
        }
    });



    grunt.loadNpmTasks('grunt-monic');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['monic', 'uglify']);
};