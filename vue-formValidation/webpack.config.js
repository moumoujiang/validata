const environment = process.env.NODE_ENV;
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const packageConf = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

let name = packageConf.envVariable;
let version = packageConf.version;
let library = name.replace(/^(\w)/, m => m.toUpperCase());
let proxyPort = 8082;
let plugins = [];
let optimization = null;
let rules = [];

if (fs.existsSync('./.babelrc')) {
	let babelConf = JSON.parse(fs.readFileSync('./.babelrc'));
	rules.push({
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		loader: 'babel-loader',
		query: babelConf
	});
}
// 开发环境
if (Object.is(environment, 'development')) {
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	plugins.push(
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html'
		})
	);
	plugins.push(new webpack.HotModuleReplacementPlugin());
}
let minjs = {
	cache: false,
	parallel: true, // 开启并行压缩，充分利用 CPU 快速压缩
	sourceMap: true,
	uglifyOptions: {
		compress: {
			// 在UglifyJs删除没有用到的代码时不输出警告
			warnings: false,
			// 删除所有的 `debugger` 语句
			drop_debugger: true,
			// 删除所有的 `console` 语句
			drop_console: true,
			// 内嵌定义了但是只用到一次的变量
			collapse_vars: true,
			// // 提取出出现多次但是没有定义成变量去引用的静态值
			reduce_vars: true
		},
		output: {
			// 最紧凑的输出
			beautify: false, // 这两个必须同时为 false 才会压缩
			// 删除所有的注释
			comments: false
		}
	}
};
// 生产环境
if (Object.is(environment, 'production')) {
	console.log('build...');
	const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
	optimization = {
		minimizer: [new UglifyJsPlugin(minjs)]
	};

	let CleanWebpackPlugin = require('clean-webpack-plugin');
	plugins.push(new CleanWebpackPlugin(['lib']));
}

module.exports = () => {
	return {
		mode: environment,
		entry: {
			index: './dist/index.js' // 指定打包的文件入口
		},
		output: {
			filename: Object.is(environment, 'production')
				? (name += `-${version}.min.js`)
				: '[name].js', // 打包之后生成的文件名
			path: path.resolve(__dirname, 'lib'), // 打包后的文件的存放路径
			publicPath: '/static/js/', // // 指定文件的引用路径（虚拟目录-开发时候使用）
			library: `${library}`, // 指定类库名，主要用于直接引用的方式（如：支持AMD Commonjs script 标签引入）
			libraryTarget: 'umd', // 定义打包方式，同时支持CommonJS，AMD和全局引用（script）
			globalObject: 'this' // 兼容nodejs环境和浏览器环境
		},
		plugins: plugins,
		optimization: optimization ? optimization : {},
		devServer: {
			port: proxyPort, // 本地服务器端口号
			hot: true, // 热重载
			overlay: true, // 如果代码出错，会在浏览器页面弹出“阴影层”。类似于 vue-cli 等脚手架
			open: true // 打开浏览器
		}
	};
};
