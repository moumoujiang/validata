import vd from './vdFunc'
import toast from './toast'

const customize = function(name, text, callback) {
  if(name && text && typeof name == 'string' && typeof text == 'string') {
    // 将规则名拆分为  函数名、参数
    let reg = /\w+/g;
    let args = name.match(reg)
    let rule = args.shift()
    if(callback) {
      vd[rule] = callback
    }
    toast[rule] = text
  }else {
    throw new Error('Please pass in the correct parameters!')
  }
  
}

export default customize;