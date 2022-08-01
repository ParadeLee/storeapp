// 引入路由组件
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        // 二级路由
        children:[
            {
                
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                // 路由重定向
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            if(from.path == '/tarde'){
                next()
            }else{
                next(false)
            }

        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            if(from.path == '/shopcart'){
                next()
            }else{
                next(false)
            }

        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name:'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/home',
        component: ()=> import("@/pages/Home"),// 路由懒加载，按需加载 十分重要！！！
        // 路由元信息key不能瞎写；只能叫meta
        meta: { show: true }
    },
    {
        path: '/search/:keyword?', // 占位符用于传递params参数,注意务必加上？表示参数可以省略
        // path: '/search',
        name: "search",
        component: ()=> import("@/pages/Search"),
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false },
    },
    {
        path:'/detail/:skuId?',
        component: Detail,
        meta: { show: true },
    },
    // 重定向
    {
        path: '*',
        redirect: "/home"
    }
]