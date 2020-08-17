const path = require('path');
module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            'preProcessor': 'less', // 预处理器的类型
            'patterns': [
                path.resolve(__dirname, './src/assets/css/default.less'), // 本地样式路径
            ]
        }
    },
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static'
};