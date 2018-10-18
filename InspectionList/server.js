const Bundler = require("parcel-bundler");
const app = require("express")();
const path = require("path");
const proxy = require("http-proxy-middleware");

const file = path.join(__dirname, "./index.html");
const options = {
  outDir: "./dist",
  outFile: "index.html",
  publicUrl: "/",
  watch: true,
  cache: true,
  target: "browser"
};

const bundler = new Bundler(file, options);

app.use(
  "/js_aic/*",
  proxy({
    target: "http://183.234.29.185:3338/",
    changeOrigin: true
  })
);

app.use(bundler.middleware());

app.listen(7080);