// pages/mall/mall.js
const app = getApp()
const util = require("../../utils/util.js")
const store = require("../../utils/store.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabActive: 0,
    tab: '',
    page: 1

  },
  //获取组件tab值
  getIndex(e) {
    if (e.detail === 0) {
      wx.setNavigationBarTitle({
        title: '商城主页'
      })
    } else if (e.detail === 1) {
      wx.setNavigationBarTitle({
        title: '商品分类'
      })
    } else if (e.detail === 2) {
      let mini_token = app.globalData.mini_token || store.getItem("mini_token")
      if (!mini_token) {
        wx.navigateTo({
          url: "/pages/zindex/zindex",
        })
      } else {
       wx.navigateTo({
          url: "/pages/mall/mallOrder/mallOrder",
        })
      }
    } else if (e.detail === 3) {
      let mini_token = app.globalData.mini_token || store.getItem("mini_token")
      if (!mini_token) {
        wx.navigateTo({
          url: "/pages/zindex/zindex",
        })
      } else {
        wx.navigateTo({
          url: "/pages/mall/shoppingCart/shoppingCart",
        })
      }
    }
    this.setData({
      tabActive: e.detail
    })
  },


  // 跳转到通知页
  toNotify: function() {
    wx.navigateTo({
      url: '../index/notify/notify',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(this.data.tabActive.typeof)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(this.data.tabActive.typeof, '初次渲染完成')
    this.setData({
      tab: 'a'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(this.data.tabActive.typeof, '监听页面显示')
    if (this.data.tab == 'a') {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
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
   * 页面相关事件处理函数--监听用户下拉动作 往上滑
   */
  onPullDownRefresh: function() {
    this.mallindex.getRecommend(1);
  },

  /**
   * 页面上拉触底事件的处理函数 往下滑
   */
  onReachBottom: function() {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
