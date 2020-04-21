// pages/mall/goodsClassify/goodsClassify.js
const app = getApp()
const http = require("../../../utils/gethttp.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: "a",
    active: 0,
    jump_id: 2,
    title: null,
    categoryid: "",
    categoryTitle: [{
      category_id: 15,
      category_title: "测试经营品类"
    }],
    goodlist: []
  },
  //切换分类 二级导航
  switchover(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      active: e.currentTarget.dataset.idx,
      categoryid: e.currentTarget.dataset.cid
    })
    this.categoryGoods(this.data.categoryid, 1, 1)
  },
  //获取二级导航 /api/MallIndex/categoryChild
  categoryChild(jid) {
    http.request('GET', {
      method: "MallIndex/categoryChild",
      category_id: jid
    }).then(res => {
      console.log(res, '二级分类')
      let cid = res.data.data[0].category_id
      this.setData({
        categoryTitle: res.data.data,
        categoryid: cid
      })
      this.categoryGoods(this.data.categoryid, 1, 1)
    })
  },
  //分类商品 MallIndex/categoryGoods
  categoryGoods(cid, type, page) {
    http.request('GET', {
      method: "MallIndex/categoryGoods",
      category_id: cid,
      search_sort: type,
      page: page,
      size: 5
    }).then(res => {
      console.log(res.data.data, '分类商品')
      this.setData({
        goodlist: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    //获取跳转id
    this.setData({
      jump_id: options.jid,
      title: options.title
    })
    this.categoryChild(options.jid || 2)

    //动态标题
    wx.setNavigationBarTitle({
      title: options.title
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