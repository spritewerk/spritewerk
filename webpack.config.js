var webpack = require("webpack");
var path = require("path");

module.exports = {
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  devtool: "inline-source-map",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [ ".ts", ".js" ] // need `.js` https://github.com/webpack/webpack-dev-server/issues/720
  }
};
