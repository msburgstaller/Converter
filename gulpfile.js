/**
 *
 *
 * @file:
 * @author: Severin Burgstaller
 */

var gulp = require('gulp');

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