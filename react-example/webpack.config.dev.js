const path = require('path');
const webpack = require('webpack');
const publicPath = '/dist/build/';
var basePath = __dirname;

module.exports = {
    //mode: "development", // "production" | "development" | "none"
    context: path.join(basePath, "src"),
    entry: [
        './index.tsx'
    ],
    devtool: 'source-map',
    resolve: {
        // .js is required for react imports.
        // .tsx is for our app entry point.
        // .ts is optional, in case you will be importing any regular ts files.
        extensions: ['.js', '.ts', '.tsx']
    },

    output: {
        path: path.join(basePath, publicPath),
        filename: '[name].bundle.js',
        publicPath: publicPath,
        sourceMapFilename: '[name].map',
    },

    devServer: {
        port: 3000,
        host: 'localhost',
        //Be possible go back pressing the "back" button at chrome
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: publicPath,
        contentBase: path.join(basePath, publicPath),
        //hotmodulereplacementeplugin
        hot: true
    },
    module: {
		rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }  
        ]
    }
};