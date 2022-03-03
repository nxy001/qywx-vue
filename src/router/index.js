/*
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-22 16:07:38
 * @LastEditTime: 2022-03-03 16:08:26
 * @Description: desc
 * @FilePath: \qywx-test\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import main from '@/view/main'
import getUser from '@/view/components/get-user'
import checkUser from '@/view/components/check-user'
import sendMsg from '@/view/components/send-msg'
import locationPoint from '@/view/components/location-point'
import uploadFile from '@/view/components/upload-file'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: main
    },
    {
      path: '/getUser',
      name: 'getUser',
      component: getUser
    },
    {
      path: '/checkUser',
      name: 'checkUser',
      component: checkUser
    },
    {
      path: '/sendMsg',
      name: 'sendMsg',
      component: sendMsg
    },
    {
      path: '/locationPoint',
      name: 'locationPoint',
      component: locationPoint
    },
    {
      path: '/uploadFile',
      name: 'uploadFile',
      component: uploadFile
    }
  ]
})
