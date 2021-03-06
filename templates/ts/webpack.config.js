const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'application.js',
        chunkFilename: '[name].js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],
            },
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /(node_modules)/,
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    // sync + async chunks
                    chunks: 'all',
                    name: 'vendor',
                    // import file path containing node_modules
                    test: /node_modules/,
                },
            },
        },
        minimize: true,
        minimizer: [new UglifyJsPlugin({
              include: /\.min\.js$/
        })]
          
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new TSLintPlugin({
            files: ['./src/**/*.ts', './src/**/*.tsx'],
        }),
        new SimpleProgressWebpackPlugin(),
        function() {
            this.plugin('done', stats => {
                if (
                    stats.compilation.errors &&
                    stats.compilation.errors.length
                ) {
                    console.log('Found following error(s):');
                    stats.compilation.errors.forEach(theError => {
                        console.log(theError);
                    });
                    process.exit(1);
                }
            });
        },
        
    ],
};
