;
(function() {
	function Carousel(options) {
		// 默认属性
		var defaults = {
			width: 810,
			height: 480,
			imgs: [],

			ele: '#sildeImg',

			// 图片切换间隔时间
			duration: 3000,

			// 滚动类型
			type: 'horizontal', //horizontal,fade,vertical

			// 自动轮播
			autoPlay: true,

			// 默认索引值
			index: 0,

			// 是否显示前后按钮
			buttons: false,

			// 是否显示页码
			page: false,

			// 是否无缝滚动
			seamless: true,

			//页码样式
			pageCss: 'active'
		}

		// 覆盖默认参数
		var opt = Object.assign({}, defaults, options);

		this.init(opt);
	}

	// 方法
	Carousel.prototype = {
		//创建节点
		//绑定事件
		init(opt) {
			this.ele = document.querySelector(opt.ele);
			this.ele.classList.add('carousel');
			let change = 'true';
			this.change = change;

			this.opt = opt;
			this.index = opt.index;
			this.lastIdex = opt.index;

			let ul = document.createElement('ul');
			ul.innerHTML = opt.imgs.map(item => {
				return `<li><img src="${item}"></li>`
			}).join('');
			this.ele.appendChild(ul);

			// 是否自动轮播
			if(opt.autoPlay) {
				this.start();

				// 鼠标移入移除
				this.ele.onmouseenter = function() {
					this.stop();
				}.bind(this);
				this.ele.onmouseleave = function() {
					this.start();
				}.bind(this);
			}

			// 前后按钮
			if(opt.buttons) {
				// 添加前后按钮
				let btnNext = document.createElement('span');
				btnNext.className = 'next';
				btnNext.innerHTML = '&gt;';
				let btnPrev = document.createElement('span');
				btnPrev.className = 'prev';
				btnPrev.innerHTML = '&lt;';

				this.ele.appendChild(btnPrev);
				this.ele.appendChild(btnNext);

				btnNext.onclick = function() {
					this.next();
				}.bind(this);
				btnPrev.onclick = function() {
					this.prev();
				}.bind(this);
			}

			// 给this添加属性，以便传递参数
			this.len = opt.imgs.length;
			this.ul = ul;

			// 分页
			if(opt.page && this.opt.seamless === false) {
				let page = document.createElement('div');
				page.className = 'page';
				for(let i = 0; i < this.len; i++) {
					console.log(666)
					let span = document.createElement('span');
					span.innerText = i + 1;

					page.appendChild(span);
				}
				page.children[0].className = this.opt.pageCss;
				this.page = page;
				this.ele.appendChild(page);
			} else if(opt.page && this.opt.seamless === true) {
				let page = document.createElement('div');
				page.className = 'page';
				for(let i = 0; i < this.len - 1; i++) {
					console.log(666)
					let span = document.createElement('span');
					span.innerText = i + 1;

					page.appendChild(span);
				}
				page.children[0].className = this.opt.pageCss;

				this.page = page;
				console.log(this.page);
				this.ele.appendChild(page);

			}
			//页码点击事件
			if(opt.page) {
				this.page.addEventListener('click', function(e) {
					var target = e.target;
					if(target.tagName.toLowerCase() === 'span') {

						this.blank(target.innerText * 1);

					}
				}.bind(this))
			}
		},
		start() { //开始
			this.timer = setInterval(() => {
				this.index++;

				this.move();
			}, this.opt.duration);
		},
		move() {

			let target = {};

			//判断是否水平/垂直滚动
			if(this.opt.type === 'vertical') {
				//判断是否无缝
				if(this.index > this.len - 1) {

					//判断是否无缝
					if(this.opt.seamless === false) {
						this.index = 0;
					} else {
						this.ul.style.top = 0;
						this.index = 1;
					}

				} else if(this.index < 0) {
					//判断是否无缝
					if(this.opt.seamless === true) {
						this.index = this.len - 2;
						this.ul.style.top = -(this.index + 1) * this.opt.height + 'px';

					} else {

						this.index = this.len - 1;
					}
				}
				this.vCss();
				target.top = -this.index * this.opt.height;

			} else if(this.opt.type === 'horizontal') {

				if(this.index >= this.len) {
					//判断是否无缝
					if(this.opt.seamless === false) {
						this.index = 0;
					} else {
						this.ul.style.left = 0;
						this.index = 1;
					}

				} else if(this.index < 0) {
					//判断是否无缝
					if(this.opt.seamless === true) {
						this.index = this.len - 2;
						this.ul.style.left = -(this.index + 1) * this.opt.width + 'px';
					} else {
						this.index = this.len - 1;
					}
				}

				console.log(this.index)
				this.hCss();
				target.left = -this.index * this.opt.width;

			}
			Tools.Animate(this.ul, target);
		},
		stop() {
			clearInterval(this.timer);
		},
		next() { //前
			this.index++;
			this.move();
		},
		prev() { //后
			this.index--;
			this.move();
		},
		blank(innerText) { //点击页码跳转

			this.index = innerText - 1;
			this.move();
			console.log(innerText);
		},
		vCss() {
			//判断是否有页码
			if(this.opt.page) {
				if(this.opt.seamless === true) {
					//此处如果this.len后面减一，会导致最后一个页码无法删除
					for(let i = 0; i < this.len - 1; i++) {
						this.page.children[i].className = '';
					}

					if(this.index >= this.len - 1) {

						//当运动到最后一张图片时，给第一张页码样式
						this.page.children[0].className = this.opt.pageCss;

					} else {
						//此行代码放外边会导致报错，原因未知
						this.page.children[this.index].className = this.opt.pageCss;
					}
				} else if(this.opt.seamless === false) {
					for(let i = 0; i < this.len; i++) {
						this.page.children[i].className = '';
						console.log(i)
					}

					this.page.children[this.index].className = this.opt.pageCss;
				}
			}
		},
		hCss() {
			//判断是否有页码
			if(this.opt.page) {
				if(this.opt.seamless === true) {

					for(let i = 0; i < this.len - 1; i++) {
						this.page.children[i].className = '';
					}

					if(this.index >= this.len - 1) {

						//当运动到最后一张图片时，给第一张页码样式
						this.page.children[0].className = this.opt.pageCss;

					} else {
						//此行代码放外边会导致报错，原因未知
						this.page.children[this.index].className = this.opt.pageCss;
					}
				} else if(this.opt.seamless === false) {
					//清楚所有页码样式
					for(let i = 0; i < this.len; i++) {

						this.page.children[i].className = '';

					}
					this.page.children[this.index].className = this.opt.pageCss;
				}
			}
		}

	}
	Object.defineProperty(Carousel.prototype, 'constructor', {
		value: Carousel,
		//enumerable:false,//把constructor属性的可枚举性设置false(不可遍历)
	})

	var lbt = new Carousel({
		imgs: ["./css/img/Carl_1.jpg", "./css/img/Carl_2.jpg", "./css/img/Carl_3.jpg", "./css/img/Carl_4.jpg", "./css/img/Carl_5.jpg"]
	});
})();