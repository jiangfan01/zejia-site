Page({
    data: {
        searchValue: '', // 搜索框输入值
        productList: [ // 原始商品数据
            {
                id: 1,
                name: "核桃一斤装",
                username: "17771513712",
                image: "/images/test.jpg",
            },
            {
                id: 2,
                name: "脆苹果6个",
                username: "17771513713",
                image: "/images/test.jpg",
            },
            {
                id: 3,
                name: "香蕉一把",
                username: "17771513714",
                image: "/images/test.jpg",
            },
        ],
        filteredList: [], // 筛选后的商品数据
    },
    onLoad: function (options) {
        const app = getApp();
        this.setData({filteredList: this.data.productList}); // 初始化显示所有商品
        // 设置全局位置和地址数据
        if (app.globalData.location && app.globalData.address) {
            this.setData({
                location: app.globalData.location,
                address: app.globalData.address
            });
        } else {
            app.globalData.locationReadyCallback = (location, address) => {
                this.setData({location: location, address: address});
            };
        }
    },
    onSearch(e) {
        const query = e.detail; // 获取搜索框输入值
        this.setData({searchValue: query});
        // 根据商品名或用户名进行筛选
        const filteredList = this.data.productList.filter(item =>
            item.name.includes(query) || item.username.includes(query)
        );
        this.setData({filteredList});
    },
    onClear() {
        this.setData({
            searchValue: '',
            filteredList: this.data.productList, // 清空后恢复原始列表
        });
    },
    onDetail() {
        wx.navigateTo({
            url: '/pages/details/details'
        })
    }
});