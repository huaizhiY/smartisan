const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass-china");
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
// gulp => 方法;
	//task 方法; => 绑定指令的方法;
// gulp.task("yanghuaizhi",()=>{
// 	//指令执行函数;
// 	console.log("hello this is my first task");
// });
//把index放进 dist文件夹之中;
gulp.task("index",()=>{
	return gulp.src("html/*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
})

//gulp.watch();

//把所有的js文件全部都放进线上的script文件夹之中;
gulp.task("script",()=>{
	return gulp.src('src/**/*.js')
	        .pipe(sourcemaps.init())
	        .pipe(babel({
	            presets: ['env']
	        }))
	        .pipe(concat('all.js'))
	        .pipe(sourcemaps.write('.'))
	        .pipe(gulp.dest('dist/src'))
})


gulp.task("watch",()=>{
	//如果index.html发生改变 ,那么 执行index指令;
	gulp.watch(["html/*.html","sass/*.scss"],["index"]);
	gulp.watch("scss/*.scss",["sass","index"]);
	gulp.watch("src/*.js",["script"]);
})

gulp.task("server",()=>{
	connect.server({
        root:'dist',  //以谁为服务器根目录
        port:8888,  // 端口号 
        livereload:true
    });
})

gulp.task("sass",()=>{
	 return gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
})

gulp.task("default",["server","watch"])