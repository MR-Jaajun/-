// pages/mine/address/address.js
const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: "", //收货地址列表
    scrollheight: 0
  },
  //跳转到新建地址
  address() {
    wx.navigateTo({
      url: './add_address/add_address',
    })
  },
  //跳转到修改地址
  alter_address(e) {
    console.log(e.currentTarget.dataset.id);
    //编辑哪一条数据就带哪一条数据信息过去
    var obj = JSON.stringify(this.data.addressList[e.currentTarget.dataset.id]);
    wx.navigateTo({
      url: './alter_address/alter_address?detail_info=' + obj,
    })
  },


  //地址列表渲染
  addresslist() {
    util.we_request({
      "method": util.config.ADDRESSLIST,
      "page": 1,
      "size": 20
    }, res => {
      console.log(res);
      this.setData({
        addressList: res.data.data
      });
    });
  },

  //获取ScrollView高度
  getScrollView() {
    try {
      const windowHeight = wx.getSystemInfoSync()
      let query = wx.createSelectorQuery().in(this); // 创建SelectorQuery实例
      query.select('.address_btn').boundingClientRect(); // 取出address_btn的高度
      query.exec((res) => { // 执行上面请求，结果按顺序存放于数组，在callback返回
        let scrollViewHeight = windowHeight - res[0].height;
        this.setData({
          scrollheight: scrollViewHeight, //异常，高度不出现
        });
      });
    } catch (e) {
      console.log("同步获取高度的catch：", e)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getScrollView()
    this.addresslist()
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
    // /CustomAddress/addressList 地址列表
    this.addresslist()

    // console.log(this.data.addressList);
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