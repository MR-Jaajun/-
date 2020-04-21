// pages/mine/mywallet/my_wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:"0.00",//余额
    bean:"0.00"//小哥豆
  },
  //跳转到余额
  balance(){
    wx.navigateTo({
      url: './balance/balance?balance=' + this.data.balance
    })
  },
  //跳转到小哥豆
  bean() {
    wx.navigateTo({
      url: './bean/bean?bean=' + this.data.bean
    })
  },
  coupon() {
    wx.navigateTo({
      url: './coupon/coupon',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      balance:options.balance,
      bean:options.bean,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})