/*
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-22 16:07:38
 * @LastEditTime: 2022-02-24 09:25:26
 * @Description: desc
 * @FilePath: \qywx-test\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { computRem } from './utils/rem'
computRem(document, window, 375)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
