// pages/mine/service/complain/complain_info/complain_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    imgsrc: [],
    chooseImg: true,
    actions: [{
        name: '请选择问题类型',
        disabled: true,
      },
      {
        name: '商品变质过期、有异物',
      },
      {
        name: '商家告知不能配送',
      },
      {
        name: '商家少送、错送菜品',
      },
      {
        name: '商家要求我删除差评',
      },
    ]
  },
  //关闭弹窗
  choose_problem() {
    this.setData({
      show: true
    });
  },
  //关闭弹窗
  onClose() {
    this.setData({
      show: false
    });
  },
  onSelect(event) {
    console.log(event.detail);
  },
  //选择图片
  chooseImage() {
    var _this = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        _this.setData({
          imgsrc: _this.data.imgsrc.concat(res.tempFilePaths)
        });
        // 数组长度
        console.log(_this.data.imgsrc.length);
        if (_this.data.imgsrc.length == 3) {
          _this.setData({
            chooseImg:false
          });
        }

      }
    });
  },
  //点击大图
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imgsrc // 需要预览的图片http链接列表
    })
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