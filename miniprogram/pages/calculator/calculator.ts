// 检查输入是否为数字且大于0的公共函数
function isValidNumber(value: any) {
    // 判断输入是否为空或者0
    if (!value || parseFloat(value) === 0) {
      return false;
    }
    return /^\d+(\.\d+)?$/.test(value) && parseFloat(value) > 0;
  }

  const formulas = [ 
  { name: '1BJH-ZHW1公式' },
  { name: 'Alemán公式' },
  { name: 'Lührmann1公式' },
  { name: 'Harris-Benedict（HB公式）' },
  { name: 'FAO-WHO-UNU（WHO公式）' },
  { name: 'ESPEN公式' },
]

Component({
    data: {
        weight: 0,
        height:0,
        age: 0,
        gripStrength: 0,
        heartRate: 0,
        gender: 'male',
        formulas: formulas
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
        bindHeightInput: function (e: any) {
            const value = e.detail.value;

            if (!isValidNumber(value)) {
                wx.showToast({
                  title: '请输入正确的身高',
                  icon: 'none'
                });
                return;
              }
            this.setData({
                height: e.detail.value
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
        selectGender: function(e:any) {
            this.setData({
              gender: e.detail.value
            });
          },
        calculate: function() {
            const age = this.data.age;
            const height = this.data.height;
            const weight = this.data.weight;
            const heartRate = this.data.heartRate;
            const gripStrength = this.data.gripStrength;
            const gender = this.data.gender;

            // 校验data数据是否合法
            if (!isValidNumber(weight)) {
                wx.showToast({
                  title: '请输入正确的体重',
                  icon: 'none'
                });
                return;
              }
              if (!isValidNumber(age)) {
                wx.showToast({
                  title: '请输入正确的年龄',
                  icon: 'none'
                });
                return;
              }
              if (!isValidNumber(gripStrength)) {
                wx.showToast({
                  title: '请输入正确的握力',
                  icon: 'none'
                });
                return;
              }
              if (!isValidNumber(heartRate)) {
                wx.showToast({
                  title: '请输入正确的心率',
                  icon: 'none'
                });
                return;
              }
              if (!isValidNumber(height)) {
                wx.showToast({
                  title: '请输入正确的身高',
                  icon: 'none'
                });
                return;
              }

            // 计算不同公式的结果并更新页面数据
            const formulas = this.data.formulas.map(item => {
                let result = 0;
                switch (item.name) {
                  case '1BJH-ZHW1公式':
                    result = this.calculate1BJHZHW1(weight, age, gripStrength, heartRate);
                    break;
                  case 'Alemán公式':
                    result = this.calculateAleman(weight, gender);
                    break;
                  case 'Lührmann1公式':
                    result = this.calculateLuhrmann1(weight, age, gender);
                    break;
                  case 'Harris-Benedict（HB公式）':
                    result = this.calculateHarrisBenedict(weight, age, height,gender);
                    break;
                  case 'FAO-WHO-UNU（WHO公式）':
                    result = this.calculateFAOWHOUNU(weight, height, gender);
                    break;
                  case 'ESPEN公式':
                    result = this.calculateESPEN(weight);
                    break;
                  case 'CSPEN公式':
                    result = this.calculateCSPEN(weight,height);
                    break;
                }
              return { name: item.name, result: result };
            });
            // 更新页面数据
            this.setData({
              formulas: formulas
            });
          },
   // 计算1BJH-ZHW1公式
   calculate1BJHZHW1: function(weight: number, age: number, gripStrength: number, heartRate: number) {
    let res = 794.847 + 8.661 * weight - 7.976 * age + 14.757 * gripStrength + 5.037 * heartRate;
    return parseFloat(res.toFixed(0));
  },
  // 计算Alemán 公式
  calculateAleman: function(weight: number, gender: string) {
    let res = 0;
    if (gender === 'male') {
        res = (1644.7 + 57.14 * weight + 449) * 0.2389;
    } else {
       res =  (1644.7 + 57.14 * weight) * 0.2389;
    }
    return parseFloat(res.toFixed(0));
  },
  // 计算Lührmann1 公式
  calculateLuhrmann1: function(weight: number, age: number, gender: string) {
    let res = 0;
    if (gender === 'male') {
      res =  (3169 + 50.0 * weight - 15.3 * age + 746) * 0.2389;
    } else {
      res =  (3169 + 50.0 * weight - 15.3 * age) * 0.2389;
    }
    return parseFloat(res.toFixed(0));
  },
  // 计算Harris-Benedict（HB公式）
  calculateHarrisBenedict: function(weight: number, age: number, height: number, gender: string) {
    let res = 0;
    if (gender === 'male') {
      res =  66.4730 + 13.7516 * weight + 5.0033 * height - 6.7550 * age;
    } else {
      res =  665.0995 + 9.5634 * weight + 1.8496 * height - 4.6756 * age;
    }
    return parseFloat(res.toFixed(0));
  },
  // 计算FAO-WHO-UNU（WHO公式）
  calculateFAOWHOUNU: function(weight: number, height: number, gender: string) {
    let res = 0;
    if (gender === 'male') {
      res =  (36.8 * weight + 47.195 * height - 4481) / 4.186;
    } else {
      res = (38.5 * weight + 26.652 * height - 1264) / 4.186;
    }
    return parseFloat(res.toFixed(0));
  },
  // 计算ESPEN公式
  calculateESPEN: function(weight: number) {
    
    return weight * 20;
  },
  // 计算CSPEN公式
  calculateCSPEN: function(weight: number,height: number) {

    let bmi = 10000 * weight / (height * height);
    let res = 0;
    if (bmi < 21) {
        res = weight * 21.4
    } else {
        res = weight * 18.4
    }
    return parseFloat(res.toFixed(0));
  },
  reset: function() {
    this.setData({
      weight: 0,
      age: 0,
      kg: 0,
      bmp: 0,
      gender: 'male',
      showResults: false,
      formulas: formulas
    });
  }
    }
    
});
