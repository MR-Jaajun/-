// 点击定位页
const app = getApp()
var util = require('../../utils/util');
var _defaultAddress = ""
import debounce from '../../libs/debounce.js'; //函数防抖
var behavior = require('../../utils/behavior');
Component({
  behaviors: [behavior.search],
  /**
   * 页面的初始数据
   */
  data: {
    isshowsearch: false,
    addressList: [],
    defaultAddress: "",
    isLocaled: 0,
    city:'未定位',
    suggestion:[]
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {},
    moved: function() {},
    detached: function() {
      this.setData({
        suggestion: []//离开清楚搜索结果
      })
    },
  },

  pageLifetimes: {
    show: function() {
      this.setData({ //显示选择城市页的城市名；直接打开此页面没有定位时处理
        city: app.globalData.city || '未定位'
      })
      wx.getSetting({ //判断是否授权定位。是:重新定位按钮，不是:授权定位按钮
        success: res => {
          if (res.authSetting['scope.userLocation']) { //定位已授权
            this.setData({
              isLocaled: 1
            })
          }
        }
      })
      util.we_request({//查询并显示默认地址
        "method": util.config.ADDRESSLIST
      }, res => {
        // console.log(res.data.data)
        for (let i in res.data.data) {
          if (res.data.data[i].is_default === 1) {
            _defaultAddress = res.data.data[i]
            console.log(_defaultAddress.address)
            break;
          }
        }
        this.setData({
          defaultAddress: _defaultAddress
        })
      })
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },

  methods: {
    // 选择默认地址
    setDefltAds() {
      app.globalData.location = _defaultAddress
      app.globalData.addressTitle = _defaultAddress.address
      wx.navigateBack({
        delta: 1
      })
    },

    //数据回填方法。 用户选中指定地址触发
    backfill: function(e) {
      var id = e.currentTarget.id;
      for (var i = 0; i < this.data.suggestion.length; i++) {
        if (i == id) {
          app.globalData.location = this.data.suggestion[i]
          console.log("定位页用户选中指定位置，存进globalData：", app.globalData.location)
          app.globalData.addressTitle = this.data.suggestion[i].title
          this.setData({
            backfill: this.data.suggestion[i].title
          });
          wx.navigateBack({
            delta: 1
          })
        }
      }
    },

    //触发关键词输入提示事件。 用户输入地址时触发
    getsuggest: debounce(function(e) {
      let _region = app.globalData.location
      console.log(_region)
      console.log(e.detail)
      if (e.detail){
        wx.showNavigationBarLoading()
        var _this = this;
        //调用关键词提示接口
        util.qqmapsdk.getSuggestion({
          //获取输入框值并设置keyword参数
          keyword: e.detail, //用户输入的关键词，可设置固定值,如keyword:'KFC'
          region: app.globalData.city || '', //设置城市名，限制关键词所示的地域范围，非必填参数
          success: function (res) { //搜索成功后的回调
            wx.hideNavigationBarLoading()
            console.log('搜索成功后的回调', res);
            var sug = [];
            for (var i = 0; i < res.data.length; i++) {
              sug.push({ // 获取返回结果，放到sug数组中
                title: res.data[i].title,
                id: res.data[i].id,
                addr: res.data[i].address,
                city: res.data[i].city,
                district: res.data[i].district,
                latitude: res.data[i].location.lat,
                longitude: res.data[i].location.lng
              });
            }
            _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
              suggestion: sug
            });
          },
          // fail: function (error) {
          //   console.error(error);
          // },
          // complete: function (res) {
          //   console.log(res);
          // }
        });
      }
    }, 300),

    toOpenSetting() {
      wx.openSetting({
        success(res) {
          console.log("openSetting", res)
          if (res.authSetting['scope.userLocation']) {
            util.getLocationProm()
          }
        }
      })
    },

    //重新定位
    getLocationHandle() {
      util.getLocationProm().then(res => {
        app.globalData.addressTitle = ''
        app.globalData.location = res
        console.log('重新定位：' ,app.globalData.location)
        wx.navigateBack({
          delta: 1
        })
      })
    },

    //搜索结果弹出
    // searchChange(e) {
    //   console.log(e.detail)
    //   if (e.detail) {
    //     this.setData({
    //       isshowsearch: true
    //     })
    //   } else {
    //     this.setData({
    //       isshowsearch: false
    //     })
    //   }
    // },
    // hideSearchView() {
    //   this.setData({
    //     isshowsearch: false
    //   })
    // },
    togetaddr: function() {
      wx.navigateTo({
        url: 'getaddress',
      })
    },
  },
})