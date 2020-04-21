const util = require("../utils/util.js")
// const CONFIG = require('../utils/config.js')

var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isshowphoneBtn: false,
    inputValue: ''
  },
  //账号登录
  bindgetToken() {
    app.we_getToken(callback => {
      console.log("重来没登录过")
      this.setData({
        isshowphoneBtn: true
      })
    })
  },
  //失去焦点时触发，获取手机号
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //获取验证码
  getcode() {
    app.we_request({
        "method": 'Common/sendSms',
        "mobile": this.data.inputValue,
        "send_id": 10003,
        "openid": app.globalData.mini_openid
      },
      res => {
        console.log(res)
      })
  },
  // 绑定手机号事件
  formSubmit(e) {
    app.we_request({
        "method": "WechatLogin/bindMobile",
        "mobile": e.detail.value.phoneinput,
        "verify": e.detail.value.codeinput,
        "openid": app.globalData.mini_openid
      },
      res => {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
      },
      "/WechatLogin/bindMobile")
  },
  //用户拒绝后再次打开授权页面
  toUserDetting() {

  },
  // 获取后台用户信息
  getPhpUserInfo() {
    util.we_request({
      "method": util.config.GETUSERINFO,
      },
      res => {
        console.log(res)
      })
  },
  //获取地址
  asd(){
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  //调用相机
  useCamera(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  onLoad: function() {
    // qqmapsdk = new QQMapWX({
    //   key: 'GBZBZ-7IOC6-H7PSH-MOUPL-6WZTZ-2FBOE'
    // });
  },
  onShow:function(){
    // qqmapsdk.search({
    //   keyword: '酒店',
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   },
    //   complete: function (res) {
    //     console.log(res);
    //   }
    // });
  }

})