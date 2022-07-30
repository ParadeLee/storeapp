<template>
  <div>
    <!-- 三级联动已注册为全局组件，因此不需要再引入 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank/>
    <Like/>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"/>
    <!-- <Floor/> -->
    <Brand/>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer"
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    // 派发action，获取floor组件中的数据
    this.$store.dispatch("getFloorList")
    // 获取用户的首页信息
    // this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
};
</script>

<style>
</style>