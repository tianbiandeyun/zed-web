let setHtmlFontSize = () => {
    // 设计稿默认基准字体
    const fontSize = 10;
    // 设计稿宽度
    const draftWidth = 1920;
    // 设备的宽度
    let systemWidth = document.documentElement.clientWidth;
    let htmlFontSize = (fontSize * (systemWidth / draftWidth) > 40 ? 40 + 'px' : (fontSize * (systemWidth / draftWidth) + 'px'));
    document.documentElement.style.fontSize = htmlFontSize;
};

window.addEventListener('load', setHtmlFontSize);
window.addEventListener('resize', setHtmlFontSize);