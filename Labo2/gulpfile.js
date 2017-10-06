const gulp = require("gulp"),
    jshint = require("gulp-jshint");

const PATHS = {
    JS : {
        SRC:['./*.js']
    }
};

gulp.task("default", ['hint']);

gulp.task("hint", ()=>{
    return gulp.src(PATHS.JS.SRC)
    .pipe(jshint('.jshintrc')) 
    .pipe(jshint.reporter('default'));
 });
