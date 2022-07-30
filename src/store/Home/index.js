import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
// Home模块仓库
const state = {
    // state根据接口的返回值类型进行初始化
    categoryList: [],
    bannerList: [], // 轮播图数据
    floorList: [],
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    // 通过api接口函数想服务器发请求， 获取服务器数据
    async categoryList(context) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            context.commit("CATEGORYLIST", result.data)
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    // 获取floor数组
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}