import Vue from 'vue'
import Vuex from 'vuex'
import requestList from './modules/requestList'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        requestList
    },
    getters: {
        getCrawlerDataInfo: state => state.requestList.getCrawlerDataInfo,
        getStatusCountInfo: state => state.requestList.getStatusCountInfo,
        getDisplayCountInfo: state => state.requestList.getDisplayCountInfo,
        getContentInfo: state => state.requestList.getContentInfo,
        setStatusInfo: state => state.requestList.setStatusInfo,
        isSignInInfo: state => state.requestList.isSignInInfo,
        setSignOutInfo: state => state.requestList.setSignOutInfo,
        getUserInfoInfo: state => state.requestList.getUserInfoInfo,
        getKeyWordInfo: state => state.requestList.getKeyWordInfo,
        getKeyWordCountInfo: state => state.requestList.getKeyWordCountInfo,
        isHasAuditRightInfo: state => state.requestList.isHasAuditRightInfo

    }
})
