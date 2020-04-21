// pages/group/refundDetail/refundDetail.js
const http = require('../../../utils/gethttp.js');
const config = require('../../../utils/config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: "",
    goods_id: "",
    pay: "",
    list: [{
        text: '步骤一',
        desc: '描述信息'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
      }
    ],
    active: 0

  },
  getdata(id, gid) {
    http.request("POST", {
      method: config.f_orderRefundDetail,
      order_id: id,
      order_goods_id: gid
    }).then(res => {
      let arr = []
      let obj = {}
      let obj2 = {}
      if (res.data.status == 1) {
        console.log(res.data.data)
        //步骤条
        obj.text = "买家发起了退款详情" + "" + res.data.data.list[0].create_time;
        obj.desc = res.data.data.list[0].reason;
        obj2.text = "平台同意退款" + "" + res.data.data.list[0].update_time;
        arr.push(obj)
        arr.push(obj2)
        let price = res.data.data.list[0].order_price / res.data.data.list[0].num
        this.setData({
          pay: res.data.data.pay,
          list: arr,
          price: price
        })
      } else {
        http.showtoast(res.data.msg, 'none')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let gid = options.gid || ""
    this.getdata(options.oid, gid)
    this.setData({
      order_id: options.oid,
      goods_id: options.gid
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

  }
})