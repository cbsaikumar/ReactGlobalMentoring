const HtmlWebPackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV;

const isProd = mode === "production";

module.exports = {
  mode,
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  devtool: isProd ? false : 'inline-source-map',
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
  optimization: {
    removeEmptyChunks: isProd,
    mergeDuplicateChunks : isProd
  }
};
