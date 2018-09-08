const gulp = require('gulp');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject("tsconfig.json");
const tsProjectTest = ts.createProject("tsconfig.json");
const merge = require('merge2');
const del = require('del');
const install = require('gulp-install');
const runSequence = require('run-sequence');
const packageJson = require('./package.json')

let buildSourceMaps = true;

const staticPaths = ['./src/public/**', './src/config/**'];
const resourcePath = ['./test/resource/**'];

const distTest = packageJson.test;
const distBuild = packageJson.build;

// clean task
gulp.task('build:clean', () => {
    return del([packageJson.main]);
});

// clean tests task
gulp.task('test:clean', () => {
    return del([`./${distTest}`]);
});

gulp.task('test:copy-static', () => {
    return gulp.src(staticPaths, { base: './src' })
        .pipe(gulp.dest(`./${distTest}/src`))
        .pipe(gulp.dest(packageJson.main));
});

gulp.task('test:copy-resource', () => {
    return gulp.src(resourcePath, { base: './test' })
        .pipe(gulp.dest(packageJson.main));
});
gulp.task('test:build', () => {
    return gulp.src(["./src/**/*.ts", "./test/**/*.ts"], { base: './' })
        .pipe(sourcemaps.init())
        .pipe(tsProjectTest()).js
        .pipe(sourcemaps.mapSources((sourcePath, file) => "../".repeat(sourcePath.match(/\//g).length - 2) + sourcePath))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`./${distTest}`));
});

// clean tests task
gulp.task('test:clean-build', (callback) => {
    return runSequence(['test:clean'], ['test:build'], callback);
});

gulp.task('build:build', () => {
    let pipe = tsProject.src()
        .pipe(sourcemaps.init())

    let tsc = pipe.pipe(tsProject())

    pipe = merge(tsc.dts, tsc.js);

    if (buildSourceMaps) {
        pipe = pipe.pipe(sourcemaps.mapSources((sourcePath, file) => "../".repeat(sourcePath.match(/\//g).length - 3) + sourcePath))
            .pipe(sourcemaps.write('.'));
    }

    return pipe.pipe(gulp.dest(packageJson.main));
});

gulp.task('build:copy-static', () => {
    return gulp.src(staticPaths, { base: './src' })
        .pipe(gulp.dest(packageJson.main));
});

gulp.task('test:run', () => {
    gulp.src(`./${distTest}/**/*.spec.js`, { read: false })
        .pipe(mocha({
            reporter: process.env.MOCHA_REPORTER ? process.env.MOCHA_REPORTER : "spec",
            reporterOptions: process.env.MOCHA_REPORTEROPTIONS ? process.env.MOCHA_REPORTEROPTIONS : undefined
        }));
});


gulp.task('test', (callback) => {
    return runSequence(['test:clean'], ['test:build', 'test:copy-static', 'test:copy-resource'], ['test:run'], callback);
});

gulp.task('build', (callback) => {
    return runSequence(['build:clean', 'test:clean'], ['build:build', 'build:copy-static'], callback);
});

gulp.task('deploy:copy-build', () => {
    return gulp.src([packageJson.main + '/*', packageJson.main + '/**/*', './bin/*', './bin/**/*'], { base: '.' })
        .pipe(gulp.dest(distBuild));
});

gulp.task('deploy:install', () => {
    return gulp.src(['./package.json', './package-lock.json'])
        .pipe(gulp.dest(distBuild))
        .pipe(install({ production: true }));
});

gulp.task('deploy', (callback) => {
    buildSourceMaps = false;

    return runSequence(['build'], ['deploy:copy-build', 'deploy:install'], callback)
});

gulp.task('watch', ['build:build', 'build:copy-static'], () => {
    gulp.watch('./src/*', ['build:build', 'build:copy-static'])
});

gulp.task('watch-all', () => {
    gulp.watch('./src/**/*.*', ['build:build', 'build:copy-static'])
});

gulp.task('default', ['build', 'watch-all']);
