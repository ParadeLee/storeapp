<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派，通过包裹div父盒子绑定相应事件||委托给父元素 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由跳转、传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                  <!-- 声明式导航会在一时间产生过多dom 造成卡顿 -->
                </h3>
                <!-- 二级三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import { debounce, throttle } from "@/static/load";
import throttle from "lodash/throttle"; // 节流方法引入
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    
    // 判断目录，在search路由下再隐藏， 
    if (this.$route.path!='/home'){
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 对象写法时， 右侧需要一个函数，当使用计算属性时，函数立即执行，注入state（为大仓库中的数据）
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // changeIndex(index){
    //   // 需要添加节流，避免浏览器卡顿
    //   this.currentIndex = index;
    //   console.log(this);
    // },
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path!='/home'){
        this.show = false; // 添加在search页面添加离开鼠标关闭导航 事件
      }
    },
    // 进行路由的转换
    goSearch(event) {
      // 编程式导航+事件委派
      // 1.如何知道点击的是a标签(添加自定义属性"categoryname")，2.如何区别是一级、二级标签()
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset;
      if (categoryname) {
        // 整理参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 需要加入判断，如果路由跳转时，需要带有params参数
        if(this.$route.params){
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    enterShow(){
      this.show = true;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: red;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态
    .sort-enter{
      height: 0px;
      // transform: rotate(0deg);
    }
    // 过渡动画结束状态
    .sort-enter-to{
      height: 461px;
      // transform: rotate(360deg);
    }
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>