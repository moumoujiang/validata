/**
 * required:    非空
 * number:      数字
 * 
 */

import until from './until.js'
import toast from './toast.js'
import vd from './vdFunc.js'
import domEvent from './domEvent.js'

const { onBlur, onFocus, clear, showError } = domEvent

const vueValidate = {} 

// 指令的生命周期
const lifeCycle = {
  // 指令绑定到元素时触发
  bind: function(el, binding, vnode) {
    // 是否是必填项
    var nothing = binding.value.nothing || null

    // 将值、规则、非必填项挂载带元素上
    el.value = vnode.data.domProps.value
    el.rule = binding.value.rule
    el.nothing = nothing
    el.onlyId = until.onlyId()
    

    console.log(el.onlyId)
    // 将每个绑定的元素添加到vue中的数组中
    vnode.context[binding.value.bind].push({
      $el: el
    })
    if(!vnode.context[binding.value.bind].flag) {
      vnode.context[binding.value.bind].flag = true
    }

    // 给vue数组对象绑定验证方法，验证检测 => 在vue中调用$check方法获取验证结果
    if(!vnode.context[binding.value.bind].$check) {
      vnode.context[binding.value.bind].$check = function() {
        var self = this;
        self.flag = true; // 确保每次调用都能遍历验证规则
        // 遍历vue数组对象中的每个元素的每个规则，遇到第一个不符合就停止
        for(let i=0,len=self.length;i<len&&self.flag;i++) {
          for(let j=0,reluLen=self[i].$el.rule.length;j<reluLen&&self.flag;j++) {
            // 如果的非必填项并且为空值
            if(self[i].$el.rule.includes('required')) {
              self.flag = vd[self[i].$el.rule[j]](self[i].$el.value)
              if(!self.flag) showError(self[i].$el, toast[self[i].$el.rule[j]])
            }else {
              if(self[i].$el.nothing == 'nothing' && self[i].$el.value == '') {
                self.flag = true
              }else {
                self.flag = vd[self[i].$el.rule[j]](self[i].$el.value)
                if(!self.flag) showError(self[i].$el, toast[self[i].$el.rule[j]])
              }
            }
          }
        }
        return self.flag;
      }
    }

    // 失去焦点事件
    el.addEventListener("blur", onBlur, false);
    // 获得焦点事件
    el.addEventListener("focus", onFocus, false);
    // 清除验证
    el.clear = clear;

  },
  inserted: function(el, binding, vnode) {
    // 解决v-ifparentNode为null的问题
    if (el.container) {
      el.parentEl = el.container;
    } else {
      el.parentEl = el.parentNode
    }
  },
  // 元素解除指令时时触发
  unbind: function(el, binding, vnode) {
    // debugger;
    console.log(el)
    console.log(el.onlyId)
    // 删除vue数组中的解绑元素与元素上挂载的值、规则、非必填项
    let index = vnode.context[binding.value.bind].findIndex(item => item.$el.onlyId == el.onlyId)
    vnode.context[binding.value.bind][index].$el.clear()
    
    delete vnode.context[binding.value.bind][index].$el.value
    delete vnode.context[binding.value.bind][index].$el.rule
    delete vnode.context[binding.value.bind][index].$el.nothing
    delete vnode.context[binding.value.bind][index].$el.onlyId
    delete vnode.context[binding.value.bind][index].$el.parentEl
    // 解除失去焦点事件
    el.removeEventListener("blur", onBlur, false);
    // 解除获得焦点事件
    el.removeEventListener("focus", onFocus, false);
    // 解除清除事件
    vnode.context[binding.value.bind][index].$el.clear = null
    vnode.context[binding.value.bind].splice(index, 1)
    console.log(vnode.context[binding.value.bind])
  }
}

vueValidate.install = function(Vue) {
  Vue.directive('vd', lifeCycle)
}

export default vueValidate;