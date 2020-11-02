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
        getplayerInfo: state => state.requestList.getplayerInfo,
        getwxconfigInfo: state => state.requestList.getwxconfigInfo,
        isShareRecordInfo: state => state.requestList.isShareRecordInfo,
        followRecordInfo: state => state.requestList.followRecordInfo,
        addShareRecordInfo: state => state.requestList.addShareRecordInfo,
    }
})
