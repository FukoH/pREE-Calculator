// 检查输入是否为数字且大于0的公共函数
function isValidNumber(value: any) {
    // 判断输入是否为空或者0
    if (!value || parseFloat(value) === 0) {
      return false;
    }
    return /^\d+(\.\d+)?$/.test(value) && parseFloat(value) > 0;
  }

Component({
    data: {
        weight: 0,
        age: 0,
        gripStrength: 0,
        heartRate: 0,
        pREE: 0
    },
    methods: {
        bindWeightInput: function (e: any) {
            const value = e.detail.value;

            if (!isValidNumber(value)) {
                wx.showToast({
                  title: '请输入正确的体重',
                  icon: 'none'
                });
                return;
              }
            this.setData({
                weight: e.detail.value
            });
        },
        bindAgeInput: function (e:any) {
            const value = e.detail.value;

            if (!isValidNumber(value)) {
                wx.showToast({
                  title: '请输入正确的年龄',
                  icon: 'none'
                });
                return;
              }
            this.setData({
                age: e.detail.value
            });
        },
        bindGripStrengthInput: function (e:any) {
            const value = e.detail.value;

            if (!isValidNumber(value)) {
                wx.showToast({
                  title: '请输入正确的握力',
                  icon: 'none'
                });
                return;
              }
            this.setData({
                gripStrength: e.detail.value
            });
        },
        bindHeartRateInput: function (e:any) {
            const value = e.detail.value;

            if (!isValidNumber(value)) {
                wx.showToast({
                  title: '请输入正确的心率',
                  icon: 'none'
                });
                return;
              }
            this.setData({
                heartRate: e.detail.value
            });
        },
        calculate: function () {
            const pREE = 794.847 + 8.661 * this.data.weight - 7.976 * this.data.age + 14.757 * this.data.gripStrength + 5.037 * this.data.heartRate;
            this.setData({
                pREE: parseFloat(pREE.toFixed(2))
            });
        }
    }
});
