// pages/mine/mineinfo/mine_info.js
const util = require('../../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    radio: "",
    isAvatar: false,
    show_picture: false,
    show_name: false,
    show_sex: false,
    show_data: false,
    // uPhoto:false,//选择时显示的图片
    userPhoto: '', //转换base64
    avatar: '', //未转换
    userName: '', //昵称
    telNum: '', //电话
    sex: '', //性别
    birthday: '', //生日
    // 日历的弹窗
    currentDate: new Date().getTime(),
    forMatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },

  //保存信息
  saveInfo() {
    util.we_request({
      "method": util.config.SETUSERINFO,
      "avatar": this.data.avatar,
      // "tel": this.data.telNum,
      "nick_name": this.data.userName,
      "gender": this.data.radio,
      "birthday": this.data.birthday
    }, res => {
      util.showloading("正在修改", "修改成功")
      // wx.showLoading({
      //   title: '正在修改',
      //   success() {
      //     setTimeout(function() {
      //       wx.hideLoading();
      //       wx.showToast({
      //         title: '修改成功',
      //         icon: 'success',
      //         duration: 1000
      //       })
      //     }, 800)
      //   }
      // })

      // console.log(this.data.userName, this.data.userPhoto);
    })

  },

  //日历的逻辑
  onInput(e) {
    // console.log(e.detail);
    // var a = new Date(e.detail);
    // console.log(a);
    // var b = util.formatTime(a).substring(0, 10)
    // console.log(util.formatTime(a).substring(0,10));
    // this.setData({ birthday : b})
  },
  birthday(e) {
    var time = new Date(e.detail);
    var birthday = util.formatTime(time).slice(0, 10); //截取
    this.setData({
      birthday,
      show_data: false
    });
  },

  // 弹框的状态
  //头像
  showPicture() {
    this.setData({
      show_picture: true
    });
  },
  closePicture() {
    this.setData({
      show_picture: false
    });
  },
  //名字
  showName() {
    this.setData({
      show_name: true
    });
  },
  closeName() {
    this.setData({
      show_name: false
    });
  },
  //性别
  showSex() {
    this.setData({
      show_sex: true
    });
  },
  closeSex() {
    this.setData({
      show_sex: false
    });
  },
  //日期
  showData() {
    this.setData({
      show_data: true
    });
  },
  closeData() {
    this.setData({
      show_data: false
    });
  },

  //跳转到修改手机号
  modify() {
    wx.navigateTo({
      url: '../mineset/new_tel/new_tel'
    })
  },
  //跳转到小哥会员等级页面
  level() {
    wx.navigateTo({
      url: '../level/level'
    })
  },

  //调用相机
  useCamera() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths[0]);
        this.setData({
          avatar: res.tempFilePaths[0],
          show_picture: false
        })
        //转换格式
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: (r) => {
            console.log(r.data);
            this.setData({
              userPhoto: r.data,
            })
          }
        })

      }
    })
  },
  //使用相册
  useAlbum() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths[0]);
        this.setData({
          avatar: res.tempFilePaths[0],
          show_picture: false,
        })
        //转换格式
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: (r) => {
            console.log(r.data);
            this.setData({
              userPhoto: r.data,
            })
          }
        })

      }
    })
  },
  //获取修改的昵称
  nameOK() {
    this.setData({
      show_name: false
    });
  },
  getVal(e) {
    console.log(e.detail);
    this.setData({
      userName: e.detail.value
    })
  },
  //修改性别
  onChange(e) {
    this.setData({
      radio: e.detail
    });
    if (e.detail == 1) {
      this.setData({
        sex: '男',
        show_sex: false
      });
    } else {
      this.setData({
        sex: '女',
        show_sex: false
      });
    }
  },

  //退出登录
  exitLogin() {
    wx.clearStorage({
      success: () => {
        console.log("缓存清除成功");
        util.showloading("正在退出", "退出成功", setTimeout(function() {
          wx.reLaunch({
            url: '../mine'
          })
        }, 500))
        // wx.showLoading({
        //   title: '正在退出',
        //   success: () => {
        //     setTimeout(function() {
        //       wx.hideLoading();
        //       wx.showToast({
        //         title: '退出成功',
        //         icon: 'success',
        //         duration: 800,
        //         success: () => {
                  // setTimeout(function () {
                  //   wx.reLaunch({
                  //     url: '../mine'
                  //   })
                  // }, 500)
        //         }
        //       })
        //     }, 500)
        //   }
        // })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    util.we_request({
      "method": util.config.GETUSERINFO
    }, res => {
      console.log(res.data.data);
      this.setData({
        isAvatar: false,
        userName: res.data.data.nick_name,
        telNum: res.data.data.mobile,
        radio: res.data.data.gender,
        avatar: res.data.data.avatar,
        birthday: res.data.data.birthday,
      })
    });
    // 性别
    if (this.data.radio == 1) {
      this.setData({
        sex: '男',
      });
    } else {
      this.setData({
        sex: '女',
      });
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
    // util.we_request({
    //   "method": "CustomUser/getUserInfo"
    // }, res => {
    //   console.log(res.data.data);
    //   this.setData({
    //     isAvatar:false,
    //     userName: res.data.data.nick_name,
    //     telNum: res.data.data.mobile,
    //     radio: res.data.data.gender,
    //     avatar: res.data.data.avatar,
    //     birthday: res.data.data.birthday,
    //   })
    // });
    // //性别
    // if (this.data.radio == 1) {
    //   this.setData({
    //     sex: '男',
    //   });
    // } else {
    //   this.setData({
    //     sex: '女',
    //   });
    // }
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