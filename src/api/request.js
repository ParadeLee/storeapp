// 对axios二次封装
import axios from "axios";
// 引入进度条组件
import nprogress from "nprogress";

// 在当前模块中引入store
import store from "@/store"; 
import "nprogress/nprogress.css" // 引入样式c l
// start进度条开始 done进度条结束

const requests = axios.create({
    baseURL: "/api",
    timeout: 5000, //请求超时的事件
});

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // config中的header请求头很重要
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段，和和后端协商
        config.headers.userTempId = store.state.detail.uuid_token
    }

    //用户登录时需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }

    nprogress.start();
    return config;
})
// 相应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数，服务器响应数据回来以后可以检测到，增加回调
    nprogress.done();
    return res.data;
},(error)=>{
    // 响应失败的回调函数
})

export default requests