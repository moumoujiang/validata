// 检验规则函数
const vd = {} // 验证规则对象

// 非空
vd.required = function(val) {
  return val.trim() != ''
}

// 数字
vd.number = function(val) {
  return /^[-]?(0|[1-9][0-9]*)(\.\d+)?$/.test(val)
}
// 正数
vd.znumber = function(val) {
  return /^(0|[1-9][0-9]*)(\.\d+)?$/.test(val) && val>0
}
// 负数
vd.fnumber = function(val) {
  return /^-(0|[1-9][0-9]*)(\.\d+)?$/.test(val) && val<0
}
// 非正数
vd.notznumber = function(val) {
  return /^(-(0|[1-9][0-9]*)(\.\d+))|0?$/.test(val) && val<=0
}
// 非负数
vd.notfnumber = function(val) {
  return  /^((0|[1-9][0-9]*)(\.\d+))|0?$/.test(val) && val>=0
}
// 整数
vd.integer = function(val) {
  return /^[-]?[1-9]*\d$/.test(val)
}
// 正整数
vd.pInteger = function(val) {
  return /^[1-9]\d*$/.test(val)
}
// 负整数
vd.nInteger = function(val) {
  return /^-[1-9]\d*$/.test(val)
}
// 非正整数
vd.notpInteger = function(val) {
  return /^-[1-9]\d*|0$/.test(val)
}
// 非负整数
vd.notnInteger = function(val) {
  return /^[1-9]\d*|0$/.test(val)
}

// 中文
vd.chinese = function(val) {
  return /[\u4e00-\u9fa5]/.test(val)
}

// 邮箱
vd.email = function(val) {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(val)
}

// 网址
vd.url = function(val) {
  return /[a-zA-z]+:\/\/[^\s]*/.test(val)
}

// 邮政编码
vd.postCode = function(val) {
  return /[1-9]\d{5}(?!\d)/.test(val)
}

// 身份证号
vd.idCard = function(val) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
}

//数字区间 
vd.numberInterval = function(val, interval) {
  return val-interval[0]>=0 && val-interval[1]<=0
}



export default vd;