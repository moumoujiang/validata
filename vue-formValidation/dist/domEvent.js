import toast from './toast.js'
import vd from './vdFunc.js'
// 事件

// 聚焦事件
const onBlur = function(e) {
  var el = this
  
  if(el.rule.includes('required')) {
    var flag = true
    for(var i=0,len=el.rule.length;i<len&&flag;i++) {
      let reg = /\w+/g;
      let rule = el.rule[i].match(reg)
      let ruleName = rule.shift() // 规则函数名   rule -> 参数
      if(rule.length>0) {
        flag = vd[ruleName](el.value, rule)
        if(!flag) showError(el, ruleName, rule)
      }else {
        flag = vd[ruleName](el.value)
        if(!flag) showError(el, ruleName)
      }
    }
  }else {
    if(el.nothing == 'nothing' && el.value == '') {
    }else {
      var flag = true
      for(var i=0,len=el.rule.length;i<len&&flag;i++) {
        let reg = /\w+/g;
        let rule = el.rule[i].match(reg)
        let ruleName = rule.shift() // 规则函数名   rule -> 参数
        if(rule.length>0) {
          flag = vd[ruleName](el.value, rule)
          if(!flag) showError(el, ruleName, rule)
        }else {
          flag = vd[ruleName](el.value)
          if(!flag) showError(el, ruleName)
        }
      }
    }
  }
}

// 失焦事件
const onFocus = function(e) {
  var el = this
  el.clear()
}

// 清除验证不通过的提示信息
const clear = function() {
  var el = this
  var parentNode = el.parentEl;
  
  if(parentNode.lastChild.classList.contains('error_msg')) {
    parentNode.removeChild(parentNode.lastChild)
    el.style.border = ''
    el.classList.remove('error_input')
  }
}

// 验证不通过的提示信息
const showError = function(el, rule, argsArr=[]) {
  var parentNode = el.parentEl;
  var span = document.createElement('span')
  
  for(let i=0,len=argsArr.length;i<len;i++) {
    toast[rule] = toast[rule].replace(/\{\{\w+\}\}/, argsArr.shift())
  }
    
        
  span.innerHTML = toast[rule]

  span.style.color = '#ff0000'
  span.style.marginLeft = '3px'
  span.style.fontSize = '12px'
  span.classList.add('error_msg')
  parentNode.append(span)
  el.style.border = '1px solid #ff0000'
  el.classList.add('error_input')
}

export default {
  onBlur,
  onFocus,
  clear,
  showError
};