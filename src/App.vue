<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer,
  },
  mounted(){
    // 通知Vuex发请求，获取数据，存储于仓库
    // 派发一个action||获取商品的三级列表存储在vuex
    this.$store.dispatch("categoryList");
  }
}
</script>

<style lang="less" scoped>
</style>
