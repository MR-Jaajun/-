// pages/group/voucherdetails/voucherdetails.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/gethttp.js');
var config = require('../../../utils/config.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nick_name: '',//团长昵称
    avatarUrl: '',
    pinshow: false,
    xhow: false,
    value: 3,
    height: 0,
    width: 0,
    time: 30 * 60 * 60 * 1000,
    goods_id: "",
    goods_pink_amount: '',
    goods_pink_price: '',
    goods_detail: [], //套餐详情 
    goods_detail_image: [],
    obj: null,
    goods_comment_data: null,
    pink_list: [], //拼团
    goods_comment_data: [] //评价
  },
  showClick(e) {
    let name = e.currentTarget.dataset.name
    this.setData({
      pinshow: true,
      nick_name: name
    });
  },



  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({
      close: false,
    });
  },

  loadmore() {
    let bool = !this.data.xhow
    this.setData({
      xhow: bool,
    })
  },

  GoEnter() {
    let item = JSON.stringify(this.data.obj)
    wx.navigateTo({
      url: `/pages/group/order/order?item=${item}`
    })
  },
  goodsDetail() {
    http.request("GET", {
      goods_id: this.data.goods_id,
      method: config.w_goodsDetail
    }).then(res => {
      // console.log(res.data.data.goods_detail_image)
      this.setData({
        goods_detail: res.data.data.goods_detail,
        goods_detail_image: res.data.data.goods_detail_image,
        obj: res.data.data,
        goods_comment_data: res.data.data.goods_comment.goods_comment_data,
        pink_list: res.data.data.goods_pink.pink_list,
        goods_comment_data: res.data.data.goods_comment.goods_comment_data
      })
      // console.log(this.data.obj)
      console.log(this.data.pink_list, 'goods_detail_image')

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = wx.getStorageSync("userinfo");
    this.setData({
      avatarUrl: userInfo.userInfo.avatarUrl,
      goods_id: JSON.parse(options.id),
      goods_pink_amount: JSON.parse(options.amount),
      goods_pink_price: JSON.parse(options.price),
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    this.goodsDetail()
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
  onShareAppMessage: function () { }
})