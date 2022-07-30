import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
const state = {
    cartList: [],
}
const mutations = {
    GETCARTLIST(state, cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({commit}){
        let result = await reqCartList()  
        if(result.code == 200){
            commit("GETCARTLIST", result.data)
        }
    },
    async deleteCartListBySkuId({commit}, skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车商品选中状态
    async updateCheckedById({commit}, {skuId, isChecked}){
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }, 
    deleteAllCheckedCart({dispatch, getters}){ // context就是当前仓库的小仓库版本， 里面包含了dispatch，getters（）
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let result = item.isChecked == 1? dispatch('deleteCartListBySkuId', item.skuId):''
            PromiseAll.push(result)
        })
        return Promise.all(PromiseAll)
    },
    // 设置购物车全选按钮
    updateAllChecked({dispatch, state}, isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let result = dispatch('updateCheckedById', {skuId: item.skuId, isChecked})
            PromiseAll.push(result)
        })
        return Promise.all(PromiseAll)
    } 
}
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}