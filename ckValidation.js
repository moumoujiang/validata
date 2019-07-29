/**
 * required:    非空
 * number:      数字
 *
 */
var vueValidate = {};

	
var vd = {};
// 验证规则对象
	
var toast = {
	required: '不为空',
	number: '请填入数字'
};
// 验证规则函数

// 非空
vd.required = function(val) {
	return val.trim() != '';
};

// 数字
vd.number = function(val) {
	return /^[-]?[1-9]*\d$/.test(val);
};

// 指令的生命周期
var lifeCycle = {
	// 指令绑定到元素时触发
	bind: function(el, binding, vnode) {
		console.log(vnode);
		console.log(binding);
		// 是否是必填项
		var nothing = binding.value.nothing || null;

		// 将值、规则、非必填项挂载带元素上
		el.value = vnode.data.domProps.value;
		el.rule = binding.value.rule;
		el.nothing = nothing;
		el.id = onlyId();

		// 将每个绑定的元素添加到vue中的数组中
		vnode.context[binding.value.bind].push({
			$el: el
		});
		if (!vnode.context[binding.value.bind].flag) {
			vnode.context[binding.value.bind].flag = true;
		}

		// 给vue数组对象绑定验证方法，验证检测 => 在vue中调用$check方法获取验证结果
		if (!vnode.context[binding.value.bind].$check) {
			vnode.context[binding.value.bind].$check = function() {
				var self = this;
				self.flag = true; // 确保每次调用都能遍历验证规则
				// 遍历vue数组对象中的每个元素的每个规则，遇到第一个不符合就停止
				for (let i = 0, len = self.length; i < len && self.flag; i++) {
					for (
						let j = 0, reluLen = self[i].$el.rule.length;
						j < reluLen && self.flag;
						j++
					) {
						// 如果的非必填项并且为空值
						if (self[i].$el.rule.includes('required')) {
							self.flag = vd[self[i].$el.rule[j]](self[i].$el.value);
							if (!self.flag)
								showError(self[i].$el, toast[self[i].$el.rule[j]]);
						} else {
							if (self[i].$el.nothing == 'nothing' && self[i].$el.value == '') {
								self.flag = true;
							} else {
								self.flag = vd[self[i].$el.rule[j]](self[i].$el.value);
								if (!self.flag)
									showError(self[i].$el, toast[self[i].$el.rule[j]]);
							}
						}
					}
				}
				return self.flag;
			};
		}

		// 失去焦点事件
		el.addEventListener('blur', onBlur, false);
		// 获得焦点事件
		el.addEventListener('focus', onFocus, false);
		// 清除验证
		el.clear = clear;
	},
	componentUpdated: function(el, binding, vnode, oldVnode) {
		// console.log(el)
	},
	// 元素解除指令时时触发
	unbind: function(el, binding, vnode) {
		// 删除vue数组中的解绑元素与元素上挂载的值、规则、非必填项
		vnode.context[binding.value.bind] = vnode.context[binding.value.bind].map(
			item => item.$el.id != el.id
		);
		el.value = null;
		el.rule = null;
		el.nothing = null;
		el.id = null;
		// 解除失去焦点事件
		el.removeEventListener('blur', onBlur, false);
		// 解除获得焦点事件
		el.removeEventListener('focus', onFocus, false);
		// 解除清除事件
		el.clear = null;
	}
};
function onBlur(e) {
	var el = this;
	if (el.rule.includes('required')) {
		var flag = true;
		for (var i = 0, len = el.rule.length; i < len && flag; i++) {
			flag = vd[el.rule[i]](el.value);
			if (!flag) showError(el, toast[el.rule[i]]);
		}
	} else {
		if (el.nothing == 'nothing' && el.value == '') {
		} else {
			var flag = true;
			for (var i = 0, len = el.rule.length; i < len && flag; i++) {
				flag = vd[el.rule[i]](el.value);
				if (!flag) showError(el, toast[el.rule[i]]);
			}
		}
	}
}

function onFocus(e) {
	var el = this;
	el.clear();
}

function clear() {
	var el = this;

		
	var parentNode;
	if (el.container) {
		parentNode = el.container;
	} else {
		parentNode = el.parentNode;
	}
	if (parentNode.lastChild.classList.contains('error_msg')) {
		parentNode.removeChild(parentNode.lastChild);
		el.classList.remove('error_input');
	}
}

// 验证不通过提示信息
function showError(el, msg) {
	var parentNode;
	if (el.container) {
		parentNode = el.container;
	} else {
		parentNode = el.parentNode;
	}
	var span = document.createElement('span');
	span.innerHTML = msg;
	span.style.color = '#ff0000';
	span.style.marginLeft = '3px';
	span.style.fontSize = '12px';
	span.classList.add('error_msg');
	parentNode.append(span);
	el.classList.add('error_input');
}

// 给每个元素加上一个唯一标识
function onlyId() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (Math.random() * 16) | 0;

			
		var v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

vueValidate.install = function(Vue, options) {
	Vue.directive('vd', lifeCycle);
};

export default vueValidate;
