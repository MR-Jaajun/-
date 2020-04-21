// pages/mall/timeLimit/timeLimit.js
const app = getApp()
const http = require("../../../utils/gethttp.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene_title: [],
    arr: [{
      scene_id: "1",
      scene_title: "14:00",
      scene_start_time: "1568073600",
      scene_end_time: "1568077200",
      scene_status: "1"
    }],
    arr2: [{
      goods_id: 138,
      goods_title: "10",
      goods_subtitle: "10",
      goods_cover_image: "https://xiaogeshangcheng.oss-cn-shenzhen.aliyuncs.com/user_upload/2019-09-10/1568082596_0ZUQBG.png",
      goods_sku_market_price: "10.00",
      goods_sku_sale_price: "10.00",
      goods_sku_seckill_price: "0.00",
      goods_sale_amount: "10",
      goods_stock_amount: "5000",
      scene_status: "1",
      percent: 10 / 100 * 100,
      width: (10 / 100) * 270
    }],
    goodsList: [],
    time: "",
    page: 1
  },
  switching(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      goodsList: [],
      scene_id: e.currentTarget.dataset,
      page: 1
    })
  },
  //限时抢购场次  /api/MallPromotion/secKillScene
  secKillScene() {
    http.request("GET", {
      method: "MallPromotion/secKillScene",
    }).then(res => {
      // console.log(res)
      if (res.data.data.length > 0) {
        let monent = http.timestamp()
        let endtime = res.data.data[0].scene_end_time * 1000
        if (endtime - monent > 0) {
          this.setData({
            scene_title: res.data.data,
            time: endtime - monent,
            scene_id: res.data.data[0].scene_id
          })
        }
        this.secKillGoods(this.data.scene_id, 1)
      } else {
        this.setData({
          scene_title: this.data.arr,
          time: 2000
        })
      }
    })
  },
  //秒杀商品列表 MallPromotion/secKillGoods
  secKillGoods(sid, page) {
    http.request("GET", {
      method: "MallPromotion/secKillGoods",
      scene_id: sid,
      page: page,
      size: 5
    }).then(res => {
      // console.log(res)
      res.data.data.forEach(item => {
        item.percent = ((item.goods_sale_amount / item.goods_stock_amount) * 100).toFixed(1)
        item.width = item.percent * 270
      })
      this.setData({
        // goodsList: res.data.data ? res.data.data : this.data.arr2
        goodsList: this.data.arr2

      })
    })
  },
  finished() {
    console.log("555")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.secKillScene()
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
    let page = ++this.data.page;
    this.secKillGoods(this.data.scene_id, page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})