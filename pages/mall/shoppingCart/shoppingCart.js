// pages/mall/shoppingCart/shoppingCart.js
const http = require('../../../utils/gethttp.js');
Page({
  data: {
    cartsArray: [], // 购物车列表
    hasList: false, // 列表是否有数据
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认不选
    shop_id: 0,
    count: '',
  },

  /**
   * 当前店铺选中全部商品事件
   */
  selectArray(e) {
    let cartsArray = this.data.cartsArray;
    const index = e.currentTarget.dataset.index;
    var carts = cartsArray[index].goods_list;
    var aitem = cartsArray[index]
    aitem.isSelected = !aitem.isSelected
    console.log(aitem.isSelected, 'aitem.isSelected')
    carts.map(item => {
      if (aitem.isSelected) {
        item.isSelected = true
      } else {
        item.isSelected = false
      }
    })
    this.setData({
      cartsArray: cartsArray,
    });
    this.changeselectAllStatus()
    this.getTotalPrice()
  },
  /**
  *改变全选状态
   */
  changeselectAllStatus(){
    var cartsArray = this.data.cartsArray
    var countg = 0
    var allNum = 0
      cartsArray.map(item => {
        var goodSArr = item.goods_list
         goodSArr.map(gitem => {
              if(gitem.isSelected){
                countg++
              }
              allNum++
         })

      })
    var status = false
    if(countg == allNum){
      status = true
    }
    else{
      status = false
    }
   this.setData({
     selectAllStatus:status
   })
  },
  /**
   * 当前商品选中事件
   */
  selectcarts(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let idx = e.currentTarget.dataset.idx;
    var cartsArray = this.data.cartsArray;
    var carts = cartsArray[index].goods_list;
    var gitem = carts[idx]
    var sitem = cartsArray[index]
    gitem.isSelected = !gitem.isSelected;
    var count = 0;
    carts.map(goodsitem => {
      if (goodsitem.isSelected) {
        count++
      }
    })
    if (count == carts.length) {
      sitem.isSelected = true
    } else {
      sitem.isSelected = false
    }
    this.setData({
      cartsArray: cartsArray,
    });
    this.changeselectAllStatus()
    this.getTotalPrice()
  },

  /**
   * * 计算选中后总价
   */
  getTotalPrice() {
    var cartsArray = this.data.cartsArray;
    var total = 0.00
    var countH = 0
    //选择一项店铺
    cartsArray.map(item => {
      var goodSArr = item.goods_list
      goodSArr.map(gitem => {
        if (gitem.isSelected) {
          countH++
          total += gitem.goods_amount * parseFloat(gitem.sale_price)
        }
      })

    })
    this.setData({ // 最后赋值到data中渲染到页面
      totalPrice: total.toFixed(2),
      count: countH,
    });
  },



  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    var cartsArray = this.data.cartsArray;
    if (selectAllStatus) {
      cartsArray.map(item => {
        item.isSelected = true
        item.goods_list.map(b => {
          b.isSelected = true
        })
      })
    } else {
      cartsArray.map(item => {
        item.isSelected = false
        item.goods_list.map(b => {
          b.isSelected = false
        })
      })
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      cartsArray: cartsArray
    });
    let list = []
    cartsArray.map(item => {
      list.push(...item.goods_list)
    })
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    let idx = e.currentTarget.dataset.idx;
    var cartsArray = this.data.cartsArray;
    let num = cartsArray[index].goods_list[idx].goods_amount
    num = num + 1;
    cartsArray[index].goods_list[idx].goods_amount = num;
    let cart_id = cartsArray[index].goods_list[idx].cart_id;
    this.onChange(cart_id, num)
    this.setData({
      cartsArray: cartsArray
    });
    let item = cartsArray[index].goods_list[idx]
    this.getTotalPrice();
  },

  //更新购物车
  onChange(id, amount) {
    wx.request({
      url: http.baseURL2,
      method: "GET",
      header: http.header,
      data: {
        method: 'MallShop/updateCart',
        cart_id: id,
        goods_amount: amount
      },
      success: (res => {
        console.log(res.data)
        // http.showtoast(res.data.msg, "success")
      })
    })
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    let index = e.currentTarget.dataset.index;
    let idx = e.currentTarget.dataset.idx;
    var cartsArray = this.data.cartsArray;
    let num = cartsArray[index].goods_list[idx].goods_amount;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    cartsArray[index].goods_list[idx].goods_amount = num;

    let cart_id = cartsArray[index].goods_list[idx].cart_id;
    this.onChange(cart_id, num)
    this.setData({
      cartsArray: cartsArray
    });
    let item = cartsArray[index].goods_list[idx]
    this.getTotalPrice(item);
  },

  //获取购物车列表
  cartList() {
    http.request("POST", {
      method: 'MallShop/cartList',
    }).then(res => {
      var arrdata = res.data.data
      arrdata.map(item => {
        item.isSelected = false
        item.goods_list.map(b => {
          b.isSelected = false
        })
      })
      console.log(arrdata)
      this.setData({
        cartsArray: arrdata,
      })
      this.AllMap()
    })
  },

  //全选遍历订单
  AllMap() {
    let list = []
    let listArray = this.data.cartsArray
    listArray.map(item => {
      list.push(...item.goods_list)
    })
    this.setData({
      cartsList: list
    })
  },
 
 //结算确认订单
  confirm(){
   wx.navigateTo({
     url: '/pages/mall/confirmOrder/confirmOrder',
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
    this.cartList()
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
