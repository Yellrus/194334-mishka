"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var precss = require("precss");
var assets  = require("postcss-assets");
var inlinesvg  = require("postcss-inline-svg");
var postcssSVG = require("postcss-svg");
var cssmqpacker = require("css-mqpacker");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("postcss/style.css")
  .pipe(plumber())
  .pipe(postcss([
    precss(),
    autoprefixer({browsers: [
      "last 2 versions"
      ]}),
    assets({
     loadPaths: ["img/"]
   }),
    inlinesvg("options.encode(svg)"),
    postcssSVG({ defaults: '[fill]: black' }),
    cssmqpacker()
    ]))
  .pipe(gulp.dest("css"))
  .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("postcss/**/*.css", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});
