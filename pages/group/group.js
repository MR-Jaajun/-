// pages/group/group.js
const app = getApp()
const util = require("../../utils/util.js");
const http = require("../../utils/gethttp.js");
const store = require("../../utils/store.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabActive: 0,
    isshow: 0,
    heights: "",
    widths: "",
    m_height: "",
    m_width: ""

  },
  //获取组件tab值
  getIndex(e) {
    if (e.detail === 0) {
      wx.setNavigationBarTitle({
        title: '团购主页'
      })
      this.setData({
        tabActive: e.detail
      })
    } else if (e.detail === 1) {
      wx.setNavigationBarTitle({
        title: '用券'
      })

      this.setData({
        tabActive: e.detail
      })
    } else if (e.detail === 2) {
      let mini_token = app.globalData.mini_token || store.getItem("mini_token")
      if (!mini_token) {
        wx.navigateTo({
          url: "/pages/zindex/zindex",
        })
      } else {
        wx.setNavigationBarTitle({
          title: '团购订单'
        })
        this.setData({
          tabActive: e.detail
        })
      }
    } else if (e.detail === 3) {
      this.setData({
        isshow: 1
      })
    }


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      heights: app.globalData.h * 2,
      widths: app.globalData.w * 2,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
  onPullDownRefresh: function() {},

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