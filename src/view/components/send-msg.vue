<!--
 * @Author: NIXY
 * @LastEditors: NIXY
 * @Date: 2022-02-22 16:53:48
 * @LastEditTime: 2022-03-03 17:39:37
 * @Description: 验证用户信息
 * @FilePath: \qywx-test\src\view\components\send-msg.vue
-->
<template>
  <div id="check-user">
    <div class="head">验证用户信息</div>
    <div class="exam-body">
      <section>
        <button @click="
            () => {
              this.sendTextMsg('text');
            }
          ">发送文字消息</button>
        <button @click="sendImgMsg">发送图片消息</button>
        <button
          @click="
            () => {
              this.sendTextMsg('textcard');
            }
          "
        >
          文本卡片消息
        </button>
      </section>
    </div>
  </div>
</template>

<script>
const basePath = "http://xzdz.yinhaiyun.com/houtai";
export default {
  name: "checkUser",
  components: {},
  data() {
    return {
      url: "/api/message/send",
      uploadUrl: "/api/media/upload",
      file: ""
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
          jsApiList: ["chooseImage", "uploadImage"] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    /**
     * 发送文字消息
     */
    sendTextMsg(type, picId) {
      const form = {
        touser: "@all",
        msgtype: type,
        text: {
          content:
            '<a href="http://xzdz.yinhaiyun.com/#/sendMsg">企业微信预研  文字类消息通知发送测试</a>'
        },
        safe: 0,
        enable_id_trans: 0,
        enable_duplicate_check: 0,
        duplicate_check_interval: 1800
      };
      switch (type) {
        case "text":
          form.text = {
            content:
              '<a href="http://xzdz.yinhaiyun.com/#/sendMsg">企业微信预研  文字类消息通知发送测试</a>'
          };
          break;
        case "iamge":
          form.image = {
            media_id: picId
          };
          break;
        case "textcard":
          form.textcard = {
            title: "测试消息",
            description:
              '<div class="gray">2016年9月26日</div> <div class="normal">卡片消息测试：xxxx</div><div class="highlight">请忽略此消息</div>',
            url: "URL",
            btntxt: "更多"
          };
          break;
      }
      this.$axios
        .post(basePath + this.url, {
          form
        })
        .then(data => {
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    /**
     * 发送图片消息
     */
    sendImgMsg() {
      const _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
        isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表
          wx.uploadImage({
            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res1) {
              alert(res1.serverId)
              _this.sendTextMsg("image", res1.serverId);
            }
          });
        }
      });
    },
    /**
     * 上传图片
     */
    uploadImage() {
      // 上传图片素材
      this.$axios
        .post(basePath + this.uploadUrl, {
          type: "image",
          files: this.file
        })
        .then(data => {
          debugger;
          console.log(data);
        })
        .catch(e => {
          debugger;
          console.log(e);
        });
    },
    update(e) {
      debugger;
      this.file = e.target.files[0];
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
