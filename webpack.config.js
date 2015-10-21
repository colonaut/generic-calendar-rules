/**
 * Created by kalle on 26.08.2015.
 */
//https://christianalfoni.github.io/react-webpack-cookbook/Automatic-browser-refresh.html

var path = require('path');
var webpack = require('webpack');
var path_to_react = path.resolve(__dirname, 'node_modules/react/dist/react.min.js');

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/app.jsx')],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,  //All .js and .jsx files //test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel?optional=runtime' //=runtime is for Object.assign support (via babel-runtime)
            }
        ],
        noParse: [path_to_react]
    }
};