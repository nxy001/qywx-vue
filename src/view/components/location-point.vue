<!--
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-22 16:53:48
 * @LastEditTime: 2022-03-03 15:44:30
 * @Description: 获取经纬度
 * @FilePath: \qywx-test\src\view\components\location-point.vue
-->
<template>
  <div id="check-user">
    <div class="head">获取经纬度信息</div>
    <div class="exam-body">
      <section>
        <button @click="openMap">地图定位</button>
        <button @click="getLocation">获取经纬度</button>
        <div class="content" v-show="lonlat">
          {{ lonlat }}
        </div>
      </section>
    </div>
  </div>
</template>

<script>
const basePath = "http://xzdz.yinhaiyun.com/houtai";
export default {
  name: "",
  components: {},
  data() {
    return {
      lonlat: ""
    };
  },
  mounted() {
    const location = window.location.href.split("#")[0];
    this.$axios
      .post(basePath + "/api/message/sign", {
        url: location
      })
      .then(res => {
        debugger;
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.corpid, // 必填，企业微信的corpID
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signStr, // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: ["getLocation", "openLocation"] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    /**
     * 调用js-sdk 打开一个地图
     * 传参有对应点位的经纬度 地址名称  地址 地图缩放级别
     */
    openMap() {
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["openLocation", "getLocation"], // 需要检测的JS接口列表
          success: function(res) {
            wx.getLocation({
              type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function(res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                setTimeout(() => {
                  wx.openLocation({
                    latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                    longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                    name: "我的位置", // 位置名
                    address: "我的位置", // 地址详情说明
                    scale: 12 // 地图缩放级别,整形值,范围从1~28。默认为16
                  });
                }, 2000);
              }
            });
          }
        });
      });
    },
    /**
     * 获取手机当前位置
     *
     */
    getLocation() {
      const _this = this;
      wx.ready(function() {
        wx.invoke(
          "startAutoLBS",
          {
            type: "gps84" // wgs84是gps坐标，gcj02是火星坐标
          },
          function(res) {
            if (res.err_msg == "startAutoLBS:ok") {
              //调用成功
              
              wx.onLocationChange(function(res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                _this.lonlat += "经纬度:" + longitude+","+latitude;
              });
            } else {
              //错误处理
            }
          }
        );
        
      });
    }
  }
};
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
    overflow-y: auto;
    .user-info {
      margin: 0.08rem 0;
    }
  }

  section {
    width: 100%;
    button {
      display: inline-block;
      width: 60%;
      margin: 0.2rem 0;
      margin-left: 20%;
      border: 0;
      background: rgb(32, 144, 209);
      color: #fff;
      border-radius: 0.03rem;
      height: 0.34rem;
      line-height: 0.34rem;
      cursor: pointer;
    }
  }
}
</style>
