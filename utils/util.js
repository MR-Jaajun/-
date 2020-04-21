var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'GBZBZ-7IOC6-H7PSH-MOUPL-6WZTZ-2FBOE' // 必填
});
const http= require('gethttp.js')
const config = require('config.js')
const store = require('store.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取定位
const getLocationProm = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        getApp().globalData.location = res
        store.setItem('location', res);
        // console.log("获得定位信息，存进globalData：", getApp().globalData.location)
        resolve(res)
      },
      fail: res => {
        wx.showModal({
          title: '定位失败，请重新定位',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/getaddress/historyaddress',
              })
            }
          }
        })
        reject(res)
      }
    })
  })
}

//转base64 feng
const getBase64 = ({
  url,
  type
}) => {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: url, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => {
        // resolve('data:image/' + type.toLocaleLowerCase() + ';base64,' + res.data)
        resolve(res.data)
      },
      fail: res => reject(res.errMsg)
    })
  })
}

// 排序方法
const compare = property => {
  return function(a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}

//验证手机号是否11位并且1开头
const checkMobile = (str, cb) => {
  const re = /^1\d{10}$/
  let isPhone = true
  if (re.test(str)) {
    typeof cb == "function" && cb(isPhone);
  } else {
    isPhone = false
    typeof cb == "function" && cb(isPhone);
  }
}

function showloading(title1 = "加载中", title2 = "成功", callback) {
  wx.showLoading({
    title: title1,
    success: () => {
      setTimeout(function() {
        wx.showToast({
          title: title2,
          icon: 'success',
          duration: 800,
          success() {
            typeof callback == "function" && callback(res);
          }
        })
      }, 300)
    }
  })
}

// function tomineLogin(){

// }

/**
 * 封装请求,主要让we_request调用
 * 每次请求都要头部加载动画，请求失败前端界面抛异常提示
 * @param data 接口参数
 * @param callback 回调函数
 * @param miniurl 小程序特有接口必须传的参数
 */
function request(data, callback, miniurl = ``) {
  wx.showNavigationBarLoading()
  const app = getApp()
  wx.request({
    method: 'POST',
    url: http.baseURL2 + miniurl,
    data,
    header: {
      'content-type': 'application/json',
      'deviceid': 'weapp',
      'devicetype': "3",
      'appversion': 'v0.1.20190730',
      'longitude': app.globalData.location.longitude || 113.464662,
      'latitude': app.globalData.location.latitude || 23.10911,
      'timestamp': app.globalData.timestamp,
      'token': app.globalData.mini_token,
      'signature': app.globalData.signature, //使用微信getuserinfo的signature
    },
    success: res => {
      // 用户登录守卫
      if (res && res.data.code == 200) {
        typeof callback == "function" && callback(res);
      } else {
        if (res.data.code == -100 || res.data.code == -101) {
          // console.log("接口返回code为负数，该操作需要登录，要用户重新登录")
          wx.showModal({
            title: "提示",
            content: "登录以使用完整功能",
            success: res => {
              if (res.confirm) {
                this.we_getToken()
              }
            }
          })
        } else {
          console.log("接口返回错误信息：", data, res)
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    },
    fail: fes => {
      console.log("util.request抛出：", fes)
    },
    complete: (e) => {
      wx.hideNavigationBarLoading()
    }
  })
}



function we_request2(data, callback, miniurl = ``) {
  if (getApp().globalData.location.longitude) {
    // console.log("we_request2有定位")
    this.request(data, callback, miniurl = ``)
  } else {
    // console.log("we_request2无定位")
    this.getLocationProm().then(() => {
      this.request(data, callback, miniurl = ``)
    })
  }
}

function we_request(data, callback, miniurl = ``) {
  const app = getApp()
  if (app.globalData.mini_token) {
    // console.log("util.we_request有globalData.mini_token")
    if (app.globalData.location.longitude) {
      // console.log("有定位")
      this.request(data, callback, miniurl = ``)
    } else {
      // console.log("无定位")
      this.getLocationProm().then(() => {
        this.request(data, callback, miniurl = ``)
      })
    }
  } else {
    // console.log("util.we_request没有globalData.mini_token,去缓存拿")
    try {
      let token = wx.getStorageSync('mini_token')
      let miniOpenid = wx.getStorageSync('mini_openid')
      let userinfo = wx.getStorageSync('userinfo')
      if (token && userinfo.signature && miniOpenid) {
        app.globalData.mini_token = token
        app.globalData.mini_openid = miniOpenid
        app.globalData.signature = userinfo.signature
        if (app.globalData.location.longitude) {
          // console.log("有定位")
          this.request(data, callback, miniurl = ``)
        } else {
          // console.log("无定位")
          this.getLocationProm().then(() => {
            this.request(data, callback, miniurl = ``)
          })
        }
      } else {
        // console.log("缓存没有重新getToken")
        this.we_getToken()
      }
      //this.we_showLoading("登录过期，正在重新登录") 做重新登录提示交互
    } catch (e) {
      console.log("util.we_request的catch抛出：", e)
    }
  }
}
// 获取token，并登录
function we_getToken(callback, fcallback) {
  const app = getApp()
  wx.login({
    success: res => { //调用登录接口获得code
      app.globalData.mini_code = res.code
      console.log("code", res)
      wx.getSetting({ // 用户授权
        success: res => {
          if (res.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像
            console.log("进入scope.userInfo, 证明用户已授权")
            wx.getUserInfo({
              success: res => {
                console.log('开始getToken', res)
                this.we_setStorage("userinfo", res)
                app.globalData.signature = res.signature
                wx.request({
                  method: 'POST',
                  url: http.baseURL2 + config.LOGIN,
                  data: {
                    "method": config.LOGIN,
                    "code": app.globalData.mini_code,
                    "iv": res.iv,
                    "encryptedData": res.encryptedData
                  },
                  header: {
                    'content-type': 'application/json',
                    'deviceid': 'weapp',
                    'devicetype': "3",
                    'appversion': 'v0.1.20190730',
                    'longitude': app.globalData.location.longitude || 113.464662,
                    'latitude': app.globalData.location.latitude || 23.10911,
                    'timestamp': app.globalData.timestamp,
                    'signature': app.globalData.signature, //使用微信getuserinfo的signature
                  },
                  success: res => {
                    if (res.data.code === 200) {
                      this.we_setStorage("mini_openid", res.data.data.mini_openid)
                      app.globalData.mini_openid = res.data.data.mini_openid
                      if (res.data.data.bind_mobile) {
                        this.we_setStorage("mini_token", res.data.data.token)
                        app.globalData.mini_token = res.data.data.token
                        typeof callback == "function" && callback(res);
                        console.log("getToken接口返回的token和openid:", res.data.data)
                      } else {
                        wx.showModal({
                          title: '新用户，现在去注册',
                          success(res) {
                            if (res.confirm) {
                              wx.navigateTo({
                                url: '/pages/login/login',
                              })
                            }
                          }
                        })
                      }
                    } else {
                      wx.showToast({
                        title: res.data.msg,
                        icon: "none"
                      })
                      console.log("非200请求返回", res)
                    }
                  },
                  complete: () => {
                    wx.hideLoading()
                  }
                })
              }
            })
          } else {
            typeof fcallback == "function" && fcallback(res);
            wx.hideLoading();
            console.log("util.we_getToken=>用户还没有授权或过期")
            wx.showModal({
              title: '提示',
              content: '登录过期，现在去登录以使用完整功能',
              // showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/mine/mine',
                  })
                  // console.log('用户点击确定')
                }
              }
            })
          }
        }
      })
    },
    fail: () => {
      wx.hideLoading();
    }
  })
}


//路由返回
function we_navigateBack(dalta = 1, callback) {
  wx.navigateBack({
    delta: dalta,
    success: () => {
      typeof callback == "function" && callback();
    }
  })
}
//消息提示框
function we_showToast(title = "登录成功", icon = "success") {
  wx.showToast({
    title,
    icon
  })
}
// loading
function we_showLoading(title = "加载中") {
  wx.showLoading({
    title: title,
  })
}
// 将数据存入缓存中
function we_setStorage(key, value) {
  wx.setStorage({
    key: key,
    data: value
  })
}
// 获取缓存数据
function we_getStorage(key, callback, failcallback) {
  wx.getStorage({
    key: key,
    success: function(res) {
      typeof callback == "function" && callback(res);
    },
    fail: function(res) {
      typeof failcallback == "function" && failcallback(res);
    }
  })
}

// 将页面滚动到目标位置 
function we_pageScrollTo(scrollTop = 0) {
  wx.pageScrollTo({
    scrollTop
  })
}

module.exports = {
  formatTime,
  we_navigateBack,
  we_showToast,
  we_showLoading,
  we_setStorage,
  we_getStorage,
  we_pageScrollTo,
  we_request,
  we_getToken,
  config,
  showloading,
  request,
  formatNumber,
  checkMobile,
  compare,
  getBase64,
  getLocationProm,
  qqmapsdk,
  we_request2,
  // wxrequest
  // tomineLogin
}
