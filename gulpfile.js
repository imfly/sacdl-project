var gulp = require('gulp');
var order = require('gulp-order');
var concat = require('gulp-concat');
var es = require('event-stream');
var minifyCss = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var processhtml = require('gulp-processhtml');
var ghPages = require('gulp-gh-pages');

// Settings
var settings = {
    destFolder: 'dist',
    prefix: {
        destfile: 'sacdl.min',
        mergefile: 'app.min'
    }
}

// Assets path map
var assets = {
    js: {
        paths: ['public/js/**/*.js'],
        order: [
            '**/utils.js',
            '**/searcher.js',
            '**/bar.js',
            '**/treemap.js',
            '**/app.js'
        ],
        vendor: ['public/bower_components/d3/d3.min.js']
    },

    css: {
        paths: ['public/css/**/*.css'],
        order: [],
        vendor: [
            'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
            'public/bower_components/font-awesome/css/font-awesome.min.css'
        ]
    },

    image: {
        paths: 'public/images/**/*'
    },

    fonts:  'public/bower_components/bootstrap/fonts/*.*'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del([settings.destFolder + '']);
});

gulp.task('js', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return es.merge(
            gulp.src(assets.js.vendor)
            .pipe(gulp.dest(settings.destFolder + '/js/')),

            gulp.src(assets.js.paths)
            .pipe(order(assets.js.order))
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat(settings.prefix.destfile + '.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(settings.destFolder + '/js'))
        )
        .pipe(concat(settings.prefix.mergefile + '.js'))
        .pipe(gulp.dest(settings.destFolder + '/js/'))
});

// Minify and copy all Stylesheets
gulp.task('css', ['clean'], function() {
    return es.merge(
            // Copy the vendors
            gulp.src(assets.css.vendor)
            .pipe(gulp.dest(settings.destFolder + '/css/')),

            // Concat mine
            gulp.src(assets.css.paths)
            .pipe(order(assets.css.order))
            .pipe(concat(settings.prefix.destfile + '.css'))
            .pipe(minifyCss())
            .pipe(gulp.dest(settings.destFolder + '/css/'))
        )
        .pipe(concat(settings.prefix.mergefile + '.css'))
        .pipe(gulp.dest(settings.destFolder + '/css/'))
});

// Copy all static images
gulp.task('images', ['clean'], function() {
    return gulp.src(assets.image.paths)
        // Pass in options to the task
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(settings.destFolder + '/images'));
});

// Copy fonts
gulp.task('fonts', ['clean'], function() {
    return gulp.src(assets.fonts)
        .pipe(gulp.dest(settings.destFolder + '/fonts/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(assets.js.paths, ['js']);
    gulp.watch(assets.css.paths, ['css']);
    gulp.watch(assets.image.paths, ['images']);
});

//Html
gulp.task("html",  ['clean'], function() {
    gulp.src('./app/views/index.ejs')
        .pipe(processhtml())
        .pipe(gulp.dest(settings.destFolder))
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'js', 'css', 'images', 'fonts', 'html']);


//Deploy
gulp.task('deploy', ['default'], function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});
