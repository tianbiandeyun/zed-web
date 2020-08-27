import Alert from './alert.vue'
import Vue from 'vue'

Alert.newInstance = (props) => {

    // 实列化
    const Instance = new Vue({
        render(h) {
            return h(Alert, {
                props: props || {}
            })
        }
    });

    // 手动渲染组件，但是还没有显示出来
    const comp = Instance.$mount();

    // 将实列化的 Alert 添加到 body 中
    document.body.appendChild(comp.$el);

    // 访问到 Alert 实列
    const _Alert = Instance.$children[0];

    return {
        show() {
            _Alert.show();
        }
    }
};

// getMessageInstance 函数用来获取实例，它不会重复创建，如果 messageInstance 已经存在，就直接返回了，
// 只在第一次调用 Notification 的 newInstance 时来创建实例。

// 注意会导致一个问题。就是如果不重新创建组件，则传入的新数据无法更新
// let messageInstance;
//
// let getMessageInstance = (props) => {
//     messageInstance = messageInstance || Alert.newInstance(props);
//     return messageInstance;
// };

export default {
    show(props) {
        Alert.newInstance(props).show();
    }
};