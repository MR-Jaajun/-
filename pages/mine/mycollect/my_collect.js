// pages/mine/mycollect/my_ collect.js
const util = require('../../../utils/util.js');
const app = getApp();
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 2,
    goodsList: "",
    shopsList: [],
    show: false,
    isHideLoadMore: false,
    close: false,
    collect_id: ''

  },
  del(e) {
    this.setData({
      close: true,
      collect_id: e.currentTarget.dataset.cid
    })
    console.log(e.currentTarget.dataset.cid);
  },
  onClose() {
    this.setData({
      close: false
    })
  },
  isDel() {
    Dialog.confirm({
        message: '您是否要删除此收藏商品',
        asyncClose: true
      })
      .then(() => {
        setTimeout(() => {
          util.we_request({
            "method": util.config.DELCOLLECT, //删除商品
            "collect_ids": this.data.collect_id,
          }, res => {
            console.log(res);
            //删除成功之后再次请求
            util.we_request({
              "method": util.config.COLLECTLIST,
              "collect_type": 2,
              "module_type": 0,
              "page": 1,
              "size": 10
            }, res => { //成功的回调
              console.log("删除成功 id是" + this.data.collect_id )
              this.setData({
                shopsList: res.data.data,
              });
            });
            Dialog.close();
          });

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
    console.log("测试：", app.globalData.req_header)
    //收藏商品
    util.we_request({
      "method": util.config.COLLECTLIST,
      "collect_type": 1,
      "module_type": 0,
      "page": 1,
      "size": 10
    }, res => {
      this.setData({
        goodsList: res.data.data
      });
    });
    //收藏商家
    util.we_request({
      "method": "CustomUser/collectList",
      "collect_type": 2,
      "module_type": 0,
      "page": 1,
      "size": 10
    }, res => { //成功的回调
      // console.log(res.data.data);//返回一个数组
      console.log(res.data);
      this.setData({
        shopsList: res.data.data,
      });
    });

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