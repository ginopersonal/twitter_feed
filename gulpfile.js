var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var browserify = require('browserify');
var lint = require('gulp-eslint');
var source = require('vinyl-source-stream');

var config = {
	paths: {
		clientDist: 'client-dist',
		images: 'app/images/**/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/select2/dist/css/select2.min.css',
			'node_modules/react-bootstrap-table/css/react-bootstrap-table-all.min.css',
			'app/**/*.css'
		],
		externalJs: [
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.min.js'
		],
		mainJs: 'app/client/index.js'
	}
};

gulp.task('images', function() {
	return gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.clientDist + '/static/images'));
});

gulp.task('external-js', function() {
	return gulp.src(config.paths.externalJs)
		.pipe(concat('external-bundle.js'))
		.pipe(gulp.dest(config.paths.clientDist + '/static'));
});

gulp.task('js', ['lint'], function() {
	return browserify(config.paths.mainJs)
		.transform("babelify", {presets: ["es2015", "react"]})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.clientDist + '/static'));
});

gulp.task('css', function() {
	return gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.clientDist + '/static'));
});

gulp.task('lint', function() {
	return gulp.src(['app/**/*.js'])
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('lint-server', function() {
	return gulp.src(['server.js','server/**/*.js'])
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(['app/**/*.js', 'app/css/*.css'], ['deploy-after-watch']);
});

gulp.task('deploy-after-watch', function() {
	console.log('starting redeployment');
	return gulp.start('css', 'js');
});

gulp.task('deploy', function() {
	return gulp.start('css', 'js', 'external-js', 'images');
});

gulp.task('default',['deploy']);