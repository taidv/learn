const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "[name].[hash].js",
		path: __dirname + "/dist",
		publicPath: ""
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [

			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" }) }
		]
	},
	plugins: [
        new ExtractTextPlugin({ filename: "[name].css", disable: false, allChunks: true }),
		new HtmlWebpackPlugin({
			title: 'Loading...',
			template: './src/index.html'
		}),
		new HtmlWebpackExternalsPlugin({
			externals: [
				{ module: 'react', global: 'React', entry: 'https://unpkg.com/react@16.2.0/umd/react.production.min.js' },
				{ module: 'react-dom', global: 'ReactDOM', entry: 'https://unpkg.com/react-dom@16.2.0/umd/react-dom.production.min.js' },
				{ module: 'redux', global: 'Redux', entry: 'https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.js' },
				{ module: 'react-redux', global: 'ReactRedux', entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.7/react-redux.js' }
			]
		})
	],
	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"redux": "Redux",
		"react-redux": "ReactRedux"
	},
	// Adapt the settings to your project
	
    devServer: {
        port: 3001,
        publicPath: "/",
        proxy: {
            "/api": "http://localhost:3000"
        },
        historyApiFallback: true
	}
	
};