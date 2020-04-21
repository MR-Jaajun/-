//index.js
//获取应用实例
const app = getApp()
const store = require("../../utils/store.js")
const config = require('../../utils/config.js');
const http = require('../../utils/gethttp.js');
Page({
  data: {
    banner: [],
    isHideLoadMore: true,
    totopData: true,
    istrue: true,
    value: "",
    location: store.getItem('location'),

  },

  toTakeOut: function() {
    wx.navigateTo({
      url: 'takeout/takeout'
    })
  },




  // 跳转到通知页
  toNotify: function() {
    wx.navigateTo({
      url: './notify/notify',
    })
  },
  // 跳转到商城
  toStore: function() {
    wx.navigateTo({
      url: '../mall/mall',
    })
  },
  //去团购
  toGroup: function() {
    wx.navigateTo({
      url: '../group/group',
    })
  },


  // 监听用户滑动页面事件
  onPageScroll: function(e) {
    if (e.scrollTop > 130) {
      this.setData({
        totopData: false
      })
    } else if (e.scrollTop == 0) {
      this.setData({
        totopData: true
      })
    }
  },
  openDialog: function() {
    this.setData({
      istrue: true
    })
  },
  closeDialog: function() {
    this.setData({
      istrue: false
    })
  },
  // 获取定位
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        app.globalData.location = res;
        store.setItem('location', res);
        http.header.latitude = res.latitude
        http.header.longitude = res.longitude
        this.getdata(res)
        this.getSlide()
      },
      fail: res => {
        wx.showModal({
          title: '定位失败，请重新定位',
          success: res => {
            console.log(res)
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/getaddress/getaddress",
              })
            }
          }
        })
      }
    })

  },
  // 首页推荐
  getdata(res) {
    wx.request({
      url: http.baseURL2,
      method: "GET",
      data: {
        method: config.w_recommendData,
        page: "1",
        size: "10",
      },
      header: {
        'content-type': 'application/json',
        'token': app.globalData.mini_token,
        'deviceid': 'weapp',
        'devicetype': "3",
        'appversion': 'v0.1.20190730',
        'longitude': res.longitude,
        'latitude': res.latitude,
        'timestamp': app.globalData.timestamp,
        'signature': app.globalData.timestamp + "abc"
      },
      success: (res) => {
        console.log(res.data.data, "首页推荐")
      }
    })

  },
  // 轮播促销
  getSlide() {
    http.request("GET", {
      "method": config.w_getSlider,
    }).then(res => {
      console.log(res.data.data, '轮播促销')
    })
  },
  onLoad: function() {
    this.getLocation()
  },

})