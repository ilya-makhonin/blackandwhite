'use strict';

const gulp = require('gulp'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('gulp-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

const path = {
    build: {
        html: './dist/',
        js: './dist/js/',
        es: './src/js/script/',
        json: './dist/',
        css: './dist/css/',
        img: './dist/img/',
        fonts: './dist/fonts/',
        packages: './dist/packages/'
    },
    src: {
        html: './src/*.html',
        js: './src/js/main.js',
        es: './src/es2015/**/*js',
        json: './src/**/*.json',
        style: './src/styles/main.scss',
        img: './src/img/**/*.*',
        fonts: './src/fonts/**/*.*',
        packages: './src/packages/**/*.*'
    },
    watch: {
        html: './src/**/*.html',
        js: './src/js/**/*.js',
        es: './src/es2015/**/*js',
        json: './src/**/*.json',
        style: './src/styles/**/*.scss',
        img: './src/img/**/*.*',
        fonts: './src/fonts/**/*.*',
        packages: './src/packages/**/*.*'
    },
    clean: './dist'
};

const config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('es:build', function () {
    gulp.src(path.src.es)
        .pipe(babel())
        .pipe(gulp.dest(path.build.es));
});

gulp.task('json:build', function () {
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('packages:transference', function () {
    gulp.src(path.src.packages)
        .pipe(gulp.dest(path.build.packages));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'json:build',
    'style:build',
    'fonts:build',
    'image:build',
    'packages:transference'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.es], function(event, cb) {
        gulp.start('es:build');
    });
    watch([path.watch.json], function (event, cb) {
        gulp.start('json:build')
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.packages], function (event, cb) {
        gulp.start('packages:transference');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('autocompile', ['build', 'watch']);

gulp.task('default', ['build', 'webserver', 'watch']);