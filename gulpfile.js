"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imgmin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var uglify = require("gulp-uglify");
var del = require("del");
var run = require("run-sequence");
var browserSync = require("browser-sync");
var server = browserSync.create();
var reload = browserSync.reload;

gulp.task("style", function () {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("sprite", function () {
  return gulp.src("img/sprite-icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return gulp.src("js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("images", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imgmin([
      imgmin.optipng({optimizationLevel: 3}),
      imgmin.jpegtran({progressive: true}),
      imgmin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**"
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("serve", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("less/**/*.less", ["style", server.reload]);
  gulp.watch("js/*.js", ["js", server.reload]);
  gulp.watch("*.html", ["html", server.reload]);
});

gulp.task("build", function (done) {
  run("clean", "copy", "style", "sprite", "html", "js", "serve", done)
});
