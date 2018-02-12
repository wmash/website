const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

module.exports = {
	entry: {
		app: [
			"eventsource-polyfill",
			"webpack-hot-middleware/client",
			"webpack/hot/only-dev-server",
			"react-hot-loader/patch",
			"./client/js/client.jsx",
		],
		vendor: [
			"react",
			"react-dom",
		],
	},
	target: "node",
	output: {
		path: `${__dirname}/dist/`,
		filename: "app.js",
		publicPath: "http://0.0.0.0:8000/"
	},
	resolve: {
		extensions: [
			".js",
			".jsx"
		],
		modules: [
			"node_modules"
		],
	},
	externals: [
		nodeExternals()
	],
	module: {
		loaders: [
			{
				test: /\.jsx*$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}, {
				test: /\.json$/,
				loader: "json-loader",
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loaders: [
					"style-loader",
					"css-loader",
					"less-loader"
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "url-loader",
						options: {}
					}
				]
			}
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: Infinity,
			filename: "vendor.js",
		}),
		new webpack.DefinePlugin({
			"process.env": {
				CLIENT: JSON.stringify(true),
				NODE_ENV: JSON.stringify("development"),
			}
		}),
	]
};
