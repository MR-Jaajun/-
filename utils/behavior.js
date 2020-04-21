module.exports = {
  search: Behavior({
    data: {
      isNearShop: true,
      isfocus: true
    },
    methods: {
      hideSearchView() {
        this.setData({
          isshowsearch: false
        })
      },
    }
  }),

  //有数据显示加载更多动画；没有则显示没有更多；
  loadMore: Behavior({
    attached: function() {
      var util = require("./util");
    },
    data: {
      isHideLoadMore: false,
      scrollHeight: 0,
      page: 1,
    },
    methods: {
      scrollLower() { //加载更多
        ++this.data.page
        this.getList(this.data.page)
      },
    }
  })
}