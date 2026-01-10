const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './public/js/animations.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/bundle.[contenthash].js',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name].[contenthash][ext]'
                    }
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/views/home.ejs'),
                filename: 'index.html',
                inject: 'body'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'public'),
                        to: path.resolve(__dirname, 'dist'),
                        globOptions: {
                            ignore: ['**/js/animations.js'], // Don't copy original JS since we're bundling it
                        },
                    },
                ],
            }),
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3001,
            open: true,
            hot: true,
        },
        devtool: isProduction ? false : 'source-map',
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
    };
};