/*
 * @Description: 
 * @Author: Roc
 * @Date: 2019-11-27 14:37:34
 * @LastEditors  : Roc
 * @LastEditTime : 2019-12-26 10:33:04
 */
const util = require('utils/util.js');
let store = require("utils/store.js")
App.location = wx.getStorageSync("location");
App({
  globalData: {
    userInfo: null,
    mini_code: "",
    mini_token: "",
    mini_openid: "",
    timestamp: "",
    location: {},
    signature: null,
    comePay: false,
    addressTitle: '',
    allShopCarList: [],
    city: '',
    historyList: [],
    h: "",
    w: "",
    lon: "", //经度
    lat: "" //纬度
  },
  onLaunch(options) {
    let h = wx.getSystemInfoSync().windowHeight;
    let w = wx.getSystemInfoSync().windowWidth;
    this.globalData.h = h
    this.globalData.w = w
    //获取时间戳
    this.globalData.timestamp = Date.parse(new Date()) / 1000;
    console.log("当前时间戳为：" + this.globalData.timestamp);
    // wx.checkSession({
    //   success: () => { //session_key 未过期，并且在本生命周期一直有效
    //     console.log("session_key 未过期，并且在本生命周期一直有效"),
    //       wx.getStorageInfo({
    //         success: res => {
    //           let istoken = 0;
    //           for (let item of res.keys) {
    //             if (item == "mini_token") {
    //               istoken = 1
    //             }
    //           }
    //           if (istoken) {
    //             // console.log("app.js抛出缓存里有token")
    //             util.we_getStorage("mini_token", res => {
    //               this.globalData.mini_token = res.data
    //               // console.log("token:", this.globalData.mini_token)
    //             })
    //             util.we_getStorage("mini_openid", res => {
    //               this.globalData.mini_openid = res.data
    //               // console.log("openid:", this.globalData.mini_openid)
    //             })
    //             util.we_getStorage("userinfo", res => {
    //               this.globalData.signature = res.data.signature
    //               // console.log("signature:", this.globalData.signature)
    //             })
    //           } else {
    //             // console.log("app.js=>缓存没有token，执行util.we_getToken...")
    //             util.we_getToken()
    //           }
    //         }
    //       })
    //   },
    //   fail: () => { //session_key 已经失效，需要重新执行登录流程
    //     console.log("session_key 已经失效，执行util.we_getToken")
    //     util.we_getToken()
    //   }
    // })



    //待优化，检测用户手机有无信号，没有给出对应提示
    // wx.getNetworkType({
    //   success: res => {
    //     if (res.networkType === "none") {
    //       wx.showModal({
    //         content: '无网络',
    //         showCancel: false
    //       })
    //     }
    //   },
    //   fail(res) {
    //     console.log(res)
    //   }
    // })
  },
  onShow() {
  }



})
