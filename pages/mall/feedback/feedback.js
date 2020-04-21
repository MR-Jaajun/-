// pages/mall/feedback/feedback.js
const util = require("../../../utils/util");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: "", //订单id
    goods_id: "", //商品订单id
    shop_title: "", //商家名称
    imgs: "", //商家图片
    value: '5', //评分
    value1: '5',
    value2: '5',
    order_goods_id: "",
    test: "",
    arr: ['差', '较差', '一般', '满意', '非常满意'],
    checked: true, //是否匿名
    min: 0,
    max: 100, //最大字数
    num: 0, //实时字数
    txt_val: "", //评价内容
    fileList: [], //上传图片转base64
    baseArr: [] //需要上传数组
  },
  //满意程度
  onChange(event) {
    let index = event.detail - 1
    this.setData({
      value: event.detail,
      test: this.data.arr[index]
    });
  },
//物流服务
  bindChange1(e) {
    console.log(e.detail)
    let index = e.detail - 1
    this.setData({
      value1: e.detail,
      test1: this.data.arr[index]
    });
  },
  //服务态度
  bindChange2(e) {
    let index = e.detail - 1
    this.setData({
      value2: e.detail,
      test3: this.data.arr[index]
    });
  },
  //是否匿名评价
  onChange2(event) {
    this.setData({
      checked: event.detail
    });
  },
  //显示字数
  inputs(e) {
    // console.log(e.detail)
    this.setData({
      num: e.detail.cursor,
      txt_val: e.detail.value
    })
  },
  //删除图片
  deletes(event) {
    let idx = event.detail.index;
    // console.log(event.detail.index)
    this.data.fileList.splice(idx, 1);
    this.data.baseArr.splice(idx, 1);
    this.setData({
      fileList: this.data.fileList,
      baseArr: this.data.baseArr
    })
  },
  //上传图片
  afterRead(event) {
    this.data.fileList.push(event.detail.file)
    this.setData({
      fileList: this.data.fileList
    })
    console.log(this.data.fileList)
    //转base64
    wx.getFileSystemManager().readFile({
      filePath: event.detail.file.path, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        //base64转图片链接
        util.we_request({
          "method": util.config.f_upload,
          "image": res.data
        }, respon => {
          console.log(respon.data.data.url)
          if (respon.data.status == 1) {
            this.data.baseArr.push(respon.data.data.url)
            this.setData({
              baseArr: this.data.baseArr
            })
          } else {
            wx.showToast({
              title: respon.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })





    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'Common/imageUpload', // 仅为示例，非真实的接口地址
    //   filePath: file.path,
    //   name: 'file',
    //   formData: {
    //     user: 'test'
    //   },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     console.log(res)
    //     const {
    //       fileList = []
    //     } = this.data;
    //     fileList.push({ ...file,
    //       url: res.data
    //     });
    //     this.setData({
    //       fileList
    //     });
    //   }
    // });
  },
  //发布
  announce() {
    //f_orderComment
    let arr = "";
    if (this.data.baseArr.length > 0) {
      arr = this.data.baseArr.join(",")
    } else {
      arr = ""
    }
    console.log("555")
    util.we_request({
      "method": util.config.w_orderComment,
      "order_id": this.data.order_id,
      "order_goods_id": this.data.order_goods_id,
      "service_evaluate_score": this.data.value,
      "logistics_evaluate_score": this.data.value,
      "describe_evaluate_score": this.data.value,
      "anonymous": this.data.checked == true ? "1" : "0",
      "comment_content": this.data.txt_val,
      "comment_image": arr
    }, res => {
      console.log(res.data.data.url)
      if (res.data.status == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000,
          // success: () => {
          //   wx.redirectTo({
          //     url: '../orderDetial/orderDetial?oid=' + this.data.order_id,
          //   })
          // }
        })

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    //获取订单id，商家名称
    this.setData({
      order_id: options.order_id,
      goods_title: options.title,
      imgs: options.cover_image,
      order_goods_id: options.order_goods_id
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
