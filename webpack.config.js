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

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

// noinspection JSValidateTypes
/*module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: { filename: 'js/index.js', path: path.resolve(__dirname, 'dist') },

    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: 'css/main.css' }),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],

    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: 'ts-loader', include: path.resolve(__dirname, 'src'), exclude: /node_modules/ },

            {
                test: /.(sa|sc|c)ss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { sourceMap: true } }, { loader: 'sass-loader', options: { sourceMap: true } }],
            },

            // { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader', options: { name: 'images/[name].[ext]' } },

            // {
            //     test: /\.(png|jp(e*)g|svg)$/,
            //     use: [{ loader: 'url-loader', options: { limit: 8000, name: 'images/[hash]-[name].[ext]', publicPath: 'assets/images', }, },],
            // },
            //
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader', options: { name: '/assets/images/[name].[ext]' } },

            // {
            //     test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            //     use: [{ loader: 'url-loader', options: { limit: 8000, name: 'static/media/[name].[hash:8].[ext]', publicPath: path.join(__dirname, 'dist') } }, { loader: 'file-loader' }],
            //     // type: 'asset/resource',
            // },

            {
                // loader: require.resolve('file-loader'),
                // exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /.(sa|sc|c)ss$/],
                // options: { name: 'static/media/[name].[hash:8].[ext]', },
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ baseUrl: 'src' })],
    },

    devServer: { host: 'localhost', inline: true, port: 3000, contentBase: path.join(__dirname, 'dist') }, // open: true,
};*/

// noinspection JSValidateTypes
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: { filename: 'js/index.js', path: path.resolve(__dirname, 'dist') },

    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: 'css/main.css' }),
        new HtmlWebpackPlugin({ template: './public/index.html' }),
    ],

    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: 'ts-loader', include: path.resolve(__dirname, 'src'), exclude: /node_modules/ },

            {
                test: /.(sa|sc|c)ss$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader', options: { sourceMap: true } }, { loader: 'sass-loader', options: { sourceMap: true } }],
            },

            { test: /.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/, loader: 'file-loader', options: { name: 'assets/[name].[hash].[ext]', outputPath: 'images' } },

            // { test: /\.css$|\.scss$/, include: path.resolve(__dirname, 'src'), use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },

            // { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader', options: { name: '/public/icons/[name].[ext]' } },
        ],
    },

    resolve: { extensions: ['.tsx', '.ts', '.js'], plugins: [new TsconfigPathsPlugin({ baseUrl: 'src' })] },

    devServer: { host: 'localhost', inline: true, port: 3000, contentBase: path.join(__dirname, 'dist') },
};
