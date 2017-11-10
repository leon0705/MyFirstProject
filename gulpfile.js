'use strict';
/*
利用gulp-sass编译css
	*require() 导入模块
	* npmjs.com
*/

var gulp = require('gulp');
var sass = require('gulp-sass');

//创建一个任务
gulp.task('compileSass',function(){
	
	//匹配多个文件可以使用gulp.src(['./src/sass/*.scss'])
	//如果不需要某几个可以这样gulp.src(['./src/sass/*.scss','！XXX文件'])
	
	gulp.src('./src/sass/*.scss')							//得到文件流(文件在内存中的状态)
	
	.pipe(sass({outputStyle:'compact'}).on('error',sass.logError))  //编译sass文件
	
	.pipe(gulp.dest('./src/css/'))							//输出到硬盘
});

//监听文件的任务
gulp.task('ListenHomeSass',function(){
	//监听.scss文件
	//如果有修改，则只需compileSass任务
	gulp.watch('./src/sass/*.scss',['compileSass'])
})

//运行任务
//命令行输入（项目根目录下） ： gulp 任务名