const app = getApp()
const store = require("../../utils/store.js")
const config = require('../../utils/config.js')
const http = require("../../utils/gethttp.js")
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgcode: "",
    inputphone: '',
    inputcode: '',
    inputImg: '',
    isSend: true,
    count: 60,
    key: "",
  },

  tohome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**倒记时 */
  gotime() {
    var trime = setInterval(() => {
      console.log('0909')
      let countDown = --this.data.count;
      if (countDown <= 0) {
        clearInterval(trime);
        this.setData({
          isSend: true,
        })
      } else {
        this.setData({
          count: countDown,
          isSend: false,
        })
      }
    }, 1000);
  },
  //失去焦点时触发，获取图形验证码
  bindKeyInput2(e) {
    this.setData({
      inputImg: e.detail.value
    })
    wx.setStorage({
      key: "inputImg",
      data: this.data.inputImg
    })
  },
  //失去焦点时触发，获取验证码
  bindKeyInput1(e) {
    this.setData({
      inputcode: e.detail.value
    })
    wx.setStorage({
      key: "codeinput",
      data: this.data.inputcode
    })
  },
  //失去焦点时触发，获取手机号
  bindKeyInput(e) {
    this.setData({
      inputphone: e.detail.value
    })
    wx.setStorage({
      key: "phoneNumber",
      data: this.data.inputphone
    })
  },
  //获取图形验证码
  getimg() {
    wx.request({
      method: 'POST',
      url: http.baseURL2,
      header: {
        'content-type': 'application/json',
        'deviceid': 'weapp',
        'devicetype': "3",
        'appversion': 'v0.1.20190730',
      },
      data: {
        "method": "Common/getVerifcode",
      },
      success: res => {
        this.setData({
          imgcode: 'data:image/jpg;base64,' + res.data.data.image,
          key: res.data.data.key,
        })
        console.log(res.data.data, '9999')
      },
    })
  },
  //短信验证码
  getcode() {
    wx.request({
      method: 'POST',
      url: http.baseURL2,
      header: {
        'content-type': 'application/json',
        'deviceid': 'weapp',
        'devicetype': "3",
        'appversion': 'v0.1.20190730',
      },
      data: {
        mobile: this.data.inputphone,
        send_id: 10001,
        code_key: this.data.key,
        code: this.data.inputImg,
        method: "Common/sendSms",
      },
      success: res => {
        if (res.data.status == 1 && res.data.code == 200) {
          this.gotime()
          http.showtoast(res.data.msg, "none")
          console.log('0000')
        }
        if (res.data.status == 0) {
          http.showtoast(res.data.msg, "none")
          this.setData({
            count: 60,
          })
          this.getimg()
        }

      }
    })
  },
  // 绑定手机号事件
  formSubmit() {
    wx.showNavigationBarLoading()
    console.log("绑定手机，openid：", app.globalData.mini_openid)
    let signature = app.globalData.timestamp + 'abc'
    wx.request({
      method: 'POST',
      url: http.baseURL2 + "WechatLogin/bindMobile", //开发
      header: {
        'content-type': 'application/json',
        'deviceid': 'weapp',
        'devicetype': "3",
        'appversion': 'v0.1.20190730',
        'timestamp': app.globalData.timestamp,
        'signature': signature,
      },
      data: {
        mobile: this.data.inputphone,
        verify: this.data.inputcode,
        openid: app.globalData.mini_openid
      },
      success: res => {
        if (res.data.code === 200) {
          store.setItem("mini_token", res.data.data.token)
          app.globalData.mini_token = res.data.data.token
          http.header.token = res.data.data.token
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  },

  onLoad: function() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    this.getimg()
  },

})