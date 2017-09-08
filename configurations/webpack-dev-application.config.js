'use strict';

const libraryConfig = require('./library.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: root('dev-application/main.jit.ts'),
        polyfills: root('dev-application/polyfills.ts')
    },

    output: {
        path: root('dev-application-dist'),
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: '@ngtools/webpack',
                        options: {
                            tsConfigPath: root('/dev-application/tsconfig.json')
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.css/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: root('dev-application/app'),
                loader: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'sass-loader'
                    ],

                    fallback: 'style-loader'
                })
            }
        ]
    },

    plugins: [
        new webpack.ProgressPlugin(),

        new HtmlWebpackPlugin({
            template: root('dev-application/index.html')
        }),

        new ExtractTextPlugin('styles.css'),

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular[\\\/]core[\\\/]@angular/,
            path.join(process.cwd(), 'src')
        )
    ],

    resolve: {
        alias: (() => {
            return {
                [libraryConfig.libraryName]: root(`dist`)
            }
        })(),

        mainFiles: ['index', `${libraryConfig.libraryName}.umd`],

        modules: ['node_modules'],

        extensions: ['.ts', '.js']
    },

    devServer: {
        contentBase: './src',
        port: 9000,
        inline: true,
        historyApiFallback: true,
        stats: 'errors-only',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 500
        }
    },

    stats: 'errors-only',

    devtool: 'cheap-source-map'
};

function root(p) {
    return path.join(process.cwd(), p);
}