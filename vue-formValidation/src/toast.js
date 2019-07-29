// 验证规则对应的提示
const toast = {
  required: '不为空',
  number: '请填入数字',
  znumber: '请输入正数',
  fnumber: '请输入负数',
  notznumber: '请输入非正数',
  notfnumber: '请输入非负数',
  integer: '请输入整数',
  pInteger: '请输入正整数',
  nInteger: '请输入负整数',
  notpInteger: '请输入非正整数',
  notnInteger: '请输入非负整数',

  chinese: '请输入中文',
  email: '请输入邮箱地址',
  url: '请输入链接地址',
  postCode: '请输入邮编地址',
  idCard: '请输入身份证号',

  numberInterval: '两个数之间'
}

export default toast;