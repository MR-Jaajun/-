// pages/mine/address/alter_address/alter_address.js
import {
  add_address
} from '../../../getaddress/address.js';

const util = require("../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: add_address,
    address_info: "",
    choose_address: false,
    address_id:"",//收货id
    receiver: "",//收货人
    mobile: "",//手机号
    address_arr: "",//省市区的数组
    province: "",//省
    city: "",//市
    area: '',//区
    address: "",//详细地址
    lng: "",//经度
    lat: "",//纬度
    choose_address: false,
    boolen: true,//控制是否默认开关
    is_default:1
  },
  //是否选择默认地址
  onChanges({detail}) {
    this.data.boolen = !this.data.boolen;
    if (this.data.boolen){
      this.setData({
        "address_info.is_default":true,
        is_default: 1
      })
    }else{
      this.setData({
        "address_info.is_default": false,
        is_default: 0
      })
    }
    console.log(this.data.is_default);
  },
  //展示地址
  choose_address() {
    this.setData({
      choose_address: true
    });
  },
  //收起地址
  close_address() {
    this.setData({
      choose_address: false
    });
  },
  //选择省市区 并且显示
  onChange({ detail }) {
    console.log(detail.values)
    this.setData({
      choose_address: false,
      address_arr: detail.values,
      "address_info.province": detail.values[0].name,
      "address_info.city": detail.values[1].name,
      "address_info.area": detail.values[2].name,
    });
  },
  //收货人
  getName(e) {
    console.log(e.detail.value);
    this.setData({
      receiver: e.detail.value
    })
  },
  //手机号
  getTel(e) {
    console.log(e.detail);
    this.setData({
      mobile: e.detail.value
    })
  },

  //详细地址
  getDatail(e) {
    console.log(e.detail.value);
    this.setData({
      address: e.detail.value
    })
  },
  //保存地址
  address() {
    //CustomAddress/addAddress  新增地址
    util.qqmapsdk.geocoder({
      address: this.data.province + this.data.city + this.data.area + this.data.address,
      success: res => {
        // console.log(res.result);
        // console.log(res.result.location.lng, res.result.location.lat)
        this.setData({
          lng: res.result.location.lng,//经度
          lat: res.result.location.lat//维度
        });
        util.we_request({
          "method": util.config.UPDATEADDRESS,
          "address_id":this.data.address_id,//地址id
          "receiver": this.data.receiver,//收货人
          "mobile": this.data.mobile,//手机号
          "province": this.data.province,//省
          "city": this.data.city,//市
          "area": this.data.area,//区
          "longitude": this.data.lng,//经度
          "latitude": this.data.lat,//纬度
          "address": this.data.address,//详细地址
          "is_default": this.data.is_default//是否默认
        }, res => {
          console.log("保存数据成功");
          //弹窗
          util.showloading("保存中", "保存成功", setTimeout(function () {
            wx.redirectTo({
              url: "../address"
            })
          }, 500));
        })
        // console.log("经度：" + this.data.lng, "纬度：" + this.data.lat);
      }
    });

  },
  //是否删除弹窗
  isDel() {
    this.setData({
      is_delete: true
    });
  },
  // 删除地址
  delAddress() {

    util.we_request({
      "method": util.config.DELETEADDRESS,
      "address_ids": this.data.address_id
    },res=>{
      console.log("删除成功");
      //弹窗
      util.showloading("保存中", "保存成功", setTimeout(function () {
        wx.redirectTo({
          url: "../address"
        })
      }, 200));
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var detail_info = JSON.parse(options.detail_info);
    console.log(detail_info);
    this.setData({
      address_info: detail_info,
      "address_info.is_default":true,
      address_id: detail_info.address_id,//地址ID
      receiver: detail_info.receiver,//收货人
      mobile: detail_info.mobile,//手机号
      province: detail_info.province,//省
      city: detail_info.city,//市
      area: detail_info.area,//区
      lng: detail_info.lng,//经度
      lat: detail_info.lat,//纬度
      address: detail_info.address,//详细地址
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