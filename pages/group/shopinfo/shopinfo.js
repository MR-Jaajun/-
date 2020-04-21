// pages/group/shopinfo/shopinfo.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog'
var http = require('../../../utils/gethttp.js');
var config = require('../../../utils/config.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    xhow: false,
    shop_id: '', //店铺ID
    resData: {},
    active: 0,
    type: 0,
    zhe_num: '', //折
    height: 0,
    goods_comment_data: [], //评价数据
    goods_voucher_list: [], //待金卷
    goods_package_list: [], //团购套餐
    pData: {},
    hasMoreData: true,
    haspage: 1,
    pageSize: 2,
  },

  shopDetail() {
    http.request("GET", {
      shop_id: this.data.shop_id,
      method: config.w_shopDetail
    }).then(res => {
      // console.log(res.data.data)
      let zhe = (res.data.data.goods_sale_price / res.data.data.goods_market_price).toFixed(2)
      let zhe_num = zhe * 10
      this.setData({
        resData: res.data.data,
        goods_voucher_list: res.data.data.goods_voucher_list,
        goods_package_list: res.data.data.goods_package_list
      })

    })
  },
  // 拨打电话
  dianhua() {
    Dialog.confirm({
      message: '是否电话联系商家'
    }).then(() => {
      wx.makePhoneCall({
        phoneNumber: this.data.resData.shop_contact_information
      })
    });
  },
  //优惠评价切换
  changes(e) {
    if (e.detail.index == 1) {
      this.commentType()
      this.commentList()
    }
    this.setData({
      active: e.detail.index
    })
  },
  //点击评价
  commentType() {
    http.request("GET", {
      type: "1",
      id: this.data.shop_id,
      method: config.w_commentType
    }).then(res => {
      this.setData({
        pData: res.data.data
      })
    })
  },
  //全部有图评价切换
  changeTap(e) {
    console.log(e)
    let typeValue = e.currentTarget.dataset.type;
    this.setData({
      type: typeValue
    })
    this.commentList()
  },

  // 评价往上滑
  upper() {
    this.data.haspage = 1;
    //  this.commentList()
  },
  // 评价往下滑
  lower() {
    if (this.data.hasMoreData) {
      this.commentList()
    } else {
      this.setData({
        hasMoreData: false
      })
    }
  },

  //店铺评价
  commentList() {
    http.request("GET", {
      method: config.w_commentList,
      shop_id: this.data.shop_id,
      comment_type: this.data.type,
      page: this.data.haspage,
      size: this.data.pageSize,
    }).then(res => {
      var contentlistTem = this.data.goods_comment_data;
      if (res.data.code == 200) {
        if (this.data.page == 1) {
          contentlistTem = []
        }
        var contentlist = res.data.data;
        if (contentlist.length < this.data.pageSize) {
          this.setData({
            goods_comment_data: contentlistTem.concat(contentlist),
            hasMoreData: false
          })
        } else {
          this.setData({
            goods_comment_data: contentlistTem.concat(contentlist),
            hasMoreData: true,
            page: this.data.haspage + 1
          })
        }
      } else {
        wx.showToast({
          title: '出现异常'
        })
      }
    })
  },
  //切换更多评价
  loadmore() {
    let bool = !this.data.xhow
    let shop_id = this.data.shop_id
    wx.navigateTo({
      url: `/pages/group/submitRailse/submitRailse?shop_id=${shop_id}`
    })
  },
  //商品详情
  goshopdetail(e) {
    let id = JSON.stringify(e.currentTarget.dataset.id.good_id)
    let price = JSON.stringify(e.currentTarget.dataset.id.pink_price)
    let amount = JSON.stringify(e.currentTarget.dataset.id.goods_pink_amount)
    console.log(id, price, amount)
    wx.navigateTo({
      url: `/pages/group/shopdetail/shopdetail?id=${id}&price=${price}&amount=${amount}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let h = wx.getSystemInfoSync().windowHeight + 'rpx';
    let w = wx.getSystemInfoSync().windowWidth + 'rpx';
    console.log(h, w)
    this.setData({
      shop_id: JSON.parse(options.id),
      height: h,
      width: w
    })
    console.log(this.data.shop_id)
    this.shopDetail()
    this.commentType()
    // this.commentList()
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