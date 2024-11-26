// app.js
const qqMapWX = require('/until/qqmap-wx-jssdk.js'); // 引入腾讯地图 SDK

App({
  globalData: {
    location: '',
    address: '',
    locationReadyCallback: null
  },

  onLaunch: function () {
    this.checkLocationPermission();
  },

  checkLocationPermission: function () {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              this.getLocation();
            },
            fail: () => {
              wx.showModal({
                title: '提示',
                content: '需要获取您的位置信息，请在设置中开启授权。',
                showCancel: false,
                confirmText: '去设置',
                success: (res) => {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (res) => {
                        if (res.authSetting['scope.userLocation']) {
                          this.getLocation();
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none'
                          });
                        }
                      }
                    });
                  }
                }
              });
            }
          });
        } else {
          this.getLocation();
        }
      }
    });
  },

  getLocation() {
    const qqmapsdk = new qqMapWX({
      key: '7NRBZ-GELKJ-5VLFA-XMIL4-LUEXH-XQF6I' // 替换为你自己的腾讯地图 key
    });

    const that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            const location = res?.result?.address_reference.crossroad?.title;
            const address = res.result.address_reference.landmark_l2.title;

            // 设置全局数据
            that.globalData.location = location;
            that.globalData.address = address;
            console.log('定位成功', location, address)
            if (that.globalData.locationReadyCallback) {
              that.globalData.locationReadyCallback(location, address);
            }

          },
          fail: function (err) {
            console.error('反地理编码失败', err);
          }
        });
      },
      fail: function (err) {
        console.error('获取位置失败', err);
      }
    });
  }
});
