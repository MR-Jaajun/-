// pages/group/lookCoupons/lookCoupons.js
const app = getApp()
const util = require("../../../utils/util.js")
const {
  barcode,
  qrcode
} = require('../../../utils/changeCode.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    shop_title: "",
    end_time: "",
    goods: [],
    show: false,
    verify_code: ""
  },
  getData(id) {
    util.we_request({
      "method": util.config.f_orderDetail,
      "order_id": id
    }, res => {
      console.log(res.data.data)
      let arr = res.data.data.goods;
      arr.forEach(item => {
        barcode('barcode', item.verify_code, 600, 150); //条形码
        qrcode('qrcode', item.verify_code, 500, 500); //二维码
      })
      this.setData({
        shop_title: res.data.data.shop_title,
        title: res.data.data.order_title,
        end_time: res.data.data.end_time,
        goods: res.data.data.goods,
        verify_code: res.data.data.verify_code
      })
    })
  },
  showPopup() {
    this.setData({
      show: true
    });
    barcode('barcode2', this.data.verify_code, 600, 150); //条形码
    qrcode('qrcode2', this.data.verify_code, 500, 500); //二维码
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  // /api/GroupOrder/orderDetail
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.order)
    this.getData(options.order)
    // barcode('barcode', this.data.obj.SecretCode, 800, 172);
    // qrcode('qrcode', this.data.obj.SecretCode, 320, 320);
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