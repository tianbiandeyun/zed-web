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
        getPlayerInfot: state => state.requestList.getPlayerInfot,
        storageAnswerResultInfo: state => state.requestList.storageAnswerResultInfo,
        setFinalResultInfo: state => state.requestList.setFinalResultInfo,
        getFinalResultInfo: state => state.requestList.getFinalResultInfo,
        isPlayMusic: state => state.requestList.isPlayMusic
    }
})
