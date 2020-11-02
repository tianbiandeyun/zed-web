import Vue from 'vue'
import Vuex from 'vuex'
import requestList from './modules/requestList'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        requestList
    },
    getters: {
        getOpenidInfo: state => state.requestList.getOpenidInfo,
        setAcrdTypeInfo: state => state.requestList.setAcrdTypeInfo,
        getAcrdStockInfo: state => state.requestList.getAcrdStockInfo,
        getCardConfigInfo: state => state.requestList.getCardConfigInfo
    }
})
