import Vue from 'vue'
// 按需引入element-UI
import { Icon, MessageBox, Form } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// 三级联动组件————注册为全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图全局组件
import Carousel from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
// 第一个参数：全局组件的名字；第二个参数：哪一个组件(全局组件)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.use(Icon)
Vue.use(Form)

// UI组件可以挂摘在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

// // 测试
// import {reqGetSearchInfo} from '@/api'
// reqGetSearchInfo({}); // 发送网络请求

// mock数据，引入执行一次
import "@/mock/mockServe"

// 引入轮播图插件，swiper样式
import "swiper/css/swiper.css"

// 统一接口api文件夹里的全部请求函数(统一引入)
import * as API from '@/api'

// 引入表单验证插件

new Vue({
  render: h => h(App),
  // 创建全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this // 事件总线
    Vue.prototype.$API = API // 将所有组件实例上加入$api属性
  },
  // 注册路由
  router,
  // 注册仓库,组件示例上会多出$store属性
  store,
}).$mount('#app')
