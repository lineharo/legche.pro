/*jshint esversion: 6 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
const phpMinify = require('@aquafadas//gulp-php-minify');

var projPath = 'd:/os526/domains/legche.loc/';

gulp.task('pug', function () {
  gulp.src('web/index.pug')
  .pipe(pug({pretty: true}))
  .on('error', gutil.log)
  .pipe(gulp.dest(projPath));
});

gulp.task('stylus', function () {
  gulp.src('web/style.styl')
  .pipe(stylus({
    compress: false
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest(projPath));
});

gulp.task('compress', function () {
    gulp.src('web/js/script.js')
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest(projPath+'/js/'));
});

gulp.task('minify-php', () => gulp.src('web/**/*.php' , {read: false})
    .pipe(phpMinify({binary: 'd:\\os526\\modules\\php\\PHP-7.0-x64\\php.exe'}))
    .on('error', gutil.log)
    .pipe(gulp.dest(projPath))
);

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: projPath
    }
});
  gulp.watch(projPath + 'index.html').on('change', browserSync.reload);
  gulp.watch(projPath + 'style.css').on('change', browserSync.reload);
});

gulp.task('watch', function () {
  gulp.watch('web/**/*.pug', ['pug']);
  gulp.watch('web/js/*.js', ['compress']);
  gulp.watch('web/**/*.styl', ['stylus']);
  gulp.watch('web/**/*.php', ['minify-php']);
  gulp.watch('web/js/*.js',['compress']);
});

gulp.task('default', ['pug', 'stylus', 'compress','minify-php', 'watch', 'browser-sync']);
