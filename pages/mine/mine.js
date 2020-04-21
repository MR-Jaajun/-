// pages/mine/mine.js
const http = require("../../utils/gethttp.js");
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unLogin: true,
    nick_name: '', //用户名称
    vip_level: "", //小哥等级
    invite_code: '', //邀请码
    upgrade_tip: '', //升级提示
    avatar: "", //用户头像
    accumulative_money: '4.56', //累计收入
    month_money: '23.10', //本月结算收入
    estimate_money: '4.56', //本月预估收入
    istrue: false,
    balance_amount: "", //用户余额
    bean_amount: "" //小哥豆余额
  },
  // 跳转到我的信息页面
  set_page() {
    wx.navigateTo({
      url: './mineinfo/mine_info'
    })
  },
  // 跳转到我的收藏
  my_collect() {
    wx.navigateTo({
      url: './mycollect/my_collect'
    })
  },
  //跳转到我的收益
  my_earningst() {
    wx.navigateTo({
      url: './myearnings/my_earnings'
    })
  },
  //跳转到我的钱包
  my_wallet() {
    wx.navigateTo({
      url: './mywallet/my_wallet?balance=' + this.data.balance_amount + "&bean=" + this.data.bean_amount
    })
  },
  //跳转到我的团队
  my_team() {
    wx.navigateTo({
      url: './myteam/my_team'
    })
  },
  //跳转到邀请好友
  invite_friends() {
    wx.navigateTo({
      url: './invite_friends/invite_friends?avatar=' + this.data.avatar + "&name=" + this.data.nick_name + "&code=" + this.data.invite_code + "&vip=" + this.data.vip_level
    });
  },
  //跳转到我的等级
  vipLevel() {
    wx.navigateTo({
      url: './level/level?vip=' + this.data.vip_level,
    })
  },
  //跳转收获地址管理
  address() {
    wx.navigateTo({
      url: './address/address'
    })
  },
  //跳转服务中心
  service() {
    wx.navigateTo({
      url: './service/service'
    })
  },
  //跳转到意见反馈
  feedback() {
    wx.navigateTo({
      url: './feedback/feedback'
    })
  },
  //获取用户信息
  userinfo() {
    http.request("GET", {
      "method": util.config.GETUSERINFO
    }, res => {
      this.setData({
        invite_code: res.data.data.invite_code, //邀请码
        upgrade_tip: res.data.data.upgrade_tip, //升级提示
        vip_level: res.data.data.vip_level, //小哥等级
        nick_name: res.data.data.nick_name, //用户名称
        avatar: res.data.data.avatar, //用户头像
        accumulative_money: res.data.data.income_amount, //累计收入
        month_money: res.data.data.current_month_income, //本月结算
        estimate_money: res.data.data.current_month_estimate_income, //本月预估
        balance_amount: res.data.data.balance_amount, //余额
        bean_amount: res.data.data.bean_amount, //小哥豆余额 
      })
      let mobile = res.data.data.mobile
      wx.setStorage({
        key: "PhoneNumber",
        data: mobile
      })
      console.log(res.data.data);
    });
  },

  tologin() {
    util.we_getToken(res => {
      if (res.data.data.bind_mobile == 0) {
        console.log("我是0")
        console.log("从未绑定，重来没登录过")
        wx.navigateTo({
          url: '/pages/login/login',
        })
      } else {
        this.userinfo();
        this.setData({
          unLogin: false
        });
      }
    })
  },

  toGetUserInfo() {

  },

  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function() {
    // try { //
    //   wx.getSetting({ // 用户授权
    //     success: res => {
    //       console.log("getSetting", res)
    //       if (res.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像
    //         var token_key = wx.getStorageSync('mini_token');
    //         if (token_key) {
    //           wx.getUserInfo({
    //             success: res => {
    //               this.userinfo();
    //             }
    //           });
    //           console.log("有token", token_key)
    //           this.setData({
    //             unLogin: false
    //           })
    //         } else {
    //           console.log("没有token", token_key)
    //           this.setData({
    //             unLogin: true
    //           })
    //         }
    //         console.log("进入scope.userInfo, 证明用户已授权")

    //       } else {
    //         // if (token_key){//目的是有token但又没有授权的极少几率情况的处理
    //         //   wx.showModal({
    //         //     title: '用户未授权，请删除小程序重新授权',
    //         //     // content: '',
    //         //     showCancel: false
    //         //   })
    //         // }
    //         // wx.authorize({
    //         //   scope: 'scope.userInfo',
    //         //   success: () => {
    //         //     console.log(222)
    //         //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //         //     wx.getUserInfo({
    //         //       success: res => {
    //         //         this.userinfo();
    //         //       }
    //         //     });
    //         //   },
    //         //   fail: res => {
    //         //     console.log("fail", res)
    //         //   }
    //         // })
    //       }
    //     }
    //   });

    // } catch (e) {
    //   console.log("错误信息" + e)
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