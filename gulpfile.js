var gulp = require('gulp');
var bower_components = 'bower_components'
var dest = 'dist/';
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files', 'del', 'pump'],
    replaceString: /\bgulp[\-.]/
});

gulp.task('clean', function() {
    return plugins.del(['dist/images/*', 'dist/stylesheets/*', 'dist/javascripts/*', 'dist/*.js']);
});

gulp.task('vendorScripts', function() {
    return gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js',
            'bower_components/handlebars/handlebars.js'
            //'bower_components/dragula.js/dist/dragula.min.js' might use if trying leap.js
        ])
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + 'javascripts'))
        .pipe(plugins.notify({ message: 'vendor scripts done.' }));
});

gulp.task('handlebars', ['vendorScripts'], function() {
    gulp.src('handlebars/**/*.hbs')
        .pipe(plugins.handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(plugins.wrap('Handlebars.template(<%= contents %>)'))
        .pipe(plugins.declare({
            namespace: 'Story.templates',
            noRedeclare: true, // Avoid duplicate declarations 
        }))
        .pipe(plugins.concat('handlebars_templates.js'))
        .pipe(gulp.dest(dest));
});

gulp.task('appScripts', ['handlebars'], function() {
    plugins.pump([
        gulp.src([
            'public/javascripts/**/*.js',
            '!public/javascripts/handlebars_templates.js'
        ]),
        plugins.concat('main.js'),
        plugins.rename({ suffix: '.min' }),
        plugins.uglify(),
        gulp.dest(dest + 'javascripts'),
        plugins.notify({ message: 'app scripts done.' })
    ]);
});

gulp.task('vendorCss', function() {
    return gulp.src([
            'bower_components/dragula.js/dist/dragula.min.css'
        ])
        .pipe(gulp.dest(dest + 'stylesheets'));
});

gulp.task('less', function() {
    return gulp.src('public/stylesheets/*.less')
        .pipe(plugins.less({
            paths: 'public/stylesheets'
        }))
        .pipe(plugins.autoprefixer('last 2 version'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.cleanCss({ compatability: 'ie10' }))
        .pipe(gulp.dest(dest + 'stylesheets'));
});

gulp.task('images', function() {
    return gulp.src('public/images/*')
        .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(plugins.notify({ message: 'Images task complete' }));
});

gulp.task('production', ['clean'], function() {
    gulp.start(
        'vendorScripts',
        'appScripts',
        'less',
        'vendorCss',
        'handlebars',
        'images'
    );
});


gulp.task('devClean', function() {
    return plugins.del(['dist/stylesheets/*', 'dist/javascripts/*', 'dist/*.js']);
});

gulp.task('dev', ['devClean'], function() {
    gulp.start(
        'vendorScripts',
        'appScripts',
        'less',
        'vendorCss',
        'handlebars'
    );
})