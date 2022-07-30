import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);

// const state = {}
// //仓库存储数据的地方 
// const actions = {};
// // 处理action，书写业务逻辑也可以处理异步
// const mutations = {};
// // 修改state的唯一手段
// const getters = {};
// // 可以理解为计算属性，简化仓库
import home from "./Home";
import search from "./Search";
import detail from "./Detial"
import shopcart from "./ShopCart";
import user from "./User"
import trade from "./Trade"
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})