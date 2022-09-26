//const webpack = require("webpack");
//const dotenv = require('dotenv');
//const fs = require('fs'); // to check if the file exists
const path = require('path'); // to get the current path
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => {

  return {
    entry: "./src/index.js",
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { presets: ["@babel/env"] }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]' //url-loader passes any file with size>8kb to file-loader,
                //it will also pass the name property as part of options,
                //which then the file-url will use for naming the image file in the application package.
              }
            }
          ]
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        },
        {
          test: /\.(ttf)$/,
          use:{
              loader: 'url-loader',
              options:{
                name:'fonts/[name].[ext]'
              }
            }
        }
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
      path: path.resolve(__dirname, "dist/"),
      publicPath: "/dist/",
      filename: "bundle.js",
      //filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js'
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, "public/"),
      port:3001,
      publicPath: "https://localhost:3000/dist/",
      //hotOnly: true,
      //Currently we want to open the /home path directly
      open: true,
      openPage: 'login'
    },
    optimization: {
      minimize: true,
      minimizer: [
          new UglifyJsPlugin()
      ],
      usedExports: true,
      sideEffects: true,
      /*runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          }
        }
      }*/
    },

    plugins: [
      /*new webpack.DefinePlugin({ // <-- key to reducing React's size
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),*/
      new CleanWebpackPlugin(),
      //new webpack.DefinePlugin(envKeys),
      //new BundleAnalyzerPlugin() //use this to analyze the bundles
      //new UglifyJsPlugin(), //minify everything
      //new AggressiveMergingPlugin()//Merge chunks
    ],

    //plugins: [new webpack.HotModuleReplacementPlugin()]
    /*plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      })
    ]*/
    }

};
