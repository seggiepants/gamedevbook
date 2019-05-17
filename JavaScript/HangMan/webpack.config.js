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
                test: /\.(csv|ico)$/,
                use: [
                    {
                        loader: 'file-loader', 
                        options: {},
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