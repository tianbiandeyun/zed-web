import unit from '../unit/unit'
import {showLoading, hideLoading} from '../src/components/defaultLoading/defaultLoading'

const install = Vue => {
    Vue.prototype.$unit = unit;

    Vue.prototype.$showLoading = showLoading;
    Vue.prototype.$hideLoading = hideLoading;
};

export default install
