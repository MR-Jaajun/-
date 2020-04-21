// pages/group/submitRailse/submitRailse.js
var http = require('../../../utils/gethttp.js');
var config = require('../../../utils/config.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasMoreData: true,
    Height: 0,
    type: 0,
    shop_id: '',
    haspage: 1,
    pageSize: 2,
    pData: {},
    goods_comment_data: [], //评价数据
  },

  //评价分类
  commentType() {
    http.request("GET", {
      type: "1",
      id: this.data.shop_id,
      method: config.w_commentType
    }).then(res => {
      this.setData({
        pData: res.data.data
      })
    })
  },


  //全部有图评价切换
  changeTap(e) {
    let typeValue = e.currentTarget.dataset.type;
    this.setData({
      type: typeValue
    })
    this.commentList()
  },

  // 评价往上滑
  // upper() {
  //   this.data.haspage = 1;
  //   this.commentList()
  // },
  // 评价往下滑
  // lower() {
  //   if (!this.data.hasMoreData) {
  //     this.commentList()
  //   } else {
  //     this.setData({
  //       hasMoreData: false
  //     })
  //   }
  // },

  //店铺评价
  commentList() {
    http.request("GET", {
      method: config.w_commentList,
      shop_id: this.data.shop_id,
      comment_type: this.data.type,
      page: this.data.haspage,
      size: this.data.pageSize,
    }).then(res => {
      var contentlistTem = this.data.goods_comment_data;
      if (res.data.code == 200) {
        if (this.data.page == 1) {
          contentlistTem = []
        }
        var contentlist = res.data.data;
        if (contentlist.length < this.data.pageSize) {
          this.setData({
            goods_comment_data: contentlistTem.concat(contentlist),
            hasMoreData: false
          })
        } else {
          this.setData({
            goods_comment_data: contentlistTem.concat(contentlist),
            hasMoreData: true,
            page: this.data.haspage + 1
          })
        }
      } else {
        wx.showToast({
          title: '出现异常'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let h = wx.getSystemInfoSync().windowHeight + 'rpx';
    let w = wx.getSystemInfoSync().windowWidth + 'rpx';
    console.log(options)
    this.setData({
      shop_id: options.shop_id || 10109,
      Height: h
    })
    this.commentType()
    this.commentList()

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
    this.data.haspage = 1;
    this.commentList()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      this.commentList()
    } else {
      this.setData({
        hasMoreData: false
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})