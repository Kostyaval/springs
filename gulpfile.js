'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    cleanCSS = require('gulp-clean-css'),
    cssbeautify = require('gulp-cssbeautify'),
    runSequence = require('run-sequence'),
    // merge = require('merge-stream'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    minify = require('gulp-minify'),
    gulp_remove_logging = require("gulp-remove-logging"),
    browserSync = require('browser-sync').create(),
    purify = require('gulp-purifycss');


var path = {
    build: {
        html: './build/',
        scripts: './build/scripts/',
        styles: './build/styles/',
        images: './build/images/',
        fonts: './build/fonts/'
    },

    src: {
        html: './src/*.html',
        scripts: './src/scripts/*.js',
        mainScripts: './src/scripts/main.js',
        styles: './src/styles/main.sass',
        images: './src/images/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        scripts: 'src/scripts/**/*.js',
        styles: 'src/styles/**/*.sass',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    host: 'localhost',
    browser: 'google chrome',
    port: 7000,
    files: [ './build/**/*.*' ]

};


gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
});
gulp.task('directories', function () {
    return gulp.src('./src/catalog/*.html')
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest('./build/catalog'))
});

gulp.task('js:build', function () {
    return gulp.src(path.src.scripts)
        .pipe(plumber())
        .pipe(rigger())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(rigger())
        // .pipe(
        //     gulp_remove_logging({
        //         // Options (optional)
        //         // eg:
        //         // namespace: ['console', 'window.console']
        //     })
        // )
        .pipe(uglify())
        .pipe(gulp.dest(path.build.scripts))
});
gulp.task('js:min', function () {
    return gulp.src(path.build.mainScripts)
        //
        .pipe(
            gulp_remove_logging()
        )
        .pipe(gulp.dest(path.build.scripts))
});

gulp.task('js', function () {
    return gulp.src(path.src.scripts)
        .pipe(plumber())
        .pipe(rigger())

        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.scripts))
});

gulp.task('css:build', function () {
    return gulp.src('./src/styles/*.css')
        .pipe(plumber())
        .pipe(autoprefixer('> 1%', 'last 5 versions', 'Firefox < 20', 'ie 8', 'ie 9'))
        .pipe(gulp.dest(path.build.styles))
});
gulp.task('css:build:cleare', function() {
  return gulp.src('./build/styles/main.css')
    .pipe(purify(['./build/**/*.js', './build/**/*.html']))
    .pipe(gulp.dest('./build/styles/min'));
});
gulp.task('sass:build', function () {
    return gulp.src(path.src.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(autoprefixer('> 1%', 'last 5 versions', 'Firefox < 20', 'ie 8', 'ie 9'))
        .pipe(gulp.dest(path.build.styles))
});

gulp.task('sass', function () {
    return gulp.src(path.src.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(autoprefixer('> 1%', 'last 5 versions', 'Firefox < 20', 'ie 8', 'ie 9'))
        .pipe(cssbeautify())
        .pipe(gulp.dest(path.build.styles))
});

gulp.task('image:build', function () {
    return gulp.src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.images))
});

gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});


gulp.task('dev', [
    'html:build',
    'directories',
    'js',
    'sass',
    'fonts:build',
    'image:build'
]);

gulp.task('build', [
    'html:build',
    'js:build',
    // 'css:build',
    'sass:build',
    'fonts:build',
    'image:build'
]);





gulp.task('watch', function () {
    gulp.watch("src/catalog/*.html", ['directories'])
    gulp.watch(path.watch.html, ['html:build'])
    gulp.watch("src/partials/*.html", ['html:build'])
    gulp.watch(path.watch.styles, ['sass'])
    gulp.watch("src/styles/components/*.sass", ['sass'])
    gulp.watch(path.watch.scripts, ['js'])
    gulp.watch(path.watch.images, ['image:build'])
    gulp.watch(path.watch.fonts, ['fonts:build'])
});

gulp.task('webserver', function () {
    browserSync.init(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});



gulp.task('go', function(callback) {
    runSequence(
        'clean',
        'dev',
        'watch',
        'webserver',
        callback
    );
});

gulp.task('prod', function(callback) {
    runSequence(
        'clean',
        'build',
        callback
    );
});
