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
        getWxPayInfo: state => state.requestList.getWxPayInfo,
        getScheduledDateInfo: state => state.requestList.getScheduledDateInfo,

        getwxconfigInfo: state => state.requestList.getwxconfigInfo,
        setCardIdRecordInfo: state => state.requestList.setCardIdRecordInfo,
        setCardIdStatusInfo: state => state.requestList.setCardIdStatusInfo,
        getCardConfigInfo: state => state.requestList.getCardConfigInfo,
        setAcrdTypeInfo: state => state.requestList.setAcrdTypeInfo,
        getCardBookingInfo: state => state.requestList.getCardBookingInfo
    }
})
