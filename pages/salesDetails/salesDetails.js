Page({
    data: {
        product: {
            name: "精品核桃一斤",
            img: "/images/test.jpg",
            price: 99.9,
        },
        refund: {
            reason: "商品已损坏",
            count: 1,
            price: 99.9,
            explanationImg: "/images/test.jpg",
        },
        steps: [
            {
                text: "顾客提交退款申请",
                desc: "2024-11-26 15:05",
            },
            {
                text: "退款完成",
                desc: "2024-11-26 15:09",
            },
        ],
        active: 0, // 当前进度的索引，从 0 开始
        show: false,
    },
    onLoad: function (options) {
        // 模拟设置退款进度
        this.setData({
            active: 1, // 当前步骤是 "商家审核中"
        });
    },
    showPopup() {
        this.setData({show: true});
    },
    onClose() {
        this.setData({show: false});
    },
});
