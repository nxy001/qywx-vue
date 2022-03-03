<!--
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-22 16:53:48
 * @LastEditTime: 2022-03-03 17:04:34
 * @Description: 获取经纬度
 * @FilePath: \qywx-test\src\view\components\upload-file.vue
-->
<template>
  <div id="check-user">
    <div class="head">上传文件</div>
    <div class="exam-body">
      <section>
        <button @click="chooseImage">上传图片</button>
        <br>
        <img v-for="(item,index) in imgIds" :src="item" @click="preImage(item)" :key="index" style="max-width:100%;max-height:100px" alt="">
        <br>
        <button @click="uploadImage">上传图片</button>
        <button @click="downloadImage">下载图片</button>
        <button @click="previewFile">文件预览</button>
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
      imgIds: "",
      serverId: '',
      downImageUrl: '', // 下载的图片路径
    };
  },
  mounted() {
    const location = window.location.href.split("#")[0];
    this.$axios
      .post(basePath + "/api/message/sign", {
        url: location
      })
      .then(res => {
        wx.config({
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.corpid, // 必填，企业微信的corpID
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signStr, // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: [
            "chooseImage",
            "previewImage",
            "uploadImage",
            "downloadImage",
            "previewFile",
          ] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
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
    chooseImage() {
      const _this = this
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["chooseImage"], // 需要检测的JS接口列表
          success: function(res) {
            wx.chooseImage({
              count: 3, // 默认9
              sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
              defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
              isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
              success: function(res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表
                _this.imgIds = localIds
                // andriod中localId可以作为img标签的src属性显示图片；
                // iOS应当使用 getLocalImgData 获取图片base64数据，从而用于img标签的显示（在img标签内使用 wx.chooseImage 的 localid 显示可能会不成功）
              }
            });
          }
        });
      });
    },
    /**
     * 图片预览
     */
    preImage (info) {
      wx.previewImage({
          current: info, // 第一张显示的图片链接
          urls: this.imgIds // 需要预加载的图片http链接列表，预加载后，可以滑动浏览这些图片
      });
    },
    /**
     * 上传图片
     *
     */
    uploadImage() {
      const _this = this
      wx.uploadImage({
        localId: this.imgIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            _this.serverId = res.serverId; // 返回图片的服务器端ID
        }
      });
    },
    /**
     * 下载图片
     *
     */
    downloadImage() {
      const _this = this
      alert(this.serverId)
      wx.downloadImage({
        serverId: this.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            _this.downImageUrl = res.localId; // 返回图片下载后的本地ID
            alert(res.localId)
        }
      });
    },
    /**
     * 图片预览
     */
    previewFile(){
      wx.previewFile({
        url: 'http://open.work.weixin.qq.com/wwopen/downloadfile/wwapi.zip', // 需要预览文件的地址(必填，可以使用相对路径)
        name: '测试文件预览', // 需要预览文件的文件名，必须有带文件格式的后缀，例如.doc(不填的话取url的最后部分，最后部分是个包含格式后缀的文件名)
        size: 22189 // 需要预览文件的字节大小(必填，而且大小必须正确，否则会打开失败)
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
