### 安装
  `
    npm install mmj-vue-vd
  `

---

### 使用

1. 在vue脚手架的main.js里引入

    `  
      import vd from 'mmj-vue-vd
    `

    `
      Vue.use(vd) 
    `
2. 在vue文件中使用
   + submitOk: [] ->同组input绑定同意数组
   + 写入指令
      `<input type="text" v-vd="{rule:['numberInterval(1, 100)', 'required'],bind:'submitOk'}"  v-model="msg">`
   + 进行校验  var result = this.submitOk.$check()  返回值true/false  成功/失败
   + 清除提示信息 el.clear()  el指当前元素，可用ref获取

### 校验规则

  required: '不为空',</br>
  number: '请填入数字',</br>
  znumber: '请输入正数',</br>
  fnumber: '请输入负数',</br>
  notznumber: '请输入非正数',</br>
  notfnumber: '请输入非负数',</br>
  integer: '请输入整数',</br>
  pInteger: '请输入正整数',</br>
  nInteger: '请输入负整数',</br>
  notpInteger: '请输入非正整数',</br>
  notnInteger: '请输入非负整数',</br>

  chinese: '请输入中文',</br>
  email: '请输入邮箱地址',</br>
  url: '请输入链接地址',</br>
  postCode: '请输入邮编地址',</br>
  idCard: '请输入身份证号',</br>

  numberInterval: '两个数之间'</br>
  
---
