// pages/mall/mallList/mallList.js
const app = getApp()
const http = require("../../../utils/gethttp.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recommend: [],
    name: 1,
    page: 1,
    bool: true
  },
  //推荐专区  /api/MallIndex/getRecommend
  getRecommend(type, page) {

    http.request('GET', {
      method: "/MallIndex/getRecommend",
      search_sort: type,
      page: page,
      size: 5
    }).then(res => {
      console.log(res.data.data, '推荐专区')
      if (res.data.data.length > 0) {
        this.setData({
          recommend: this.data.recommend.concat(res.data.data)
        })
      } else {
        http.showtoast('已经没有更多的数据了', 'none')

      }

    })
  },
  onChange(e) {
    this.setData({
      name: e.detail.name,
      page: 1,
      recommend: []
    })
    if (e.detail.name < 3) {
      this.getRecommend(e.detail.name, 1)
    }


  },
  //价格排序
  pricesort(e) {
    this.setData({
      page: 1
    })
    if (e.detail.name == 3) {
      this.setData({
        recommend: []
      })
      console.log("666")
      if (this.data.bool) {
        this.getRecommend(3, 1)
      } else {
        this.setData({
          name: 4
        })
        this.getRecommend(4, 1)
      }
      this.setData({
        bool: !this.data.bool
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    //动态标题
    wx.setNavigationBarTitle({
      title: options.title
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getRecommend(this.data.name, 1)
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
    let page = ++this.data.page;
    this.getRecommend(this.data.name, page)
    // if (this.data.bool) {
    //   this.getRecommend(3, 1)
    // } else {
    //   this.getRecommend(4, 1)
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})