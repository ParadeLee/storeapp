import Vue from 'vue'
import VueRooter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRooter)

// 导入store
import store from '@/store'

// 原型方法重写
let originPush = VueRooter.prototype.push
VueRooter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router =  new VueRooter({
    routes, // 对象kv一致可以省略v
    scrollBehavior(to, from, savePosition) {
        return { y: 0 } // top没有效果
    },
})

router.beforeEach(async (to, from, next)=>{
    // next放行函数，next()
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token){
        // 用户不能去login
        if(to.path == '/login'){
            next('/home')
        }else{
            // 代表用户登录，且不是去的login
            if(name){
                next()
            }else{
                // 登录了！但没有信息时，先派发信息
                try {
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                   // token过期
                   // 清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    }else{
        // 未登录,不能去交易相关，不能去支付相关，不能去个人中心
        let topath = to.path
        if(topath.indexOf('/trade') != -1 || topath.indexOf('/pay') != -1){
            next('/login?redirect=' + topath) // 通过query参数储存想去的地址
        }else{
            next()
        }
    }
})

export default router