// pages/zindex/zindex.js

//获取应用实例
const app = getApp()
let store = require("../../utils/store.js")
const http = require("../../utils/gethttp.js")
const config = require('../../utils/config.js');
const util = require('../../utils/util.js')
Page({
  data: {
    userId: store.getItem("userId"),
    bind_mobile: store.getItem("bind_mobile")
  },
  // 获取登录的code
  getSession() {
    wx.login({
      success: res => {
        app.globalData.mini_code = res.code
        wx.getSetting({ // 用户授权
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              console.log("进入scope.userInfo, 证明用户已授权")
              wx.getUserInfo({
                success: res => {
                  util.we_setStorage("userinfo", res)
                  app.globalData.signature = res.signature
                  wx.request({
                    method: 'POST',
                    url: http.baseURL2 + "WechatLogin/getToken",
                    header: {
                      'content-type': 'application/json',
                      'deviceid': 'weapp',
                      'devicetype': "3",
                      'appversion': 'v0.1.20190730',
                      'timestamp': app.globalData.timestamp,
                      'signature': app.globalData.signature,
                    },
                    data: {
                      "code": app.globalData.mini_code,
                      "iv": res.iv,
                      "encryptedData": res.encryptedData
                    },
                    success: res => {
                      if (res.data.code === 200) {
                        store.setItem("mini_openid", res.data.data.mini_openid)
                        store.setItem('userId', res.data.data.mini_openid);
                        store.setItem('bind_mobile', res.data.data.bind_mobile);
                        app.globalData.mini_openid = res.data.data.mini_openid
                        util.we_setStorage("mini_token", res.data.data.token)
                        app.globalData.mini_token = res.data.data.token
                        http.header.token = res.data.data.token
                        if (res.data.data.bind_mobile == 1) {
                          console.log(res.data.data.bind_mobile)
                          wx.switchTab({
                            url: '/pages/index/index'
                          })
                          // wx.reLaunch({
                          //   url: '/pages/group/group'
                          // })
                        } else {
                          wx.navigateTo({
                            url: '/pages/login/login',
                          })
                        }
                      }
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    //判断用户是否绑定手机号
    console.log(this.data.bind_mobile)
    if (!this.data.userId) {
      this.getSession()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
