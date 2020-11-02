import * as config from '../unit/config'
import unit from '../unit/untils'
import loading from '../components/loading/loading'

const install = Vue => {

    Vue.prototype.$config = config;
    Vue.prototype.$unit = unit;

    Vue.component('loading', loading);
};

export default install;