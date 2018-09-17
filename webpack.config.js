const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

(() => console.log(__dirname));

module.exports = {
  entry: path.resolve(__dirname, 'src/js/script.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
