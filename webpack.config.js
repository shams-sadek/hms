var HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

let webpack = require('webpack');

const path = require('path');

var bootstrapEntryPoints = require('./webpack.bootstrap.config');
/**
 | -----------------------------------------------------------------------------
 | css processing
 | -----------------------------------------------------------------------------
 */
var isProd = process.env.NODE_ENV == 'production'; // true or false

var cssDev = ['style-loader', 'css-loader', 'sass-loader'];

var cssProd = ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: ['css-loader', 'sass-loader'],
                  publicPath: "/dist"
              });

var cssConfig = isProd ? cssProd : cssDev;

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;




/**
 | -----------------------------------------------------------------------------
 | module exports
 | -----------------------------------------------------------------------------
 */
module.exports = {
        entry: {
            contact: [
                path.resolve(__dirname, "src/contact.js")
            ],
            app: [
                path.resolve(__dirname, "src/other.js"),
                path.resolve(__dirname, "src/app.js"),
            ],
            calculation: [
                path.resolve(__dirname, "src/calculation/calculation.js"),
            ],
            bootstrap: bootstrapConfig
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: cssConfig
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: "babel-loader"
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        'file-loader?name=images/[name].[ext]',
                        'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ],

                },
                { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
                { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
                { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
            ]
        },
        devServer: {
          contentBase: path.join(__dirname, "dist"),
          compress: true,
          port: 8081,
          stats: 'errors-only',
          hot: true,
          proxy: {
              '/api': {
                 target: {
                    host: "localhost",
                    protocol: 'http:',
                    port: 3000
                 },
                 pathRewrite: {
                    '^/api': ''
                 }
              }
           }
        },
        plugins: [
                new HtmlWebpackPlugin({
                  title: 'HMS',
                //   minify: {
                //       collapseWhitespace: true,
                //   },
                  excludeChunks: ['contact'],
                  hash: true,
                  filename: 'index.html',
                  template: './src/index.html'
              }),

                new HtmlWebpackPlugin({
                  title: 'Contact Page',
                //   minify: {
                //       collapseWhitespace: true,
                //   },
                  chunks: ['contact'],
                  hash: true,
                  filename: 'contact.html',
                  template: './src/contact.html'
              }),

              new ExtractTextPlugin({
                  filename: "/css/[name].css",
                  disable: !isProd,
                  allChunks: true
              }),

              new webpack.HotModuleReplacementPlugin(),

              new webpack.NamedModulesPlugin()
        ]// plugins
}
