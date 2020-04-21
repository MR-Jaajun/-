// pages/order/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    OrderData: '1', //总数据
    time: '42',
    rmb: '3￥',
    type: '',
    ArrowShow: "1",
    types: '2',
    opacityitem: '',
    isHideLoadMore: true,
    navheight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  listShow(){
    this.setData({
      ArrowShow: this.data.ArrowShow == '0' ? '1' : '0',
      opacityitem: "opacitydu"
    })
  },

  changeTab(e) {
    console.log("切换tab")
    let itemtype = e.currentTarget.dataset.type;
    this.setData({
      type: itemtype
    })
    if (itemtype == '1') {
      wx.navigateTo({
        url: '/pages/order/takeoutorder/takeoutorder'
      })
    }
  },
  goappraise(){
    wx.navigateTo({
      url: '/pages/order/appraise/appraise'
    })
  },

// 退款成功页面
  refundtap_ok() {
    wx.navigateTo({
      url: '/pages/order/refunded/refunded'
    })
  },
// 退款拒绝页面
  refundtap_ng(){
    wx.navigateTo({
      url: "/pages/order/refund_ng/refund_ng"
    })
  },

onLoad: function(options) {
  this.setData({
    scrollHeight: wx.getSystemInfoSync().windowHeight,
   
  })
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

},


})