const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'hangman.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(csv|ico|mp3)$/,
                use: [
                    {
                        loader: 'file-loader', 
                        options: {
                            name: '[path][name].[ext]',
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hangman',
            filename: 'hangman.html',
            favicon: './favicon.ico',
        })
    ],
};