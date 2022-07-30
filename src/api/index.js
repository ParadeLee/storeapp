// Api统一管理
import requests from "./request";

// mock接口
import mockRequest from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get请求
//发请求:axios发送请求返回结果Promise对象

export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取banner轮播图接口
export const reqGetBannerList = () => mockRequest.get('/banner');

// 获取floor数据
export const reqFloorList = () => mockRequest.get('/floor');

// 获取搜索模块数据 地址：/api/list 请求方式post
// 当前这个接口给服务器传递参数的params至少是一个空对象，即调用时传入{}
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "post",
    data: params,
})

// 获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get',
})

// 将产品添加到购物车的接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})

// 获取购物车列表数据接口
export const reqCartList = () => requests({
    url: '/cart/cartList', 
    method: 'get'
})

// 删除购物车数据接口
export const reqDeleteCartById = (skuId) => requests({
    url:`/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 修改购物车商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked)=>requests({
    url:`/cart/checkCart//${skuId}/${isChecked}`,
    method:'get'
})

// 获取验证码操作
export const reqGetCode = (phone) => requests({
    url:`/user/passport/sendCode/${phone}`, 
    method:'get'
})

// 注册接口
export const reqUserRegister = (data) => requests({
    url:'/user/passport/register',
    data,
    method:'post',
})

// 登录接口
export const reqUserLogin = (data) => requests({
    url:'/user/passport/login',
    data,
    method:'post'
})

// 获取用户信息（需要用户带着token向服务器获取信息
export const reqUserInfo = () => requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

// 退出登录
export const reqLogout = () => requests({
    url:'/user/passport/logout',
    method:'get'
})

// 获取用户地址信息
export const reqAddressInfo = () => requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

//  获取商品清单
export const reqOrderInfo = () => requests({
    url:'/order/auth/trade',
    method:'get'
})

// 提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})

//获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

// 获取订单支付状态
// /payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})

// 获取个人中心数据
export const reqMyOrderList = (page, limit) => requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})