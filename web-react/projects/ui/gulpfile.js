const changed = require('gulp-changed');
const del = require('del');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const webpackstream = require('webpack-stream');
const ts = require('gulp-typescript');
const packageJson = require('./package.json');
const tsProject = ts.createProject("tsconfig.json");
const distTest = packageJson.test;

const TYPESCRIPT_FILES = ['src/**/*.{ts,tsx,less}'];
const STATIC_FILES = ['src/static/**/*', '!**/*.{ts,tsx}'];
const webpackCfg = require('./webpack.config.js');

gulp.task('build:static', function () {
    return gulp.src(STATIC_FILES)
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:webpack', function () {
    return gulp.src(TYPESCRIPT_FILES)
        .pipe(webpackstream(webpackCfg, webpack))
        .on('error', function handleError() {
            this.emit('end');
        })
        .pipe(gulp.dest('dist'));
});


gulp.task("default", gulp.series("build:static", "build:webpack", done => done()));

gulp.task('test:clean', done => {
    return del([`./${distTest}`], done);
});

gulp.task('test:static', function () {
    return gulp.src(STATIC_FILES)
        .pipe(gulp.dest(`./${distTest}/src/static`));
});

gulp.task('test:build', () => {
    return gulp.src(["./src/**/*.ts", "./src/**/*.tsx", "./test/**/*.ts", "./test/**/*.tsx"], { base: './' })
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.mapSources((sourcePath, file) => "../".repeat(sourcePath.match(/\//g).length - 2) + sourcePath))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`./${distTest}`));
});

gulp.task('test:run', () => {
    gulp.src([`./${distTest}/**/*.spec.js`, `./${distTest}/**/*.spec.jsx`], { read: false })
        .pipe(mocha({
            exit: true,
            reporter: process.env.MOCHA_REPORTER ? process.env.MOCHA_REPORTER : "spec",
            reporterOptions: process.env.MOCHA_REPORTEROPTIONS ? process.env.MOCHA_REPORTEROPTIONS : undefined,
            require: ['jsdom-global/register']
        }))
        .on('error', console.error);
});

gulp.task('test', gulp.series('test:clean', gulp.parallel('test:static', 'test:build'), 'test:run', done => done()));
