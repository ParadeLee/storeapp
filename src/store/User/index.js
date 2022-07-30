import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout} from '@/api'
import {getToken, removeToken, setToken} from '@/utils/token'

const state = {
    code:'',
    token: getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state, code){
        state.code = code
    },
    USERLOGIN(state, token){
        state.token = token
    },
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo //
    },
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    async getCode({commit}, phone){
        let result = await reqGetCode(phone)
        if (result.code == 200){
            commit('GETCODE', result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async userRegister({commit}, user){
        let result = await reqUserRegister(user)
        // console.log(result);
        if (result.code == 200){
            return 'yes'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务
    async userLogin({commit}, user){
        let result = await reqUserLogin(user)
        // 服务器下发token，用户唯一标识符
        // console.log(result);
        if(result.code == 200){
            commit('USERLOGIN', result.data.token)
            // 本地持久缓存token
            setToken(result.data.token)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO', result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 该操作只是向服务器发起请求，通知服务器清除token
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'yes'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}

export default {
    state, 
    mutations, 
    actions, 
    getters
}