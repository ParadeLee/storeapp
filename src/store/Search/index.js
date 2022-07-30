import {reqGetSearchInfo} from '@/api'
const state = {
    // 视传回的数据类型而定
    searchList: {},
}
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    },
}
const actions = {
    // 获取search模块数据
    async getSearchList({commit}, params={}){ // 默认参数
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code == 200){
            commit("GETSEARCHLIST", result.data)
        }
    },
}
// 计算属性，在项目中为简化数据而生
const getters = {
    // state是当前仓库的值
    goodsList(state){
        // 如果没有网络，返回数据为空对象，以防万一
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList|| [] 
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}