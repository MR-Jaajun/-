// pages/mall/goodsDetail/goodsDetail.js
const app = getApp()
const util = require("../../../utils/util.js")
const http = require("../../../utils/gethttp.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    type: 0,
    shows: false,
    // time: 30 * 60 * 60 * 1000,
    goods_id: null, //商品ID
    cover_image: null, //商品图片
    promotion_status: null, //商品类型
    goodsdetail: null, //商品详情
    seckill: null, //秒杀%
    widths: null, //进度条
    goods_comment: null,
    goods_comments: [], //评论
    detail_image: [], //详情图片
    shop_info: null //商家信息
  },
  //全部有图评价切换
  changeTap(e) {
    console.log(e)
    let typeValue = e.currentTarget.dataset.type;
    this.goodsCommentList(typeValue)
    this.setData({
      type: typeValue
    })
    // this.commentList()
  },
  showPopup() {
    this.setData({
      shows: true
    });
  },

  onClose() {
    this.setData({
      shows: false
    });
  },
  //去店铺 
  tostore() {
    let shopid = this.data.goodsdetail.shop_id
    wx.navigateTo({
      url: '../store/store?shopid=' + shopid,
    })
  },
  //去店铺 
  togoodsEvaluate() {
    let shopid = this.data.goodsdetail.shop_id
    wx.navigateTo({
      url: '../goodsEvaluate/goodsEvaluate?shopid=' + shopid,
    })
  },
  //获取商品详情 /api/MallShop/goodsDetail
  getdetail() {
    http.request('GET', {
      method: "MallShop/goodsDetail",
      goods_id: this.data.goods_id
    }).then(res => {
      if (res.data.status == 1) {
        console.log(res.data.data, '商品详情')
        let {
          data
        } = res.data
        this.setData({
          goodsdetail: data,
          cover_image: data.cover_image,
          promotion_status: data.promotion_status,
          goods_comment: data.goods_comment,
          shop_info: data.goods_shop_info,
          detail_image: data.detail_image
        })
        if (data.promotion_status == 2) {
          let p = ((data.promotion_seckill.seckill_sale_amount / data.promotion_seckill.seckill_sale_stock) * 100).toFixed(0)
          let w = 180 * p
          this.setData({
            time: data.promotion_seckill.seckill_time * 1000,
            seckill: p,
            widths: w
          })
        }
      } else {
        http.showtoast('已经没有更多的数据了', 'none')
      }

    })

  },
  //商品评价  MallShop/goodsCommentList
  goodsCommentList(type) {
    http.request('GET', {
      method: "MallShop/goodsCommentList",
      goods_id: this.data.goods_id,
      comment_type: type,
      page: 1,
      size: 1
    }).then(res => {
      console.log(res.data.data)
      if (res.data.data.length > 0) {
        this.setData({
          goods_comments: res.data.data[0]
        })
      } else {
        this.setData({
          goods_comments: ""
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      goods_id: options.gid
    })
    this.getdetail()
    this.goodsCommentList(0)
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