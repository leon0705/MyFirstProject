'use strict';
/*
利用gulp-sass编译css
	*require() 导入模块
	* npmjs.com
*/
var gulp = require('gulp');

//浏览器同步测试
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//sass编译
var sass = require('gulp-sass');

//js合并压缩重命名操作
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

//文件路径
var path = {
	sass: './src/sass/*.scss',
	js: './src/js/*.js'
}

//创建一个任务
gulp.task('compileSass', function() {

	//匹配多个文件可以使用gulp.src(['./src/sass/*.scss'])
	//如果不需要某几个可以这样gulp.src(['./src/sass/*.scss','！XXX文件'])

	gulp.src(path.sass) //得到文件流(文件在内存中的状态)

		.pipe(sass({
			outputStyle: 'compact'
		}).on('error', sass.logError)) //编译sass文件

		.pipe(gulp.dest('./src/css/')) //输出到硬盘

		.pipe(reload({
			stream: true
		})) //重新载入
});

//监听文件的任务
gulp.task('ListenHomeSass', function() {
	//监听.scss文件
	//如果有修改，则只需compileSass任务
	gulp.watch(path.sass, ['compileSass'])
})

//js压缩重命名等
gulp.task('mergeJS', function() {
	gulp.src(path.js)

		// 合并文件
		.pipe(concat('page.js'))

		// 合并文件后输出（未压缩）
		.pipe(gulp.dest('./dist/js'))

		// 压缩文件
		.pipe(uglify())

		// 改名
		.pipe(rename({
			suffix: ".min"
		}))

		// 输出压缩后的文件
		.pipe(gulp.dest('./dist/js'))
})

//浏览器同步测试
gulp.task('b-server', function() {
	browserSync({
		server: {
			baseDir: ['./src']
		},
	}, function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('./src/sass/*.scss', ['compileSass']);
	//	gulp.watch('./src/js/*.js', ['script']);
	//	gulp.watch('./src/img/*.*', ['image']);
	//	gulp.watch('./src/html/*.html',['html']);
	gulp.watch('./src/*.html').on('change', reload);
});

//有自己的服务器时使用
gulp.task('browser-sync', function() {
	browserSync.init({
		proxy: "http://localhost:5277"
	});
});

gulp.task('default', ['b-server']);
//运行任务
//命令行输入（项目根目录下） ： gulp 任务名