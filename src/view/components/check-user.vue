<!--
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-22 16:53:48
 * @LastEditTime: 2022-03-03 14:50:04
 * @Description: 验证用户信息
 * @FilePath: \qywx-test\src\view\components\check-user.vue
-->
<template>
  <div id="check-user">
      <div class="head">验证用户信息</div>
      <div class="exam-body">
        <section>
            <button @click="webLogin">网页授权登录</button>
            <button @click="scanCode">扫码授权登录</button>
        </section>
      </div>
  </div>
</template>

<script>
const basePath = 'http://xzdz.yinhaiyun.com/houtai'
export default {
  name: 'checkUser',
  components: {},
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {  
    /**
     * 网页授权登录
     */
    webLogin () {
      this.$axios( basePath+'/loginWeb').then((res) => {
        window.location.href = res.data
      })
      

    },
    /**
     * 扫码授权登录
     */
    scanCode () {
      window.location.href = 'http://xzdz.yinhaiyun.com/houtai/login'
    }
  }
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
#check-user {
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 0.2rem;
    .head {
      width: 100%;
      font-size: 0.2rem;
      text-align: center;
      font-weight: bold;
    }
    .content {
      width: 100%;
      border-radius: 0.03rem;
      border: 1px solid #ccc;
      padding: 0.1rem;
      .user-info {
        margin: 0.08rem 0;
      }
    }

    section {
      width: 100%;
      button {
        display:inline-block;
        width: 60%;
        margin: 0.2rem 0;
        margin-left: 20%;
        border: 0;
        background: rgb(32, 144, 209);
        color: #fff;
        border-radius: 0.03rem;
        height:0.34rem;
        line-height: 0.34rem;
        cursor: pointer;
      }
    }
}
</style>
