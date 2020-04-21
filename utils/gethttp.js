/*
 * @Description: 
 * @Author: Roc
 * @Date: 2019-12-09 19:13:18
 * @LastEditors  : Roc
 * @LastEditTime : 2020-01-16 16:25:12
 */
const POST = "POST";
const baseURL1 = 'https://interface.xgscheng.com/mini/'; //正式
const baseURL2 = 'https://apitest.xgscheng.com/mini/'; //开发
const token = wx.getStorageSync('mini_token');
const userinfo = wx.getStorageSync("userinfo");
const location = wx.getStorageSync("location");
const time = Date.parse(new Date()) / 1000;
const signature = Date.parse(new Date()) / 1000 + 'abc';

//请求方式
const header = {
  'content-type': 'application/json',
  'token': token,
  'deviceid': 'weapp',
  'devicetype': "3",
  'appversion': 'v221',
  'longitude': location.longitude,
  'latitude': location.latitude,
  'timestamp': time,
  'signature': userinfo.signature || signature,
};

// const header_post = {
//   'content-type': 'application/x-www-form-urlencoded',
//   'token': token || app.globalData.mini_token,
//   'deviceid': 'weapp',
//   'devicetype': "3",
//   'appversion': 'v0.1.20190730',
//   'longitude': app.globalData.location.longitude || 113.464662,
//   'latitude': app.globalData.location.latitude || 23.10911,
//   'timestamp': app.globalData.timestamp,
//   'signature': userinfo.signature || app.globalData.timestamp,
// }

function request(method, data) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise(function(resolve, reject) {
    wx.request({
      url: baseURL2,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success: res => {
        wx.hideLoading();
        if (res.data.code == '200') {
          resolve(res);
        } else {
          resolve(res);
        }

      },
      fail(err) {
        wx.hideLoading();
        //请求失败
        reject(err)
        console.log(res)
      }
    })
  })
}
/*********************************/


//日期转换时间戳
function gettime(str) {
  let a = new Date(str);
  let time = a.getTime();
  return time
}

//获取当前时间戳
function timestamp() {
  let time = (new Date()).getTime();
  return time
}
//提示框 type = success none
function showtoast(title, type) {
  wx.showToast({
    title: title,
    icon: type,
    duration: 2000
  })
}


module.exports = {
  baseURL1,
  baseURL2,
  header,
  request,
  gettime,
  timestamp,
  showtoast
}
