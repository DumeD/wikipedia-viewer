// ///////////////////////////////////////
// packages
// ///////////////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cassnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence');

// ///////////////////////////////////////
// Sass task
// ///////////////////////////////////////

gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
             .pipe(sass({
               includePaths: ['app/components/breakpoint-sass/stylesheets']
             }))
             .pipe(gulp.dest('src/css'))
             .pipe(browserSync.reload({
               stream: true
             }));
});

// ///////////////////////////////////////
// Clean tasks
// ///////////////////////////////////////
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback);
});

// ///////////////////////////////////////
// image-min task
// ///////////////////////////////////////

gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|gif|svg)')
             .pipe(cache(imagemin({
               interlaced: true
             })))
             .pipe(gulp.dest('dist/images'));
});

// ///////////////////////////////////////
// font task
// ///////////////////////////////////////

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
             .pipe(gulp.dest('dist/fonts'));
});

// ///////////////////////////////////////
// browserSync task
// ///////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
});

// ///////////////////////////////////////
// minify task
// ///////////////////////////////////////

gulp.task('useref', function() {
  return gulp.src('src/*.html')
             .pipe(useref())
             .pipe(gulpIf('*.js', uglify()))
             .pipe(gulpIf('*.css', cssnano()))
             .pipe(gulp.dest('dist'));
});

// ///////////////////////////////////////
// Build task
// ///////////////////////////////////////

gulp.task('build', function(callback) {
  runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts'], callback);
});

// ///////////////////////////////////////
// watch task
// ///////////////////////////////////////

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/*.js', browserSync.reload);
});

// ///////////////////////////////////////
// Default task
// ///////////////////////////////////////

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'], callback);
});
