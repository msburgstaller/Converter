/**
 *
 *
 * @file:
 * @author: Severin Burgstaller
 */

var gulp = require('gulp');
var serve = require('gulp-serve');

gulp.task('default', function ()
{
    // place code for your default task here
});

gulp.task('docs', [], function ()
{
    var gulpDocs = require('gulp-ngdocs');
    return gulp.src('www/js/*.js')
            .pipe(gulpDocs.process())
            .pipe(gulp.dest('./docs'));
});

//gulp.task('serve', serve('public'));
//gulp.task('serve-docs', serve(['public', 'build']));
gulp.task('serve-docs', serve({
    root: ['docs'],
    port: 8005
}));