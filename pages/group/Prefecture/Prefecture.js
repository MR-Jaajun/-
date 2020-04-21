// pages/group/Prefecture/Prefecture.js
var util = require('../../../utils/util.js');
var http = require('../../../utils/gethttp.js');
var config = require('../../../utils/config.js');
const store = require("../../../utils/store.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [{
        text: '全部',
        value: 0
      }

    ],
    option2: [{
        text: '综合排序',
        value: '3'
      },
      {
        text: '评分最高',
        value: '4'
      },
      {
        text: '人均高到低',
        value: '5'
      },
      {
        text: '人均低到高',
        value: '6'
      }
    ],
    value1: 0,
    value2: '3',
    search_sort: '3', //排序类型
    category_id: '0', //分类
    combo: [],
  },

  getdata() {
    wx.request({
      url: http.baseURL2,
      method: "GET",
      data: {
        method: config.w_goodsCategory
      },
      header: http.header,
      success: (res) => {
        let data = res.data.data
        data.map(a => {
          a.text = a.category_title
          a.value = a.category_id
          delete a.category_title
          delete a.category_id
          this.data.option1.push(a)
        })
        let arr = this.data.option1
        this.setData({
          option1: arr.slice(0, 7)
        })
      }
    })
  },
  // 排序搜索
  onChange(e) {
    this.setData({
      category_id: e.detail
    })
    this.search()
  },
  // 排序搜索
  twoChange(e) {
    this.setData({
      search_sort: e.detail
    })
    this.search()
  },
  // 距离排序搜索
  oneTap(e) {
    this.setData({
      search_sort: e.currentTarget.dataset.id
    })
    this.search()
  },
  // 搜索
  search() {
    var currentPage = 1;
    http.request("GET", {
      category_id: this.data.category_id,
      search_sort: this.data.search_sort,
      page: currentPage,
      method: config.w_goodsList
    }).then(res => {
      this.setData({
        combo: res.data.data,
        currentPage: currentPage
      })
    })
  },



  //商品详情
  goshopdetail(e) {
let mini_token = app.globalData.mini_token || store.getItem("mini_token")
    if (!mini_token) {
      wx.navigateTo({
        url: "/pages/zindex/zindex",
      })
    } else {
      let id = JSON.stringify(e.currentTarget.dataset.id.goods_id)
      let price = JSON.stringify(e.currentTarget.dataset.id.goods_pink_price)
      let amount = JSON.stringify(e.currentTarget.dataset.id.goods_pink_amount)
      console.log(id, price)
      wx.navigateTo({
        url: `/pages/group/shopdetail/shopdetail?id=${id}&price=${price}&amount=${amount}`
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getdata()
    this.search()
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
