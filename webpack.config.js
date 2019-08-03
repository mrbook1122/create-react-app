const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

const MyPlugin = require('./src/plugin')

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: "[id].[contentHash].js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    devServer: {
        contentBase: './dist',
        // hot: true
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        [
                            'import',
                            {
                                "libraryName": 'antd',
                                'style': 'css'
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
            ignoreOrder: false
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html"
        }),
        new MyPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()]
    }
}