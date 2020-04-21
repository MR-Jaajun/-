// pages/group/order/order.js
var http = require('../../../utils/gethttp.js');
var config = require('../../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    num: 1,
    phone: "",
    type: '',
    pink_id: "",
    pay_id: '',
  },
  bindMinus() {
    let i = (this.data.num - 1) < 0 ? 1 : (this.data.num - 1)
    this.setData({
      num: i
    })

  },
  bindAdd() {
    let limit = this.data.order.goods_limit_amount
    let i = (this.data.num + 1) > limit ? limit : (this.data.num + 1)
    if (this.data.num >= limit) {
      wx.showToast({
        title: '限购数量' + limit,
        icon: 'none',
        duration: 2000
      })
    }
    this.setData({
      num: i
    })
  },

  //交钱
  payMone(e) {

  },

  tjorder(e) {
    let pay = e.currentTarget.dataset.pay
    http.request("POST", {
      goods_num: this.data.num,
      goods_id: this.data.order.goods_id,
      type: pay,
      pink_id: 0,
      method: config.w_createOrder
    }).then(res => {
      if (res.data.status == 1) {
        this.setData({
          pay_id: res.data.data.id
        })
        this.topay()
      } else {
        http.showtoast(res.data.msg, "none")
        if (res.data.msg == '用户未登录') {
          wx.navigateTo({
            url: "/pages/zindex/zindex",
          })
        }
      }
    })
  },
  topay() {
    http.request("POST", {
      method: config.PAYORDER,
      type: 3,
      order_id: this.data.pay_id,
      pay_app_id: "wxminipay",
    }).then(res => {
      if (res.data.status == 1) {
        let str = encodeURIComponent(JSON.stringify(res.data.data))
        let id = this.data.pay_id
        wx.navigateTo({
          url: `/pages/group/payorder/payorder?oid=${id}&payinfo=${str}`
        })
      } else {
        http.showtoast(res.data.msg, "none")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let item = options.item
    let PhoneNumber = wx.getStorageSync("PhoneNumber");
    this.setData({
      order: JSON.parse(item),
      phone: PhoneNumber,
      type: options.type
    })
    console.log(this.data.order)
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