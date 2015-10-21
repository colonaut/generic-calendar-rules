var gulp = require('gulp');
//var ts = require('gulp-typescript');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

//gulp.task('typescript', function () {
//    var tsOut = gulp.src('app/*.tsx')
//        .pipe(ts({
//            noImplicitAny: true,
//            module: 'commonjs',
//            target: 'es5'
//        }));
//    return tsOut.js.pipe(gulp.dest('dist'));
//});


gulp.task('babelify', function() {
    return browserify({
            extensions: ['.js', '.jsx'],
            entries: './app/app.jsx'
        })
        .transform(babelify.configure({
            plugins: ['object-assign']
        }))
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(source('gulp-babelify-bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.jsx', ['babelify'])
});