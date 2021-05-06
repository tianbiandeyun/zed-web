const {resolve} = require('path'); // node 的模块

// 用来打包 html 需要安装 html-webpack-plugin
const htmlWebpackPlugin = require('html-webpack-plugin');

// 将 css 提取成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // webpack 打包入口文件
    entry: './src/index.js',
    // 输出设置
    output: {
        // 输出文件名
        filename: "js/built.js",
        // 输出路径
        path: resolve(__dirname, 'build'),
        // 设置路径
        publicPath: "./"
    },
    // loader 设置
    module: {
        rules: [
            // 详细 loader 设置
            {
                test: /\.css$/,
                use: [
                    // 执行顺序 从下到上 从左到右
                    // 'style-loader',
                    // 将 css 提取成单独文件
                    MiniCssExtractPlugin.loader,
                    // css-loader 将 css 转换成 js 模块
                    'css-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    // 执行顺序 从下到上 从左到右
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png|git|jpeg)/,
                // 需要下载 url-loader file-loader 只能处理 背景图 无法处理 img 标签
                loader: 'url-loader',
                options: {
                    // 图片小于8kb，就会被 base64 处理
                    limit: 8 * 1024,
                    // usr-loader使用es6解析，html-loader使用的是commojs,关闭url-loader es6
                    esModule: false,
                    // 重命名 hash 值取前十位，ext 使用图片本身的扩展名
                    name: '[hash:10][ext]',
                    outputPath: 'images'
                }
            },
            {
                test: /\.html$/,
                // 负责处理 img 标签图片的，并不是字面意思说处理html文件
                loader: 'html-loader'
            },
            {
                exclude: /\.(css|js|html|less|jpg|png|git|jpeg)$/,
                // 处理其他资源
                loader: "file-loader",
                options: {
                    name: '[hash:10][ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        // 默认会创建一个空的html文件，引入打包输出的所有资源
        new htmlWebpackPlugin({
            // template 复制目标文件，并且引入打包输出的所有资源
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        })
    ],
    mode: 'development',
    // devServer 自动化编译，无需手动编译
    devServer: {
        // 需要安装 webpack-dev-server
        // 启动命令为 webpack server
        contentBase: resolve(__dirname, 'build'),
        // 启动 gzip 压缩
        compress: true,
        // 设置端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
};