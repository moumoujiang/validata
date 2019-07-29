import vd from './vdFunc';
import toast from './toast';

const customize = function(name, text, callback) {
  if (name && text && typeof name === 'string' && typeof text === 'string') {
    // 将规则名拆分为  函数名、参数
    const reg = /\w+/g;
    const args = name.match(reg);
    const rule = args.shift();
    if (callback) {
      vd[rule] = callback;
    }
    toast[rule] = text;
  } else {
    throw new Error('Please pass in the correct parameters!');
  }
};

export default customize;
