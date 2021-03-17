const path = require('path');
const webpack = require('webpack');

/*
 * We've enabled MiniCssExtractPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/mini-css-extract-plugin
 *
 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

// noinspection JSValidateTypes
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: { filename: 'js/index.js', path: path.resolve(__dirname, 'dist') },

    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: 'css/main.css' }),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new CopyPlugin({ patterns: [{ from: 'src/assets/images', to: 'assets/images' }, { from: 'public/favicon.png', to: './' }], options: { concurrency: 100 } }),
    ],

    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: 'ts-loader', include: path.resolve(__dirname, 'src'), exclude: /node_modules/ },

            {
                test: /.(sa|sc|c)ss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { sourceMap: true } }, { loader: 'sass-loader', options: { sourceMap: true } }],
            },

            { test: /.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/, loader: 'file-loader', options: { name: 'assets/[name].[hash].[ext]', outputPath: 'images', limit: 10000 } },
        ],
    },

    resolve: { extensions: ['.tsx', '.ts', '.js'], plugins: [new TsconfigPathsPlugin({ baseUrl: 'src' })] },

    devServer: { host: 'localhost', inline: true, port: 3000, contentBase: path.join(__dirname, 'public') },
};
