<!--
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-22 16:24:14
 * @LastEditTime: 2022-02-25 09:03:58
 * @Description: desc
 * @FilePath: \qywx-test\src\view\main.vue
-->
<template>
  <div id="main-box">
      <div class="head">企业前端微信预研</div>
      <div class="main-content">
          <ul>
              <li v-for="(item, index) in modulePart" :key="index" @click="locationTo(item)">{{item.name}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'mainVue',
  components: {},
  data () {
    return {
      modulePart: [
        {
          name: '身份验证',
          id: 'checkUser'
        },
        {
          name: '获取用户信息',
          id: 'getUser'
        },
        {
          name: '手机上传附件',
          id: 'uploadFile'
        },
        {
          name: '定位及巡防',
          id: 'locationPoint'
        },
        {
          name: '视频通话解决方案',
          id: 'videoPart'
        },
        {
          name: '消息通知',
          id: 'sendMsg'
        }
      ]
    }
  },
  mounted () {

  },
  methods: {
    locationTo (item) {
      this.$router.push({
        path: '/' + item.id
      })
    }
  }
}
</script>

<style lang="less">
* {
    box-sizing: border-box;
}
#main-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #b4c8ce;
    padding: 0.2rem;
    .head {
        width: 100%;
        font-size: 0.18rem;
        font-weight: bold;
    }

    ul {
        padding: 5px;
        margin: 0 0 10px;
        li {
            position: relative;
            text-align: left;
            color: #000;
            margin: 10px 0;
        }
    }
}
</style>
