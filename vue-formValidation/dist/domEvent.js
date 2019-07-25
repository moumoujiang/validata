import toast from './toast.js'
import vd from './vdFunc.js'
// 事件

// 聚焦事件
const onBlur = function(e) {
  var el = this
  if(el.rule.includes('required')) {
    var flag = true
    for(var i=0,len=el.rule.length;i<len&&flag;i++) {
      flag = vd[el.rule[i]](el.value)
      if(!flag) showError(el, toast[el.rule[i]])
    }
  }else {
    if(el.nothing == 'nothing' && el.value == '') {

    }else {
      var flag = true
      for(var i=0,len=el.rule.length;i<len&&flag;i++) {
        flag = vd[el.rule[i]](el.value)
        if(!flag) showError(el, toast[el.rule[i]])
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
  }
}

// 验证不通过的提示信息
const showError = function(el, msg) {
  console.log(el)
  var parentNode = el.parentEl;
  
  console.log(parentNode)
  if(parentNode.lastChild.classList.contains('error_msg')) {
    return;
  }
  var span = document.createElement('span')
  span.innerHTML = msg
  span.style.color = '#ff0000'
  span.style.marginLeft = '3px'
  span.style.fontSize = '12px'
  span.classList.add('error_msg')
  parentNode.append(span)
  el.style.border = '1px solid #ff0000'
}

export default {
  onBlur,
  onFocus,
  clear,
  showError
};