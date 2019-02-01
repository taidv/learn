const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: "./src/index.tsx",
	output: {
		filename: "[name].[hash].js",
		path: __dirname + "/dist",
		publicPath: ""
	},

	mode: 'development',

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
			title: 'Hello React',
			template: './src/index.html'
		}),
		new CopyWebpackPlugin([ { from: 'src/static', to: 'static' } ]),
		new HtmlWebpackExternalsPlugin({
			externals: [
				{ 
					module: 'react', 
					global: 'React', 
					hash: true,
					entry: 'umd/react.production.min.js'
				},
				{
					module: 'react-dom',
					global: 'ReactDOM',
					entry: 'umd/react-dom.production.min.js'
				},
				{
					module: 'redux',
					global: 'Redux',
					entry: 'dist/redux.min.js'
				},
				{
					module: 'react-redux',
					global: 'ReactRedux',
					entry: 'dist/react-redux.min.js'
				}
			],
			hash: true,
			outputPath: "libs"
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