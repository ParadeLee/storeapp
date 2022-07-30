// 对axios二次封装
import axios from "axios";
// 引入进度条组件
import nprogress from "nprogress";
import "nprogress/nprogress.css" // 引入样式c l
// start进度条开始 done进度条结束

const requests = axios.create({
    baseURL: "/mock",
    timeout: 5000, //请求超时的事件
});

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // config中的header请求头很重要
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