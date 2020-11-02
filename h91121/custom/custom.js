import unit from '../unit/unit'

const install = Vue => {
    Vue.prototype.$unit = unit;
};

export default install
