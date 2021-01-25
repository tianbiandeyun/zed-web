// path 是nodejs的路径引入
const {resolve} = require('path');

// 用来打包 html 需要安装 html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 将 css 提取成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// process.env.NODE_ENV = 'production';

console.log(process.env.NODE_ENV);

module.exports = {

    // webpack 打包开始的入口文件
    entry: "./js/index.js",

    // 输出配置 filename 入口文件打包之后输出的文件名字
    // path 输出到什么文件夹下
    // publicPath index.html 引入的路径配置
    output: {
        filename: "js/build.js",
        path: resolve(__dirname, 'build'),
        publicPath: './'
    },

    // loader 配置
    // rules 详细配置 use 使用什么规则，执行顺序是 从下到上，从左到右
    module: {
        rules: [
            // 配置 css 解析
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // 配置 less 解析
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    "less-loader",
                    // 配置 css 代码兼容补全信息，需要配合 package.json 重的 browserslist 使用
                    // "browserslist": [
                    //     "last 2 version",
                    //     "> 1%",
                    //     "iOS >= 7",
                    //     "Android > 4.1",
                    //     "Firefox > 20",
                    //     "not dead",
                    //     "not op_mini all"
                    // ]
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [["postcss-preset-env", {}]],
                            }
                        }
                    }
                ]
            },
            // 背景图 解析，无法解析 标签 img
            {
                test: /\.(jpg|png|git|jpeg)/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    esModule: false,
                    name: '[hash:10][ext]',
                    outputPath: 'images'
                }
            },
            // 标签 img 解析
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // 复制 template 路径的 html ，并且引入打包好的资源输出到 build
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        // 将 css 单独提取成文件，输出到以下目录
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        })
    ],
    // 设置 webpack 编译模式。development 不会压缩代码。production会压缩代码
    mode: 'development'
};