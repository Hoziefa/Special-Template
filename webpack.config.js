const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { NODE_ENV = 'development' } = process.env;

module.exports = {
    entry: './src/index.ts',
    output: { filename: 'index.js', path: path.resolve(__dirname, NODE_ENV === 'development' ? 'public' : 'dist') },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass'),
                        },
                    },
                ],
            },

            { test: /.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/, loader: 'file-loader' },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
        plugins: [new TsconfigPathsPlugin({ baseUrl: 'src' })],
    },

    devServer: {
        contentBase: path.join(__dirname, NODE_ENV === 'development' ? 'public' : 'dist'),
        inline: true,
        port: 3000,
    },
};
