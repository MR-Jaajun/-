// pages/mall/steps/steps.js
const http = require('../../../utils/gethttp.js');
const config = require('../../../utils/config.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    steps: [],
    order_id: '',
    delivery_data: {},
    logistics: {},
  },
  //订单详情
  getData() {
    http.request("POST", {
      method: config.w_orderDetail,
      order_id: this.data.order_id || 1983,
    }).then(res => {
      let list = res.data.data.delivery_data.list
      let arrlist = []
      list.map(item => {
        item.text = item.time
        item.desc = item.context
        arrlist.push(item)
     
      })
      this.setData({
        delivery_data: res.data.data.delivery_data,
        logistics: res.data.data.delivery_data.logistics,
        steps: arrlist
      })
      console.log(this.data.steps, 'data')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options, 'steps')
    this.setData({
      order_id: options.oid,
    })
    this.getData()
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