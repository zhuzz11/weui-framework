
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
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');//混淆js
var concat = require('gulp-concat');//合并
var htmlmin = require('gulp-htmlmin');
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
var src = __dirname + '/src';

gulp.task('build:assets', function (){
    gulp.src('src/images/**/*', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:js', function (){
    gulp.src('src/js/lib/*', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
    gulp.src(['src/js/app.js','src/js/**/*','!src/js/lib/*'], option)
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(concat("all.min.js"))
        .pipe(gulp.dest(dist + "/js/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:css', function (){
    gulp.src('src/css/lib/*', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
    gulp.src('src/css/*.less', option)
        .pipe(less().on('error', function (e){
            console.error(e.message);
            this.emit('end');
        }))
        .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1'])]))
        .pipe(nano({//生成环境打开
            zindex: false,
            autoprefixer: false
        }))
        .pipe(concat("all.min.css"))
        .pipe(gulp.dest(dist + "/css/"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:html', function (){
    gulp.src('src/*.html', option)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
    gulp.src('src/view/**/*', option)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(htmlmin())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('release', ['build:html','build:js','build:css','build:assets']);

gulp.task('watch', function () {
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
        startPath: '/index.html'
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


gulp.task('template:html', function (){
    gulp.src('src/*.html', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
    gulp.src('src/view/**/*', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream: true}));
});

//用于快速生成模板js、css、html文件,免得每次都得手动生成（注意：执行gulp 命令需要全局安装gulp, npm install gulp -g.）
// 参数说明
//  -n: 文件名
//  -cn: 文件内部controller的名字
//使用说明 gulp template -n your-file-name -cn your-controller-name
gulp.task('template', function () {
    var filename = process.argv[4];
    var controlname = process.argv[6];
    console.log("filename:" + filename);
    console.log("controlname:" + controlname);
    gulp.src('src/tempfile/temp.html', option)
        .pipe(rename(filename+".html"))
        .pipe(replace("{{name}}",controlname))
        .pipe(gulp.dest(src + "/view/template/"));
    gulp.src('src/tempfile/temp.js', option)
        .pipe(rename(filename+".js"))
        .pipe(replace("{{name}}",controlname))
        .pipe(gulp.dest(src + "/js/controller/"));
    gulp.src('src/tempfile/temp.less', option)
        .pipe(rename(filename+".less"))
        .pipe(gulp.dest(src + "/css/"));
    console.log("模板文件已经生成.");
});