import {
  cities
} from './city';
import debounce from '../../libs/debounce.js'; //函数防抖
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    cities: [],
    hotCities: [
      "北京", "上海", "广州", "深圳", "天津", "杭州"
    ],
    city: '未定位',
    searchCities: []
  },

  onLoad() {
    this.setData({
      city: app.globalData.city || '未定位'
    })
  },

  //选择搜索结果的城市
  getSearchCity(e) {
    app.globalData.city = e.currentTarget.dataset.name
    wx.navigateBack({
      delta: 1
    })
  },
  //选择热门城市
  getHotCity(e) {
    app.globalData.city = e.currentTarget.dataset.name
    wx.navigateBack({
      delta: 1
    })
  },


  //触发关键词输入提示事件
  getsuggest: debounce(function(e) {
    let _searchCities = []
    if (e.detail) {
      wx.showNavigationBarLoading()
      for (let i of cities) {
        if (i.name.indexOf(e.detail) > -1) {
          _searchCities.push(i.name)
        }
      }
      this.setData({
        searchCities: _searchCities
      })
      wx.hideNavigationBarLoading()
    } else {
      this.setData({
        searchCities: []
      })
    }
  }, 300),

  //清空搜索结果
  resetSearch() {
    this.setData({
      searchCities: []
    })
  },

  getHotCity(e) {
    app.globalData.city = e.currentTarget.dataset.name
    wx.navigateBack({
      delta: 1
    })
  },

  getaddr: function(e) {
    app.globalData.city = e.currentTarget.dataset.addrname
    // console.log(app.globalData.city)
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  onReady() {
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName
      });
    })
    this.data.cities = storeCity;
    this.setData({
      cities: this.data.cities
    })
  }
});