Page({
    data: {
        banner: "/images/test.jpg",
        desc: "这是一种非常特别的苹果，产自高山果园，经过精心挑选和包装。每个苹果都富含维生素C，口感脆甜，是健康生活的理想选择。",

        userinfo: {
            phone: 17771513712,
            username: "用户993",
            number: 5,
            orderNumber: 123456789,
        },
        recommendations: [
            {
                id: 1,
                name: "精品核桃一斤装精品核桃一斤装精品核桃一斤装",
                price: 199.99,
                image: "/images/test.jpg",
                number: 423534534,
            },
            {
                id: 2,
                name: "商品B",
                price: 299.99,
                image: "/images/test.jpg",
                number: 321312312321312,
            },
            {
                id: 3,
                name: "商品C",
                price: 399.99,
                image: "/images/test.jpg",
                number: 12312321312132,
            },
        ],
    },
    onLoad: function (options) {

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