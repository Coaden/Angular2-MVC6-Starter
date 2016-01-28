﻿var gulp = require('gulp'),
    rimraf = require('rimraf'),
    ts = require('gulp-typescript'),
    merge = require('merge'),
    fs = require("fs");

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    npm: "./node_modules/",
    lib: "./" + project.webroot + "/lib/",
    tsSource: "./" + project.webroot + "/app/**/*.ts",
    tsOutput: "./" + project.webroot + "/app/",
    tsDef: "./" + project.webroot + "/definitions/"
};

gulp.task("clean", function (cb) {
    rimraf(paths.tsOutput, cb);
});

//var tsProject = ts.createProject({
//    declarationFiles: true,
//    noExternalResolve: false,
//    module: 'system',
//    removeComments: true,
//    noImplicitAny: false,
//    noEmitOnError: true,
//    removeComments: false,
//    sourceMap: true,
//    target: "es5",
//    experimentalDecorators: true,
//    moduleResolution: "node"
//});

var tsProject = ts.createProject("./" + project.webroot + '/tsconfig.json');

gulp.task('ts-compile', function () {
    var tsResult = gulp.src(paths.tsSource)
                    .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest(paths.tsDef)),
        tsResult.js.pipe(gulp.dest(paths.tsOutput))
    ]);
});

gulp.task('watch', ['ts-compile'], function () {
    gulp.watch(paths.tsDef, ['ts-compile']);
});

//gulp.task("copy", function () {
//    var npm = {
//        "requirejs": "requirejs/require.js"
//    }

//    for (var destinationDir in npm) {
//        gulp.src(paths.npm + npm[destinationDir])
//          .pipe(gulp.dest(paths.lib + destinationDir));
//    }
//});