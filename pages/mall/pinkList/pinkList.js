// pages/mall/pinkList/pinkList.js
const app = getApp()
const http = require("../../../utils/gethttp.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    categoryTitle: [],
    categoryId: null,
    categoryList: [],
    page: 1
  },
  //拼团商品分类 /api/MallPromotion/goodsCategory
  goodsCategory() {
    http.request('GET', {
      method: "MallPromotion/goodsCategory"
    }).then(res => {
      this.setData({
        categoryTitle: res.data.data,
        categoryId: res.data.data[0].category_id
      });
      this.goodsList(res.data.data[0].category_id, 1)
    })
  },
  //拼团商品列表 MallPromotion/goodsList 
  goodsList(id, page) {
    http.request('GET', {
      method: "MallPromotion/goodsList",
      category_id: id,
      page: page,
      size: 5
    }).then(res => {
      console.log(res.data, '列表');
      if (res.data.data.length > 0) {
        this.setData({
          categoryList: this.data.categoryList.concat(res.data.data)
        })
      } else {
        http.showtoast('已经没有更多的数据了', 'none')
      }

    })
  },
  //切换分类
  switchover(e) {
    let cid = e.currentTarget.dataset.cid
    // console.log(e.currentTarget.dataset.idx)
    this.setData({
      categoryList: [],
      active: e.currentTarget.dataset.idx,
      categoryId: cid,
      page: 1
    })
    this.goodsList(cid, 1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.goodsCategory()
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
    let page = ++this.data.page
    this.goodsList(this.data.categoryId, page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})