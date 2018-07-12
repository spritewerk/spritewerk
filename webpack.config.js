var webpack = require("webpack");
var path = require("path");

module.exports = {
  devServer: {
    contentBase: "./play",
    hot: true
  },
  devtool: "inline-source-map",
  entry: {
    sprite: "./play/sprite.ts"
  },
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
    filename: "[name].bundle.js",
		chunkFilename: "[id].bundle.js",
    path: path.resolve(__dirname, "play")
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [ ".ts", ".js" ] // need `.js` https://github.com/webpack/webpack-dev-server/issues/720
  }
};
