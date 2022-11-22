const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const i18nPlugin = require('i18n-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => {
    return isProd ? `[name].[hash].${ext}` : `[name].${ext}`
}
const cssLoaders = extra => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {}
    }, 'css-loader']
    if (extra != null) {
        loaders.push(extra)
    }
    return loaders
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer =[
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()]
        config.minimize = true
    }
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@public': path.resolve(__dirname, 'public'),
            vue$: "vue/dist/vue.esm.js"
        },
        extensions: ["*", ".js", ".vue", ".json", '.scss']
    },
    devtool: isDev ? 'source-map' : '',
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Balance app',
            minify: isProd
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets', 'vue.png'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, "src", "assets"),
                    to: path.resolve(__dirname, 'dist/icons')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new VueLoaderPlugin(),
        new i18nPlugin(),
        new MomentLocalesPlugin({
            localesToKeep: ['en', 'ru'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.less$/i,
                use: cssLoaders("less-loader")
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    { loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: [
                                path.resolve(__dirname, 'src', 'assets', 'app.scss')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                resourceQuery: /blockType=i18n/,
                type: 'javascript/auto',
                loader: '@intlify/vue-i18n-loader'
            }
        ]
    }
}