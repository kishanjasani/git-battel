const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.(png|j?g|svg|gif)?$/, use: 'file-loader'	}
        ]
    },
    plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve( __dirname, 'app/index.html' ),
			filename: 'index.html'
		})
	]
}
