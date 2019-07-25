// 检验规则函数
const vd = {} // 验证规则对象

// 非空
vd.required = function(val) {
  return val.trim() != ''
}

// 数字
vd.number = function(val) {
  return /^[-]?[1-9]*\d$/.test(val)
}

export default vd;