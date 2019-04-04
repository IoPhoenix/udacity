const gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    browserSync = require('browser-sync').create();


function style() {
    return gulp
        .src('./styles.scss')
        // chain multiple tasks together using the pipe() method:
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest('./temp/styles'))
        .pipe(browserSync.stream());
}

function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        // tell browserSync to use this directory and serve it as a mini-server:
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./styles.scss', style);
    gulp.watch('./index.html').on('change', reload);
}

// set default task that can be run in the console by typing just 'gulp':
gulp.task('default', watch);