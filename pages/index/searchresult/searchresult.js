
// var shopid = 0; //店铺id
// var keywordP = ""
// Component({
//   // behaviors: [behavior.search],
//   data: {
//     isshowsearch: false,
//     searchList: [],
//     value: ""
//   },
//   observers: { //监听
//   },

//   methods: {
//     getValue: debounce(function(e) {
//       if (shopid){
//         util.we_request({
//           "method": util.config.SEARCHGOODS,
//           "goods_title": e.detail,
//           "shop_id": shopid
//         }, res => {
//           this.setData({
//             searchList: res.data.data
//           })
//           console.log(this.data.searchList)
//         })
//       }else{
//         util.we_request({
//           "method": util.config.SEARCH,
//           "keyword": e.detail,
//           "sort_type": 3
//         }, res => {
//           this.setData({
//             searchList: res.data.data
//           })
//           console.log(this.data.searchList)
//         })
//       }
//     }, 300),

//     // searchChange: debounce(function(e) {
//     //   util.we_request({
//     //     "method": util.config.SEARCHGOODS,
//     //     "keyword": e.detail,
//     //     "shop_id": 10001
//     //     // "shop_id": shopid
//     //   }, res => {
//     //     this.setData({
//     //       searchList: res.data.data
//     //     })
//     //     console.log(this.data.searchList)
//     //   })

//     //   if (e.detail) {
//     //     this.setData({
//     //       isshowsearch: true
//     //     })
//     //   } else {
//     //     this.setData({
//     //       isshowsearch: false
//     //     })
//     //   }
//     // }, 300),

//     onLoad: function(options) {
//       shopid = parseInt(options.shopid)
//     },
//   },
// })
