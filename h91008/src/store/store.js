import Vue from 'vue'
import Vuex from 'vuex'
import requestList from './modules/requestList'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        requestList
    },
    getters: {
        openidInfo: state => state.requestList.openidInfo,
        phoneCodeInfo: state => state.requestList.phoneCodeInfo,
        adduserInfo: state => state.requestList.adduserInfo,
        cardConfigInfo: state => state.requestList.cardConfigInfo,
        setCardRecordInfo: state => state.requestList.setCardRecordInfo,
        hasCardRecordInfo: state => state.requestList.hasCardRecordInfo,
        weiXinPayInfo: state => state.requestList.weiXinPayInfo,
        setPaymentRecordInfo: state => state.requestList.setPaymentRecordInfo,
        hasPaymentRecordInfo: state => state.requestList.hasPaymentRecordInfo
    }
})
