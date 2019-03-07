const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/dist/alerts.js'
    },
    output: {
        filename: 'alerts.min.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-env']
            }
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
          include: /\.js$/
        })]
      }
}