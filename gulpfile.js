var gulp = require('gulp'),
    pug = require('gulp-pug'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    imageMin = require('gulp-tinypng'),
    concat = require('gulp-concat'),
    uglifyjs = require('gulp-uglifyjs'),
    sass = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    sourceMaps = require('gulp-sourcemaps'),
    svgMin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    svgSprite = require('gulp-svg-sprite');


gulp.task('clean', function () {
    return del('./build')
});

gulp.task('fonts', function () {
    return gulp.src('./dev/static/fonts/**/*.*')
        .pipe(gulp.dest('./build/static/fonts/'))
});

gulp.task('img:dev', function () {
    return gulp.src('./dev/static/img/**/*.{png,jpg,gif}')
        .pipe(gulp.dest('./build/static/img/'))
});

gulp.task('img:build', function () {
    return gulp.src('./dev/static/img/**/*.{png,jpg,gif}')
        .pipe(imageMin('U9VpaTEycPoJ-5MIbGyTi50fi98V7nSu'))
        .pipe(gulp.dest('./build/static/img/'))
});

gulp.task('svg:copy', function () {
    return gulp.src('./dev/static/img/svg/*.svg')
        .pipe(gulp.dest('./build/static/img/svg/'))
});

gulp.task('pug', function () {
    return gulp.src('./dev/pug/pages/*.pug')
        .pipe(pug())
        .on('error', notify.onError(function (error) {
            return {
                title: 'pug',
                message: error.message
            };
        }))
        .pipe(gulp.dest('./build/'))
        .on('end', browserSync.reload)
});

gulp.task('js:dev', function () {
    return gulp.src(['node_modules/svg4everybody/dist/svg4everybody.min.js', 'node_modules/owl.carousel/dist/owl.carousel.min.js', 'node_modules/mixitup/dist/mixitup.min.js', 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('./build/static/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('js:build', function () {
    return gulp.src(['node_modules/svg4everybody/dist/svg4everybody.min.js', 'node_modules/owl.carousel/dist/owl.carousel.min.js', 'node_modules/mixitup/dist/mixitup.min.js', 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('./build/static/js/'))
});

gulp.task('js:copy', function () {
    return gulp.src(['./dev/static/js/*.js', '!./dev/static/js/libs.min.js', 'node_modules/owl.carousel/dist/owl.carousel.min.js', 'node_modules/mixitup/dist/mixitup.min.js', 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js'])
        .pipe(gulp.dest('./build/static/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('serve', function () {
    browserSync.init({
        server: './build'
    })
});

gulp.task('sass:build', function () {
    return gulp.src('./dev/static/sass/main.sass')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoPrefixer(['last 15 versions']))
        .pipe(gulp.dest('./build/static/css/'))
});

gulp.task('sass:dev', function () {
    return gulp.src('./dev/static/sass/main.sass')
        .pipe(sourceMaps.init())
        .pipe(sass())
        .on('error', notify.onError(function (error) {
            return {
                title: 'Sass',
                message: error.message
            }
        }))
        .pipe(sourceMaps.write())
        .pipe(autoPrefixer(['last 15 versions']))
        .pipe(gulp.dest('./build/static/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('watch', function () {
    gulp.watch('./dev/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('./dev/static/sass/**/*.sass', gulp.series('sass:dev'));
    gulp.watch('./dev/static/img/svg/*.svg', gulp.series('svg:copy'));
    gulp.watch('./dev/static/js/**/*.js', gulp.series('js:dev', 'js:copy'));
    gulp.watch(['./dev/static/img/general/**/*.{png,jpg,gif}', './dev/static/img/content/**/*.{png,jpg,gif}'], gulp.series('img:dev'));
});

gulp.task('dev', gulp.series('clean', gulp.parallel('sass:dev', 'pug', 'js:dev', 'js:copy', 'img:dev', 'fonts', 'svg:copy')));

gulp.task('build', gulp.series('clean', gulp.parallel('sass:build', 'pug', 'js:build', 'js:copy', 'img:build', 'fonts', 'svg:copy')));

gulp.task('default', gulp.series('dev', gulp.parallel('watch', 'serve')));