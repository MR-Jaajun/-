// component/malltabbar/malltabber.js
Page({
  // 组件不能用page，应该用Component，详情组件结构查看https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html
  /**
   * 页面的初始数据
   */
  data: {
    //底部导航
    active: 0,
    showmeau: false
  },
  onChange(event) {
    // console.log(event.detail);
    this.setData({
      active: event.detail
    })
    //组件传值
    this.triggerEvent('getIndex', event.detail)
  },
  //显示更多
  showMore() {
    this.data.showmeau = !this.data.showmeau;
    this.setData({
      showmeau: this.data.showmeau
    })
    console.log(this.data.showmeau)
  },
  //关闭
  onClose() {
    this.setData({
      showmeau: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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