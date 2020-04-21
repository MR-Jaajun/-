// pages/mall/goodsEvaluate/goodsEvaluate.js
const app = getApp()
const util = require("../../../utils/util.js")
const http = require("../../../utils/gethttp.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    shop_id: "",
    goods_comments: []
  },
  changeTap(e) {
    console.log(e)
    let typeValue = e.currentTarget.dataset.type;
    this.setData({
      type: typeValue
    })
    // this.commentList()
  },
  //商品评价  MallShop/goodsCommentList
  goodsCommentList(type) {
    http.request('GET', {
      method: "MallShop/goodsCommentList",
      goods_id: this.data.shop_id,
      comment_type: type,
      page: 1,
      size: 1
    }).then(res => {
      console.log(res, '评价列表')
      this.setData({
        goods_comments: res.data.data[0]
      })


    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shop_id: options.shopid
    })
    this.goodsCommentList(0)
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