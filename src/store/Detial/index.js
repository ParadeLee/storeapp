import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from "@/utils/uuid_token"
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo){
        state.goodInfo = goodInfo
    },
}
const actions = {
    async getGoodInfo({commit}, skuId){
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    // 加入购物车 修改某个产品的个数
    async addOrUpdateShopCart({commit}, {skuId, skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 当前函数返回promise
        if(result.code == 200) {
            return
        }else{
            // 代表添加购物车失败
            return Promise.reject(new Error('faile'))
        }
     }
}
const getters = {
    categoryView(state){
        // state.goodInfo初始状态下是一个空对象，是undefined; 故至少返回一个空对象
        return state.goodInfo.categoryView || {}
    }, 
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }

}

export default {
    state, 
    mutations, 
    actions, 
    getters
}