// pages/group/groupCollect/groupCollect.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog.js';
const http = require('../../../utils/gethttp.js');
const config = require('../../../utils/config.js');
const store = require('../../../utils/store.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: "1",
    value: 3.0,
    close: false,
    collect_id: "",
    goodsList: [],
    shopList: [],
    page: 1,
  },
  //切换
  onChange(event) {
    // console.log(event.detail.name);
    this.setData({
      active: event.detail.name
    })
    //请求列表
    this.getData(event.detail.name)
  },

  getData(type) {
    http.request("GET", {
      method: config.f_collectList,
      collect_type: type,
      page: this.data.page,
      size: 10
    }).then(res => {
      // console.log(res)
      if (res.data.status == 1) {
        if (this.data.active == 1) {
          this.setData({
            goodsList: res.data.data
          })
        } else {
          this.setData({
            shopList: res.data.data
          })
        }
      } else {
        http.showtoast(res.data.msg, "none")
      }

    })
  },


  //关闭弹窗
  onClose() {
    this.setData({
      close: false
    })
  },
  //打开删除的弹窗
  opendia(e) {
    this.setData({
      close: true,
      collect_id: e.currentTarget.dataset.cid
    })
  },
  //点击确认删除
  isDel() {
    Dialog.confirm({
        message: '您是否要删除此收藏商品',
        asyncClose: true
      })
      .then(() => {
        setTimeout(() => {
          http.request("POST", {
            method: config.f_delCollect,
            collect_ids: this.data.collect_id
          }).then(res => {
            if (res.data.status == 1) {
              Dialog.close();
              this.getData(this.data.active)
            } else {
              http.showtoast(res.data.msg, "none")
            }
          })
        }, 800);
      })
      .catch(() => {
        Dialog.close();
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
let mini_token = app.globalData.mini_token || store.getItem("mini_token")
    if (!mini_token) {
      wx.navigateTo({
        url: "/pages/zindex/zindex",
      })
    } else {
      this.getData(1)
    }
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
    this.getData(this.data.active)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      page: ++this.data.page
    })
    this.getData(this.data.active)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
