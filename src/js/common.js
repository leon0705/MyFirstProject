/**
 * [排序函数]
 * @param {Number} a [任意一个数]
 * @param {Number} b [任意一个数]
 * @return {Number}  [返回比较后的数]
 */
function sortNumber(a, b) {
	return a - b
}

/**
 * [点击返回顶部]
 * @param {String} a [返回顶部按钮]
 * @param {Number} b [返回速度，数值越大速度越慢]
 * @param {Number} c [定时器执行一次代码的时间]
 */
function BackTop(a, b, c) {
	window.onscroll = function() {
		var st = window.scrollY;
		if(st > 2000) {
			a.style.display = 'block';
		} else {
			a.style.display = 'none';
		}
	}
	var timer;
	a.onclick = function() {
		timer = setInterval(function() {
			var st = window.scrollY;
			//设置速度，当滚动条越靠近底部，滚动速度越快，反之越慢
			var speed = st / b;
			var move = st - speed;
			//设置浏览器滚动距离
			var tp = scrollTo(0, move);
			console.log(move)
			if(move < 1) {
				//当最后距离小于1时，直接设置tp的值并且清楚定时器
				tp === 0;
				clearInterval(timer);
			}
		}, c)
	}
}

/*
 * [居中弹窗]
 * @param {String} a [弹窗的变量名]
 */
function popup(a) {
	var left = window.innerWidth / 2 - a.offsetWidth / 2;
	var top = window.innerHeight / 2 - a.offsetHeight / 2;
	a.style.left = left + 'px';
	a.style.top = top + 'px';
}

/*
 * [动态生成表格]
 * @param {Number} a [行数]
 * @param {Number} b [列数]
 * @param {String} c [放置表格的容器]
 */
function CreateTable(a, b, c, d) {
	var _row = a;
	var _col = b;
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	for(var i = 0; i < _row; i++) {
		var tr = document.createElement("tr");
		// 隔行换色(可选)
		//					if((i + 1) % 2 !== 0) {
		//						tr.className = 'd';
		//					}
		for(var j = 0; j < _col; j++) {
			var td = document.createElement("td");
			tr.appendChild(td)
		}
		tbody.appendChild(tr);
		table.appendChild(tbody);
	}
	c.appendChild(table)
}

/*
 * [tab标签切换] 有点小bug 标签切换时会有抖动
 * @param {String} tabItem [标签类数组名]
 * @param {string} tabContent [切换的内容数组名]
 * @param {Number} len [标签类数组名的长度]
 * @param {Number} time [延迟时间]
 * @param {String} active [给标签添加的鼠标移入时的样式]
 */
function tabSwitch(tabItem, tabContent, len, time) {
	var idx = 0;
	//初始化
	//遍历将第一个tab默认高亮
	for(var i = 0; i < len; i++) {
		if(i === idx) {
			tabItem[i].className = 'active';
		} else {
			//隐藏第一张以外的图片
			tabContent[i].style.display = 'none';
		}
		// this
		// 遍历
		// 先删除所有高亮，然后给当前添加高亮
		// 先隐藏所有图片，然后显示当前图片
		// 找出当前所在的索引值
		tabItem[i].onmouseover = function() {
			for(var i = 0; i < len; i++) {
				tabItem[i].className = '';
				tabContent[i].style.display = 'none';
				if(this === tabItem[i]) {
					idx = i;
					console.log(idx)
				}
			}
			//设置延时器，延迟time毫秒后出现效果
			setTimeout(function() {
				//当前高亮
				tabItem[idx].className = 'active';
				//显示切换当前图片
				tabContent[idx].style.display = 'block'
			}, time)
		}
	}
}

/*
 * [阻止浏览器默认行为兼容写法]
 * 		*直接调用
 */
//事件兼容写法
function getEvent(event) {
	return event || window.event;
}

function preventDefault(event) {
	var event = getEvent(event);
	if(event.preventDefault) {
		event.preventDefault(); //标准
	} else {
		event.returnValue = false; //IE
	}
}

/**
 * [绑定事件函数，兼容IE8-]
 * 解决addEventListener和 attachEvent 兼容
 * @param  {Node} ele     [绑定事件的节点]
 * @param  {String} type    [事件类型]
 * @param  {Function} handler [事件处理函数]
 * @param  {Boolean} capture [是否捕获]
 */
function bind(ele, type, handler, capture) {
	// 标准浏览器
	if(ele.addEventListener) {
		ele.addEventListener(type, handler, capture);
	}

	// IE8-
	else if(ele.attachEvent) {
		ele.attachEvent('on' + type, handler);
	}

	// 其他浏览器
	else {
		ele['on' + 'click'] = handler;
	}
}

/**
 * [含标题窗口拖拽]
 * @param {String} popover  [需要拖拽效果的窗口]
 * @param {String} title	[标题]
 */
function DragT(popover, title) {
	// 给弹窗绑定mousedown事件
	title.onmousedown = function(evt) {
		// 保存按下时光标距离header的距离
		var ox = evt.offsetX;
		var oy = evt.offsetY;

		// 在mousedown事件中给document绑定mousemove事件
		document.onmousemove = function(e) {
			popover.style.left = e.clientX - ox + 'px';
			popover.style.top = e.clientY - oy + 'px';

			e.preventDefault();
		}

		evt.stopPropagation();
	}

	// 鼠标弹起后清除document的mousemove事件
	title.onmouseup = function() {
		document.onmousemove = null;
	}
}

/**
 * [无标题窗口拖拽]
 * @param {String} popover  [需要拖拽效果的窗口]
 */
function Drag(popover) {
	// 给弹窗绑定mousedown事件
	popover.onmousedown = function(evt) {
		// 保存按下时光标距离header的距离
		var ox = evt.offsetX;
		var oy = evt.offsetY;

		// 在mousedown事件中给document绑定mousemove事件
		document.onmousemove = function(e) {
			popover.style.left = e.clientX - ox + 'px';
			popover.style.top = e.clientY - oy + 'px';

			e.preventDefault();
		}

		evt.stopPropagation();
	}

	// 鼠标弹起后清除document的mousemove事件
	popover.onmouseup = function() {
		document.onmousemove = null;
	}
}

/**[拖拽改变窗口大小]
 * @param {Node} ele [需要赋予函数的窗口名]
 */
function DragChange(ele) {
	var xDirection;
	var yDirection;

	document.onmousemove = moveHandle;

	ele.onmousedown = function(ev) {
		// 获取event对象，兼容性写法
		var ev = ev || event;
		// 鼠标按下时的位置
		var mouseDownX = ev.clientX;
		var mouseDownY = ev.clientY;
		// 方块上下左右四个边的位置和方块的长宽
		var T0 = this.offsetTop;
		var B0 = this.offsetTop + this.offsetHeight;
		var L0 = this.offsetLeft;
		var R0 = this.offsetLeft + this.offsetWidth;
		var W = this.offsetWidth;
		var H = this.offsetHeight;
		// 设置方块的识别范围
		var areaT = T0 + 10;
		var areaB = B0 - 10;
		var areaL = L0 + 10;
		var areaR = R0 - 10;
		// 判断改变方块的大小的方向
		// 左
		var changeL = mouseDownX < areaL;
		// 右
		var changeR = mouseDownX > areaR;
		// 上
		var changeT = mouseDownY < areaT;
		// 下
		var changeB = mouseDownY > areaB;
		// IE8 取消默认行为-设置全局捕获
		if(ele.setCapture) {
			ele.setCapture();
		}
		document.onmousemove = function(ev) {

			var ev = ev || event;
			// 鼠标移动时的鼠标位置
			var mouseMoveX = ev.clientX;
			var mouseMoveY = ev.clientY;
			//根据改变方块大小的方向不同进行大小的改变
			// 左
			if(changeL) {
				ele.style.width = (mouseDownX - mouseMoveX) + W + 'px';
				ele.style.left = L0 - (mouseDownX - mouseMoveX) + 'px';
			}
			// 右
			if(changeR) {
				ele.style.width = (mouseMoveX - mouseDownX) + W + 'px';
			}
			// 上
			if(changeT) {
				ele.style.height = (mouseDownY - mouseMoveY) + H + 'px';
				ele.style.top = T0 - (mouseDownY - mouseMoveY) + 'px';
			}
			// 下
			if(changeB) {
				ele.style.height = (mouseMoveY - mouseDownY) + H + 'px';
			}
			// 限定范围
			if(parseInt(ele.style.width) < 50) {
				ele.style.width = 50 + 'px';
			}
			if(parseInt(ele.style.height) < 50) {
				ele.style.height = 50 + 'px';
			}
		}
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmousemove = moveHandle;

			//					 释放全局捕获
			if(ele.releaseCapture) {
				ele.releaseCapture();
			}
		}
		return false;
	}

	// 鼠标移动事件处理函数
	function moveHandle(e) {
		e = e || window.event;

		var x = e.clientX;
		var y = e.clientY;

		// 重置光标形状
		document.body.style.cursor = 'default';

		// 水平判定
		if(x >= ele.offsetLeft - 5 && x <= ele.offsetLeft + 5 && y >= ele.offsetTop && y <= ele.offsetTop + ele.offsetHeight) {
			// 把body元素的光标形状改成
			document.body.style.cursor = 'w-resize';

			// 方向
			xDirection = 'left';
		} else if(x >= ele.offsetLeft + ele.offsetWidth - 5 && x <= ele.offsetLeft + ele.offsetWidth + 5 && y >= ele.offsetTop && y <= ele.offsetTop + ele.offsetHeight) {
			// 把body元素的光标形状改成
			document.body.style.cursor = 'w-resize';

			// 方向
			xDirection = 'right';
		}

		// 垂直
		if(y >= ele.offsetTop - 5 && y <= ele.offsetTop + 5 && x >= ele.offsetLeft && x <= ele.offsetLeft + ele.offsetWidth) {
			// 把body元素的光标形状改成
			document.body.style.cursor = 'n-resize';

			// 方向
			yDirection = 'top';
		} else if(y >= ele.offsetTop + ele.offsetHeight - 5 && y <= ele.offsetTop + ele.offsetHeight + 5 && x >= ele.offsetLeft && x <= ele.offsetLeft + ele.offsetWidth) {
			// 把body元素的光标形状改成
			document.body.style.cursor = 'n-resize';

			// 方向
			yDirection = 'bottom';
		}
	}
}

//cookie操作
//增，删，查，改
var Cookie = {
	/**
	 * [添加/修改cookie]
	 * @param {String} name    [cookie名]
	 * @param {String} val     [cookie值]
	 * @param {[Date]} expires [cookie有效期]
	 * @param {[String]} path    [cookie保存路径]
	 */
	set: function(name, val, expires, path) {
		var str = name + '=' + val;

		// 有效期
		if(expires) {
			str += ';expires=' + expires.toUTCString();
		}

		// 保存路径
		if(path) {
			str += ';path=' + path;
		}

		// 写入cookie
		document.cookie = str;
	},

	/**
	 * [删除cookie]
	 * @param  {String} name [要删除的cookie名]
	 * @param  {[String]} path [指定路径]
	 */
	remove: function(name, path) {
		var now = new Date();
		now.setDate(now.getDate() - 7);

		// document.cookie = name + '=null;expires=' + now.toUTCString();
		// 利用添加方法达到删除效果
		this.set(name, 'null', now, path);
	},

	/**
	 * [获取cookie]
	 * @param  {String} name [cookie]
	 * @return {String}      [description]
	 */
	get: function(name) {
		var res = '';

		// 获取能访问的所有cookie
		var cookies = document.cookie;

		// 判断是否存在cookie
		if(!cookies.length) {
			return res;
		}

		// cookie字符串拆成数组
		cookies = cookies.split('; ');

		// 遍历数组，找出name对应cookie值
		for(var i = 0; i < cookies.length; i++) {
			// 拆分cookie名和cookie值
			var arr = cookies[i].split('=');
			if(arr[0] === name) {
				res = arr[1];
				break;
			}
		}

		return res;
	}
}

/**
 * [低配版表单验证正则表达式]
 * 用户名、昵称、密码、手机号、身份证号、生日、邮箱
 */
var RegExp = {

	/**
	 * 用户名验证
	 * @param {String} username [接收username信息的变量]
	 * @param {Number} mix		[用户名最小长度]
	 * @param {Number} max		[用户名最大长度]
	 */
	username: function(username, mix, max) {
		if(!/^[a-z][\w\-]{3,20}$/.test(username)) {
			return false;
		}
	},

	/**
	 * 密码验证
	 * @param {String} psw [接收密码的变量]
	 * @param {Number} mix [密码最小长度]
	 * @param {Number} max [密码最大长度]
	 */
	password: function(psw) {
		if(!/^[a-z0-9_-]{6,19}$/) {
			return false;
		}
	},

	/**
	 * 昵称验证
	 * @param {String} nickname [接收昵称的变量]
	 */
	//只能有中文
	//	nickname: function(nickname) {
	//		if(!/^[\u2E80-\u9FFF]+$/.test(nickname)) {
	//			return false;
	//		}
	//	},

	//	中英文
	nickname: function(nickname) {
		if(!/^[\u2E80-\u9FFFa-zA-Z]+$/.test(nickname)) {
			return false;
		}
	},

	/**
	 * 邮箱验证
	 * @param {String} email [接收邮箱的变量]
	 */
	email: function(email) {
		if(!/^[a-z0-9][\w\-\.]{2,}@[a-z0-9\-]+(\.[a-z]{2,})+$/.test(email)) {
			return false;
		}
	},

	/**
	 * 身份证验证
	 * @param {String/Number} identity [身份证可能是纯数字，也可能有字母拼接的字符串]
	 */
	identity: function(identity) {
		if(!/^(\d{17}|\d{14})[\dx]$/.test(identity)) {
			return false;
		}
	},

	/**
	 * 电话号码验证
	 * @param {Number} phone [接收电话号码的变量]
	 */
	phone: function(phone) {
		if(!/^1[34578]\d{9}$/.test(phone)) {
			return false;
		}
	},

	/**
	 * 生日信息验证
	 * @param {Number/String} birthday [可能为纯数字也可能为字符串]
	 */
	birthday: function(birthday) {
		if(!/^\d{4}([\/\-]?)\d{1,2}\1\d{1,2}$/.test(birthday)) {
			return false;
		}
	},

	/**
	 * 检测html标签
	 * @param {String} str [接收的变量名]
	 */
	html: function(str) {
		if(!/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/.test(str)) {
			return false;
		}
		if(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/.test(str)) {
			return true;
		}
	}
}

/**
 * [trim方法兼容版]
 */
function MyTrim(str) {

	if(str.trim) {
		return str.trim();
	}

	return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * 圆周运动（待完善）
 * @param {Number} ang [一次旋转的角度]
 * @param {Number} r [围绕物体的边界到其中心的距离]
 * @param {Object} center [所围绕物体的中心坐标] 
 * @param {Element} ele	[运动的物体名]
 */
function CirclingMotion(ang, r, center, ele) {
	// 圆周运动
	// 角度:就是速度
	let deg = 0;
	let timer = setInterval(() => {
		// 每次增加ang°进行运动
		deg += ang;

		// 角度转换成弧度
		let rad = deg * Math.PI / 180;

		let a = r * Math.cos(rad);
		let b = r * Math.sin(rad);

		// 小圆的圆心位置
		let minCenter = {
			x: center.x + a,
			y: center.y + b
		};

		let left = minCenter.x - ele.offsetWidth / 2
		let top = minCenter.y - ele.offsetHeight / 2

		ele.style.left = left + 'px';
		ele.style.top = top + 'px';
	}, 20);
}

/**
 * [工具包]
 * 
 */

var Tools = {

	/*
	 * [复制数组]
	 * @param {arr} arr [需要复制的数组]
	 */
	FArr: function(arr) {
		let res = [];
		for(let i = 0; i < arr.length; i++) {
			res.push(arr[i])
		}
		return res;
	},

	CArr: function(arr) {
		let res = [];
		return res.concat(arr);
	},

	/*
	 * [复制对象]
	 * @param {obj} obj [需要复制的对象]
	 */
	JObj: function(obj) {
		let res = JSON.parse(JSON.stringify(obj));
		return res;
	},

	/**
	 * [判断数据类型]
	 * @param  {anytype} data [数据]
	 * @return {String}      [返回数据类型对应的字符串]
	 */
	TypeOf: function(data) {
		return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
	},

	/**
	 * [获取一个范围内的随机整数]
	 * @param  {Number} min [最小值]
	 * @param  {Number} max [最大值]
	 * @return {Number}     [返回一个随机整数]
	 */
	RandomNumber: function(min, max) {
		return parseInt(Math.random() * (max - min + 1)) + min;
	},

	/**
	 * [随机颜色]
	 * @return {String} [返回rgb格式颜色]
	 */
	RandomColor: function() {
		// 得到rgb随机颜色
		var r = parseInt(Math.random() * 256);
		var g = parseInt(Math.random() * 256);
		var b = parseInt(Math.random() * 256);

		return 'rgb(' + r + ',' + g + ',' + b + ')';
	},

	/**
	 * [获取元素css样式，兼容ie8-]
	 * @param  {Element} ele  [获取样式的元素]
	 * @param  {String} attr [css属性名]
	 * @return {String}      [css属性值]
	 */
	getCss: function(ele, attr) {
		// 判断浏览器是否支持getComputedStyle
		if(window.getComputedStyle) {
			return getComputedStyle(ele)[attr];
		}

		// ie8-
		else if(ele.currentStyle) {
			return ele.currentStyle[attr];
		}

		// 返回内联样式
		else {
			return ele.style[attr];
		}

	},

	/**
	 * [动画函数]
	 * @param  {Element} ele    [动画元素]
	 * @param  {String} attr   [css属性]
	 * @param  {Number} target [目标值]
	 */
	/*
	 * 支持多属性同时运动
	 * 支持回调函数
	 */
	Animate: function(ele, opt, callback) {
		var timerQty = 0;
		for(var attr in opt) {
			// 记录动画数量
			timerQty++;

			createTimer(attr);
		}

		function createTimer(attr) {
			// 以属性名创建定时器名字
			var timerName = attr + 'timer';

			// 清除之前的定时器,放置多个定时器作用于同一个元素
			clearInterval(ele[timerName]);

			// 目标值
			var target = opt[attr];

			// 创建定时器
			ele[timerName] = setInterval(function() {
				// 获取当前值
				var current = getComputedStyle(ele)[attr];

				// 提取单位
				var unit = current.match(/\d([a-z]*)$/);
				unit = unit ? unit[1] : '';

				// 提取数字
				current = parseFloat(current);

				// 计算缓冲速度
				var speed = (target - current) / 10;

				//判断属性是否为opacity
				if(attr === 'opacity') {
					speed = speed > 0 ? 0.05 : -0.05;
				} else {
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				}

				// 到达目标值/清除定时器
				if(current === target) {
					clearInterval(ele[timerName]);
					current = target - speed;

					// 数量减1
					timerQty--;

					// 执行回调函数
					// 最后一个动画执行完成后才执行回调函数
					if(typeof callback === 'function' && timerQty === 0) {
						callback();
					}
				}

				ele.style[attr] = current + speed + unit;

			}, 30);
		}

	}

	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18

//	Date.prototype.Format = function(fmt) {
//		var o = {
//			"M+": this.getMonth() + 1, //月份 
//			"d+": this.getDate(), //日 
//			"h+": this.getHours(), //小时 
//			"m+": this.getMinutes(), //分 
//			"s+": this.getSeconds(), //秒 
//			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
//			"S": this.getMilliseconds() //毫秒 
//		};
//		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//		for(var k in o)
//			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//		return fmt;
//	}

}

/**
 * [判断滚动条是否滚动到底部]
 */

//滚动条在Y轴上的滚动距离
//var AboutScroll = {
//
//	function getScrollTop() {　　
//		var scrollTop = 0,
//			bodyScrollTop = 0,
//			documentScrollTop = 0;　　
//		if(document.body) {　　　　
//			bodyScrollTop = document.body.scrollTop;　　
//		}　　
//		if(document.documentElement) {　　　　
//			documentScrollTop = document.documentElement.scrollTop;　　
//		}　　
//		scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
//		return scrollTop;
//	}
//	//文档的总高度
//	function getScrollHeight() {　　
//		var scrollHeight = 0,
//			bodyScrollHeight = 0,
//			documentScrollHeight = 0;　　
//		if(document.body) {　　　　
//			bodyScrollHeight = document.body.scrollHeight;　　
//		}　　
//		if(document.documentElement) {　　　　
//			documentScrollHeight = document.documentElement.scrollHeight;　　
//		}　　
//		scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
//		return scrollHeight;
//	}
//	//浏览器视口的高度
//	function getWindowHeight() {　　
//		var windowHeight = 0;　　
//		if(document.compatMode == "CSS1Compat") {　　　　
//			windowHeight = document.documentElement.clientHeight;　　
//		} else {　　　　
//			windowHeight = document.body.clientHeight;　　
//		}　　
//		return windowHeight;
//	}
//	//如果到底部,则弹窗
//	window.onscroll = function() {　　
//		if(getScrollTop() + getWindowHeight() == getScrollHeight()) {　　　　
//			alert("you are in the bottom!");　　
//		}
//	};
//}

/**
 * 怪异模式与非怪异模式下,获取页面元素属性时的区别
 */

//function BoxHacks() {
//
//	if(document.compatMode == "BackCompat") {
//		cWidth = document.body.clientWidth;
//		cHeight = document.body.clientHeight;
//		sWidth = document.body.scrollWidth;
//		sHeight = document.body.scrollHeight;
//		sLeft = document.body.scrollLeft;
//		sTop = document.body.scrollTop;
//	} else { //document.compatMode == "CSS1Compat" 
//		cWidth = document.documentElement.clientWidth;
//		cHeight = document.documentElement.clientHeight;
//		sWidth = document.documentElement.scrollWidth;
//		sHeight = document.documentElement.scrollHeight;
//		sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
//		sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
//	}
//}