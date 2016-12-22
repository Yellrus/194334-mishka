"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var precss = require("precss");
var assets = require("postcss-assets");
var inlinesvg = require("postcss-inline-svg");
var postcssSVG = require("postcss-svg");
var cssmqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgmin = require("gulp-svgmin");
var jsmin = require("gulp-uglify");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var copy = require('gulp-copy');

gulp.task("style", function () {
  gulp.src("postcss/style.css")
    .pipe(plumber())
    .pipe(postcss([
      precss(),
      autoprefixer({
        browsers: [
          "last 2 versions", "IE 11"
        ]
      }),
      assets({
        loadPaths: ["img/"]
      }),
      inlinesvg("options.encode(svg)"),
      postcssSVG({
        defaults: '[fill]: black'
      }),
      cssmqpacker({
        sort: false
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});


gulp.task("images", function () {
  return gulp.src("build/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      })
    ]))
    .pipe(gulp.dest("build/img"));

});


gulp.task("svgimages", function () {
  return gulp.src("build/img/*.svg")
    .pipe(svgmin())
    .pipe(gulp.dest("build/img"));

});


gulp.task("jsmin", function () {
  gulp.src("js/mobile-menu.js")
    .pipe(jsmin())
    .pipe(rename("mobile-menu.min.js"))
    .pipe(gulp.dest("build/js"));
  gulp.src("js/map.js")
    .pipe(jsmin())
    .pipe(rename("map.min.js"))
    .pipe(gulp.dest("build/js"));

});

gulp.task("serve", ["style"], function () {
  server.init({
    server: "build",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("postcss/**/*.css", ["style"]);
  gulp.watch("*.html").on("change", server.reload);

  gulp.watch("*.html", ["copy:html"]);
  gulp.watch("*.html").on("change", server.reload);
});


gulp.task("build", function (fn) {
  run("clean", "copy", "style", "images", "svgimages", "jsmin", fn)

});


gulp.task("copy", function () {
  return gulp.src([
      "fonts/**/*.{woff,woff2}",
      "img/**",
      "js/**",
      "*.html"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));

});


gulp.task("copy:html", function () {
  return gulp.src("*html")
    .pipe(gulp.dest("build"));

})


gulp.task("clean", function () {
  return del("build");

});
