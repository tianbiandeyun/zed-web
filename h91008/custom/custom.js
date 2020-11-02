import unit from '../unit/unit'
import tip from '../src/components/tip/tip'
import {showLoading, hideLoading} from '../src/components/defaultLoading/defaultLoading'

const install = Vue => {
    Vue.prototype.$unit = unit;
    Vue.prototype.$tip = tip;
    Vue.prototype.$showLoading = showLoading;
    Vue.prototype.$hideLoading = hideLoading;
};

export default install
