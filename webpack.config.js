const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, 'docs/bundles'),
    filename: 'jsx.bundle.js'
  },
  module: {
    rules: [
        {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader?url=false",
            "sass-loader"
          ]
      }        
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),      
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
      })
  ]    
};