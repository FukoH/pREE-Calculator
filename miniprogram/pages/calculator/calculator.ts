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
  { name: 'CSPEN公式'}
]

Page({
  data: {
    form: {
      age: '',
      height: '',
      weight: '',
      heartRate:'',
      gripStrength:'',
      gender:''
    },
    showDialog: false,
    buttonContent: [{text: '确定'}],
    items: [
        {name: '男', value: 'male',checked:false},
        {name: '女', value: 'female',checked:false}
    ],
    // items: [
    //     { name: 'USA', value: '美国' },
    //     { name: 'CHN', value: '中国', checked: true},
    //     { name: 'BRA', value: '巴西' },
    //     { name: 'JPN', value: '日本' },
    //     { name: 'ENG', value: '英国' },
    //     { name: 'FRA', value: '法国' },
    //   ],
    errorMsg: '', 
    formulas: formulas,
    rules: [
        {
          name: 'age',
          rules: {required: true, errorMessage: '请输入正确的年龄',min:0}
        },
        {
          name: 'height',
          rules: [{required: true, errorMessage: '请输入正确的身高'}, {
            validator: (rule:any, value:any) => {
              if(!isValidNumber(value)) {
                return rule.message;
              }
            }, message: '身高格式不正确'
          }]
        },
        {
          name: 'weight',
          rules: [{required: true, errorMessage: '请输入正确的体重'}, {
            validator: (rule:any, value:any) => {
              if(!isValidNumber(value)) {
                return rule.message;
              }
            }, message: '体重格式不正确'
          }]
        },
        {
          name: 'heartRate',
          rules: [{required: true, errorMessage: '请输入正确的心率'}, {
            validator: (rule:any, value:any) => {
              if(!isValidNumber(value)) {
                return rule.message;
              }
            }, message: '心率格式不正确'
          }]
        },
        {
          name: 'gripStrength',
          rules: [{required: true, errorMessage: '请输入正确的握力'}, {
            validator: (rule:any, value:any) => {
              if(!isValidNumber(value)) {
                return rule.message;
              }
            }, message: '握力格式不正确'
          }]
        },
        {
            name: 'gender',
            rules: [{required: true, errorMessage: '请输入正确的性别'}, {
              validator: (rule:any, value:any) => {
                if(value!=='male' && value!=='female') {
                  return rule.message;
                }
              }, message: '性别格式不正确'
            }]
          }
      ],
  },

  radioChange: function (e:any) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    const items = this.data.items;
    for (let i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value == e.detail.value;
    }
    // console.log(radioItems);
    // console.log(e.detail.value);
    this.setData({
        items: items,
        [`form.gender`]: e.detail.value
    });
},

  

formInputChange(e:any) {
    const {field} = e.currentTarget.dataset
    this.setData({
      [`form.${field}`]: e.detail.value
    })
  },
closeDialog(e:any) {
    this.setData({
      showDialog: false
    })
  },

     
    
        calculate: function() {
            const age = parseFloat(this.data.form.age);
            const height = parseFloat(this.data.form.height);
            const weight = parseFloat(this.data.form.weight);
            const heartRate = parseFloat(this.data.form.heartRate);
            const gripStrength = parseFloat(this.data.form.gripStrength);
            // this.data.items.
            const gender = this.data.form.gender;

            console.log(age,
                height,weight,heartRate,gripStrength,gender)

            this.selectComponent('#form').validate((valid:Boolean, errors:any) => {
                if(valid) {
                    
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
              formulas: formulas,
              showDialog: true
            });
    
                } else {
                    const firstError = Object.keys(errors)
                    if(firstError.length) {
                        wx.showToast({
                            title: errors[firstError[0]].message,
                            icon: 'none'
                        })
                    }
                }
            })
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
    form:{
      weight: '',
      age: '',
      height: '',
      gripStrength: '',
      heartRate: '',
      gender: ''
    },
    formulas:formulas,
    items: [
        {name: '男', value: 'male',checked:false},
        {name: '女', value: 'female',checked:false}
    ]
},
    );
  }    
});
