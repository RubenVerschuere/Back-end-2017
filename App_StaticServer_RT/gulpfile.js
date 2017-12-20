/* gulpfile.js (en niet gulp.js) */
const gulp = require('gulp'),
    htmlhint = require("gulp-htmlhint"),
    cleanCSS = require("gulp-clean-css"),
    csslint = require('gulp-csslint'),
    jshint = require("gulp-jshint"),
    jsStylish = require("jshint-stylish"),
    jscs = require('gulp-jscs'), 
    watch = require('gulp-watch'),
    concat = require("gulp-concat"),
    nodemon = require("gulp-nodemon");

const PATHS = {
    NODE_JS: {
        SRC1: './server/*.js',
        SRC2: './*.js'
    },
    HTML: {
        SRC: './client/src/**/*.html',
        DEST: './client/public/'
    },
    CLIENT_JS: {
        LIB: "./client/public/lib/**/*.js",
        SRC: "./client/src/js/**/*.js",
        SRC2: "./client/public/js/**/*.js",
        DEST: "./client/public/js/"
    },
    CSS: {
        SRC: './client/src/css/**/*.css',
        DEST: './client/public/css/'
    },
    SCSS: {
        SRC: './client/src/css/**/*.scss',
        DEST: './client/public/css/'
    },
    ANGULAR: {
        SRC: './client/src/angular-client/',
        DEST: './client/public'
    }
};

gulp.task("default",  () => {
    let htmlWatcher = gulp.watch(PATHS.HTML.SRC, ['html-validate']);
    let jsWatcher = gulp.watch([PATHS.CLIENT_JS.SRC, PATHS.NODE_JS.SRC1, PATHS.NODE_JS.SRC2], ['js-validate']);
    // TO DO cssWathcer met css-validate taak
});

gulp.task("html-validate",  ()=> {
    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter("htmlhint-stylish"));
});

gulp.task("js-validate", ()=> {
    gulp.src([PATHS.CLIENT_JS.SRC, PATHS.CLIENT_JS.SRC2,PATHS.NODE_JS.SRC1, PATHS.NODE_JS.SRC2])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }))        ;
});

gulp.task('monitor', ['js-validate'],  () => {
    var options = {
        script: 'server/staticServer.js',
        delayTime: 1,
        env: {
            //PORT: 5000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (evt) {
            console.log('nodemon restarting');
        });
});