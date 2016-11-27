var path = require('path');
//File path to app.js and build/js directory
var APP_DIR = path.resolve(__dirname, 'app');
var BUILD_DIR = path.resolve(__dirname, 'build', 'js');
module.exports = {
  // Application main entry point (app.js in app folder)
  entry: APP_DIR + '/app.js',
  // Compile/Package up the code into an app.js file in build. (The html will import this as react code)
  output: {
    path: BUILD_DIR,
    publicPath: "/js/",
    filename: "app.js"
  },
  //Source map tool for chrome devtool debugging
  devtool: 'inline-source-map',
  module: {
    // Babel loader for compiling the react code
    loaders: [
      {
        // Only *.js files.
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
