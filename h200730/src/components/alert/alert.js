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

export default {
    show(props) {
        Alert.newInstance(props).show();
    }
};