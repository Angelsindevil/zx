// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import draggable from 'vuedraggable'
// import Echarts from 'vue-echarts'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import store from './vuex/store'

// const App = resolve => require(['./App'], resolve)
// const router = resolve => require(['./router'], resolve)
// const VueRouter = resolve => require(['./vue-router'], resolve)
// const Echarts = resolve => require(['./vue-echarts'], resolve)
// const VueCookie = resolve => require(['./vue-cookie'], resolve)
// const ElementUI = resolve => require(['./element-ui'], resolve)
// const store = resolve => require(['./vuex/store'], resolve)

Vue.use(ElementUI);
// Vue.use(VueRouter);
Vue.use(VueCookie);
/* eslint-disable no-new */
Vue.component('draggable', require('vuedraggable'));
Vue.component('chart',require('vue-echarts'));
// var ECharts = require('vue-echarts');
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
  draggable,
})
