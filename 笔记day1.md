1）开发Search模块中的TypeNav商品分类菜单（过度动画效果）
过渡动画：前提 组件｜元素务必要有v-if｜v-show指令才可以进行过渡动画
进入阶段：
离开阶段：

2）合并params和query参数

3)开发Home首页中的ListContainer组件和Floor组件
### mock模拟数据 需要用到mock.js
前端的mock数据不会和服务器进行通信,
使用步骤：
1. 在项目src中创建mock文件夹
2. 准备json数据（文件夹中创建相应的json文件）
3. 注意点：把mock数据需要的图片放置到public文件夹中（public中的文件会原封不动打包）
4. 创建mockServer.js通过mockjs插件实现数据模拟
5. mockSever.js文件在入口文件中引入（执行一次）

*数据监听，监听已有数据的变化（$nextTick调用情况：一般是当插件调用 需要有完整dom结构 时使用）*

## Search模块开发
1. 静态页面+静态页面拆分
2. 发请求（api）
3. Vuex（三步骤）
4. 组件获取仓库数据，动态展示


*****************
排序操作：1:综合；2:价格；asc:升序；desc:降序
1. 谁应该有


## 分页功能实现：
由于数据量大；自定义分页功能

需要什么数据条件：1.需要知道当前是第几页pageNo 2.每一页需要展示的数据pageSize 3.一共有多少条数据total
4. 需要知道分页器连续页面个数5｜7（奇数）continues

实现步骤：
1. 先传自定义数据调试，实现功能
2. 重点难点：算出连续页面起始数字和结束数字