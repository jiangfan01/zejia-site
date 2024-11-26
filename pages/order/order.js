
Page({
    data: {
        show: false,
        searchValue: "",
        filterOptions: [
            {type: "all", name: "全部"},
            {type: "pending", name: "待提货"},
            {type: "completed", name: "已提货"},
            {type: "refund", name: "退款"},
        ],
        productList: [
            // 商品列表数据
            {
                id: 1,
                username: "张三",
                phone: "13800000000",
                orderNumber: "1234567890",
                time: "2023-05-15 12:20",
                img: "/images/test.jpg",
                name: "维他豆奶",
                price: 13.98,
                num: 2
            },
            {
                id: 2,
                username: "李四",
                phone: "13800000001",
                orderNumber: "1234567891",
                time: "2023-05-16 12:21",
                img: "/images/test.jpg",
                name: "苹果",
                price: 9.98,
                num: 1
            },
            {
                id: 3,
                username: "王五",
                phone: "13800000002",
                orderNumber: "1234567892",
                time: "2023-05-17 12:23",
                img: "/images/test.jpg",
                name: "香蕉",
                price: 5.98,
                num: 1
            },
            // ...其他商品数据
        ],
        selectedDate: "", // 选中的日期
        minDate: new Date(2020, 0, 1).getTime(), // 最小日期（2020-01-01）
        maxDate: new Date().getTime(), // 最大日期（今天）
        activeTab: 0,
    },
    showPopup() {
        this.setData({show: true});
    },
    // 确认选择日期
    onDateConfirm(event) {
        const selectedDate = this.formatDate(new Date(event.detail));
        this.setData({selectedDate, show: false});
        console.log("选中的日期：", selectedDate);
    },

    handleTabClick(e) {
        const {index} = e.currentTarget.dataset;
        this.setData({
            activeTab: Number(index)
        });
        // 根据选中的分类加载不同的数据
    },

    // 格式化日期为 YYYY-MM-DD
    formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    },

    // 搜索功能
    onSearch(event) {
        const searchValue = event.detail;
        this.setData({searchValue});
    },


    onClose() {
        this.setData({show: false});
    },

    // 假设这是根据订单ID获取订单信息的方法
    getOrderById(orderId) {
        // 这里应该是从后端API获取数据，为了简单起见，这里直接从productList中查找
        return this.data.productList.find(item => item.id === orderId);
    },

// 修改后的联系顾客方法
    onContact(orderId) {
        const order = this.getOrderById(3);
        if (order) {
            wx.makePhoneCall({
                phoneNumber: order.phone
            });
        } else {
            wx.showToast({
                title: '未找到该订单信息',
                icon: 'none',
                duration: 2000
            });
        }
    },

    onConfirm(){
      wx.showModal({
          title: '提示',
          content: '确定提货？',
          success: (res) => {
              if (res.confirm) {
                  wx.showToast({
                      title: '提货成功',
                      icon: 'success',
                      duration: 2000
                  });
              }
          }
      })
    },
    onAfterSales(){
      wx.navigateTo({
          url: '/pages/salesDetails/salesDetails'
      })
    },
    scanCode: function () {
        // 检查用户是否已经授权相机权限
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.camera']) {
                    // 用户未授权，请求授权
                    wx.authorize({
                        scope: 'scope.camera',
                        success: () => {
                            // 用户已授权，调用扫描二维码
                            this.doScanCode();
                        },
                        fail: () => {
                            // 用户拒绝授权，提示用户手动开启权限
                            wx.showModal({
                                title: '提示',
                                content: '需要相机权限才能扫描二维码，请在设置中开启权限',
                                showCancel: false,
                                confirmText: '去设置',
                                success: (res) => {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success: (res) => {
                                                if (res.authSetting['scope.camera']) {
                                                    // 用户在设置中开启了相机权限，再次调用扫描二维码
                                                    this.doScanCode();
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                } else {
                    // 用户已授权，直接调用扫描二维码
                    this.doScanCode();
                }
            }
        });
    },

    doScanCode: function () {
        wx.scanCode({
            success: (res) => {
                console.log('扫描结果:', res.result);
                // 处理扫描结果
                this.handleScanResult(res.result);
            },
            fail: (err) => {
                console.error('扫描失败:', err);
            }
        });
    },


    handleScanResult: function (result) {
        // 处理扫描结果，例如显示结果或跳转页面
        wx.showToast({
            title: '扫描结果: ' + result,
            icon: 'none',
            duration: 2000
        });
    }
});
