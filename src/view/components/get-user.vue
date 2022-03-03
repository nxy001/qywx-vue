<!--
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-22 16:53:48
 * @LastEditTime: 2022-03-02 15:37:05
 * @Description: 获取用户信息
 * @FilePath: \qywx-test\src\view\components\get-user.vue
-->
<template>
  <div id="check-user">
      <div class="head">获取用户信息</div>
      <div class="exam-body">
        <section>
              <div class="h-l-2">根据用户userid 获取用户详情</div>
              <input type="text" placeholder="请填写用户userid" v-model="userId">
              <button @click="queryUserDetail">提交</button>

              <div class="h-l-2">用户详情:</div>
              <div class="content">
                <div class="user-info">
                  <label>姓名:</label>
                  <span>{{userDetail.name||'暂无数据'}}</span>
                </div>
                <div class="user-info">
                  <label>性别:</label>
                  <span>{{userDetail.gender==='1'?'男':'女'}}</span>
                </div>
                <div class="user-info">
                  <label>手机:</label>
                  <span>{{userDetail.mobile||'暂无数据'}}</span>
                </div>
                <div class="user-info">
                  <label>地址:</label>
                  <span>{{userDetail.position||'暂无数据'}}</span>
                </div>
                <div class="user-info" style="display:flex" v-show="userDetail.thumb_avatar">
                  <label>头像:</label>
                  <img :src="userDetail.thumb_avatar||'暂无数据'" alt="">
                </div>
              </div>
        </section>
        <section class="section2">
              <div class="h-l-2">创建成员</div>
              <input type="text" placeholder="请填写所属部门" v-model="createUserObj.department">
              <input type="text" placeholder="请填写姓名" v-model="createUserObj.name">
              <input type="text" placeholder="请填写联系电话" v-model="createUserObj.mobile">
              <input type="text" placeholder="请填写邮件地址" v-model="createUserObj.email">
              <input type="text" placeholder="请填写userid" v-model="createUserObj.userid">
              <button @click="createUser">提交</button>
        </section>
        <section>
              <div class="h-l-2">根据ID 获取部门详情</div>
              <input type="text" placeholder="请填写部门id" v-model="department">
              <button @click="queryDepartList">提交</button>

              <div class="h-l-2">部门:</div>
              <div class="content" >
                <div style="width:100%;" v-for="(item,index) in departmentList" :key="index">
                   <div class="user-info" >
                    <label>id:</label>
                    <span>{{item.id||'暂无数据'}}</span>
                  </div>
                  <div class="user-info" >
                    <label>名称:</label>
                    <span>{{item.name||'暂无数据'}}</span>
                  </div>
                  <div class="user-info">
                    <label>排序:</label>
                    <span>{{item.order}}</span>
                  </div>
                   <div class="user-info">
                    <label>类型:</label>
                    <span>{{item.type}}</span>
                  </div>
                </div>
              </div>
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
      userId: 'nixiaoyao', // userid
      department: 2,
      userDetail: {},
      departmentList: [],
      urls: {
        userDetail: '/api/user/get',
        createUser: '/api/user/create',
        departmentList: '/api/department/list'
      },
      createUserObj: {
        department: [1],
        name: '',
        userid: '',
        email: '',
        mobile: ''

      }
    }
  },
  mounted () {

  },
  methods: {
    /**
     * 查询用户详情信息
     */
    queryUserDetail () {
      this.$axios.get(basePath + this.urls.userDetail + '?userid=' + this.userId, {
      }).then((data) => {
        const info = data.data
        if (info.errmsg === 'ok') {
          this.userDetail = info
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    /**
     * 创建用户
     */
    createUser () {
      alert('该功能需要配置通讯录的私有secret')
      this.$axios.post(basePath + this.urls.createUser, this.createUserObj).then((data) => {
        const info = data.data
        if (info.errmsg === 'ok') {
        }
      }).catch((e) => {
        console.log(e)
      })
    },
    /**
     * 查询用户详情信息
     */
    queryDepartList () {
      this.$axios.get(basePath + this.urls.departmentList + '?need_user=' + this.department, {
      }).then((data) => {
        const info = data.data
        if (info) {
          this.departmentList = info
        }
      }).catch((e) => {
        console.log(e)
      })
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
    .h-l-2 {
      width: 100%;
      font-size: 0.16rem;
      font-weight: bold;
      text-align: left;
      margin: 0.1rem 0;
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

    .section2 {
      input {
        display: inline-block;
        margin: 0.08rem 0;
      }
    }
}
</style>
