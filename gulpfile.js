
var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var tap = require('gulp-tap');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var pkg = require('./package.json');
var yargs = require('yargs')
    .options({
        'w': {
            alias: 'watch',
            type: 'boolean'
        },
        's': {
            alias: 'server',
            type: 'boolean'
        },
        'p': {
            alias: 'port',
            type: 'number'
        }
    }).argv;

var option = {base: 'src'};
var dist = __dirname + '/dist';

gulp.task('build:assets', function (){
    gulp.src('src/images/**/*', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:js', function (){
    gulp.src('src/js/**/*', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:css', function (){
    gulp.src('src/css/lib/*', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
    gulp.src('src/css/*.css', option)
        .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1'])]))
        .pipe(nano({
            zindex: false,
            autoprefixer: false
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:html', function (){
    gulp.src('src/*.html', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
    gulp.src('src/view/**/*', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('release', ['build:html','build:js','build:css','build:assets']);

gulp.task('watch', ['release'], function () {
    gulp.watch('src/css/**/*', ['build:css']);
    gulp.watch('src/js/**/*.js', ['build:js']);
    gulp.watch('src/images/**/*', ['build:assets']);
    gulp.watch('src/**/*.html', ['build:html']);
    gulp.watch('src/*.html', ['build:html']);
});

gulp.task('server', function () {
    yargs.p = yargs.p || 8080;
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: yargs.p + 1,
            weinre: {
                port: yargs.p + 2
            }
        },
        port: yargs.p,
        startPath: '/'
    });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', ['release'], function () {
    if (yargs.s) {
        gulp.start('server');
    }

    if (yargs.w) {
        gulp.start('watch');
    }
});

