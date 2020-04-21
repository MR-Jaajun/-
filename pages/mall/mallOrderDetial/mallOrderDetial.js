// pages/mall/mallOrderDetial/mallOrderDetial.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog'
const http = require('../../../utils/gethttp.js');
const config = require('../../../utils/config.js');
const app = getApp();
Page({
  data: {
    delivery_data: {},
    address: '',
    show2: false,
    time: 30 * 60 * 1000,
    show3: false,
    order_status: "",
    create_time: "",
    countDown: {},
    codeshow: false,
    oid: "",
    ordata: {},
    type: '',
  },
  //倒计时完成出发
  finished() {
    wx.showToast({
      title: '您超过时间,请重新下单',
      icon: 'none',
      duration: 2000,
      success: function() {
        wx.navigateTo({
          url: '../group',
        })
      }
    })
  },
  // 拨打电话
  call() {
    Dialog.confirm({
      message: '是否电话联系商家'
    }).then(() => {
      wx.makePhoneCall({
        phoneNumber: this.data.ordata.contact_information
      })
    });
  },
  //订单详情
  getData(id) {
    http.request("POST", {
      method: config.w_orderDetail,
      order_id: this.data.oid,
    }).then(res => {
      console.log(res.data.data, 'data')
      let time1 = http.gettime(res.data.data.create_time)
      let monent = http.timestamp()
      let conut_down = time1 + 30 * 60 * 1000 - monent
      this.setData({
        countDown: conut_down,
        type: res.data.data.order_status,
        ordata: res.data.data,
        delivery_data: res.data.data.delivery_data,
        order_status: res.data.data.order_status,
        address: `${res.data.data.receiver_province}${res.data.data.receiver_city}${res.data.data.receiver_area}${res.data.data.receiver_address}`
      })
    })
  },

  //申请售后切换
  changeTap(e) {
    console.log(e, '申请售后切换')
    let typeValue = e.currentTarget.dataset.type;
    this.setData({
      type: typeValue
    })
    if (typeValue == 2) {
      http.request("POST", {
        method: config.w_remindOrder,
        order_id: this.data.oid,
      }).then(res => {
        http.showtoast(res.data.msg, "none")
      })
    }
    if (typeValue == 5) {
      let cover_image = this.data.ordata.goods[0].cover_image
      let order_goods_id = this.data.ordata.goods[0].goods_id
      let order_id = this.data.ordata.goods[0].order_id
      let goods_title = this.data.ordata.goods[0].goods_title
      wx.navigateTo({
        url: `/pages/mall/feedback/feedback?cover_image=${cover_image}&order_goods_id=${order_goods_id}&order_id=${order_id}&title=${goods_title}`,
      })

    }
    if (typeValue == -7) {
      let oid = this.data.oid
      wx.navigateTo({
        url: `/pages/mall/steps/steps?oid=${oid}`,
      })
    }
  },
  // 复制订单号
  copy(e) {
    console.log(e);
    wx.setClipboardData({
      data: this.data.ordata.order_bn,
      success(res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  //删除订单
  delete() {
    http.request('POST', {
      method: config.w_deleteOrder,
      order_id: this.data.oid,
    }).then(res => {
      wx.showToast({
        title: res.data.msg,
        duration: 2000
      })
      wx.navigateTo({
        url: `/pages/mall/mallOrder/mallOrder`,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      oid: options.oid
    })
    this.getData();
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
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
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