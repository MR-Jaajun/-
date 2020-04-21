// pages/mall/store/store.js
const app = getApp()
const util = require("../../../utils/util.js")
const http = require("../../../utils/gethttp.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopid: null,
    active: 0,
    type: 1,
    showmeau: false,
    mainActiveIndex: "",
    items: [{
      // 导航名称
      text: '夏季热销',
      // 该导航下所有的可选项
      children: [{
          // 名称
          text: '温州',
          // id，作为匹配选中状态的标识
          id: 1,
        },
        {
          text: '杭州',
          id: 2
        },
        {
          text: '杭州',
          id: 2
        }
      ]
    }]
  },
  //返回按钮
  goback() {
    wx.navigateBack();
  },
  //全部商品
  allgoods() {
    this.setData({
      type: 1
    })
  },
  //分类
  fenlei() {
    this.setData({
      type: 2
    })
  },
  //跳转到店铺优惠券
  toStoreDiscount() {
    wx.navigateTo({
      url: './store_discount/store_discount',
    })
  },
  //跳转到店铺印象
  toImpression() {
    wx.navigateTo({
      url: './impression/impression',
    })
  },
  //展示菜单
  showMeau() {
    this.data.showmeau = !this.data.showmeau;
    this.setData({
      showmeau: this.data.showmeau
    })
  },
  //关闭
  onClose() {
    this.setData({
      showmeau: false
    });
  },
  onChange(event) {
    // console.log(event.detail);
    this.setData({
      active: event.detail
    })
  },
  //分类
  onClickNav({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },
  //店铺详情 MallShop/shopDetail
  shopDetail() {
    http.request('GET', {
      method: "MallShop/shopDetail",
      shop_id: this.data.shopid,
    }).then(res => {
      console.log(res.data.data,'店铺信息')
    })
  },
  //店铺商品 MallShop/wholeGoods
  wholeGoods(sort,page) {
    http.request('GET', {
      method: "MallShop/wholeGoods",
      shop_id: this.data.shopid,
      search_sort:sort,
      page:page,
      size:4
    }).then(res => {
      console.log(res.data.data,'店铺商品')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      shopid: options.shopid
    })
    this.shopDetail()
    this.wholeGoods(1,1)
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