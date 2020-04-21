const app = getApp()
Page({
  data: {
    tabActive: 2,
  },
  //获取组件tab值
  getactive(e) {
    if (e.detail === 0) {
      wx.setNavigationBarTitle({
        title: '主页'
      })
    } else if (e.detail === 1) {
      wx.setNavigationBarTitle({
        title: '购物车'
      })
    } else if (e.detail === 2) {
      wx.setNavigationBarTitle({
        title: '订单'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '更多'
      })
    }
    this.setData({
      tabActive: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    // wx.setNavigationBarTitle({
    //   title: '主页'
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //可以获取该组件实例↓
    // console.log(this.selectComponent(".takebar_class"))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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