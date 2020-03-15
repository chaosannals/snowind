const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const developed = process.env.NODE_ENV == 'development';

const packageInfo = fs.readFileSync(path.resolve(__dirname, 'package.json'));
const packageSetting = JSON.parse(packageInfo);
const version = packageSetting.version;

const configuration = {
    target: 'web',
    entry: path.resolve(__dirname, 'main', 'index.js'),
    output: {
        filename: 'snowind.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        },]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV,
            }
        }),
        new webpack.BannerPlugin(` Snowind ${version}\r\n copyright © 2020 Chen Shen Chao \r\n https://github.com/chaosannals/snowind`)
    ],
};

if (developed) {
    configuration.devServer = {
        port: 8000,
        index: 'index.html',
        contentBase: path.join(__dirname, 'demo'),
        overlay: {
            errors: true
        },
        hot: true
    };
    configuration.plugins.push(
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'demo', 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = configuration;