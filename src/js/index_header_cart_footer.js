jQuery(function($) {

	//载入footer 和 header
	$('header').load('./html/common_header.html', function() {
		//		console.log(777)

		//顶部hover效果
		$('.rg').on('mouseenter', '.mygou', function() {
			//			console.log(666);
			$(this).addClass('on').find('.noneCon').stop().slideDown(500);
		}).on('mouseleave', '.mygou', function() {
			let self = $(this);
			$(this).find('.noneCon').stop().slideUp(500, function() {
				self.removeClass('on')
			});
		});

		//异步请求，从后端获取数据
		$.ajax({
			type: "get",
			url: "api/index_menuBox.php",
			async: true,
			dataType: 'json',
			success: function(res) {

				let $menubox = $('.menuBox');

				var $ul = $('#ul-cont');
				let $menuCon = $('#menuCon');

				res.forEach(function(item) {

					let $li = $('<li/>').html(`<i class="nav-icon ${item.bg} "></i>
										<h3>
											<a href="./html/goodslist.html">
												${item.h3}
											</a>
										</h3>
										<p>
											<a href="./html/goodslist.html">${item.type1}</a>
											<a href="./html/goodslist.html">${item.type2}</a>
											<a href="./html/goodslist.html">${item.type3}</a>
										</p>`);
					$ul.append($li);

					let $inndiv = $('<div class="nelBox"/>');
					let $indiv = $('<div class="sub-pannel" style="display: none; opacity: 0.5; left: 170px;"/>').append($inndiv);

					$menuCon.append($indiv);

					item.boxData.forEach(function(iitem) {
						let $p = $('<p/>');
						$inndiv.append($p);
						iitem.forEach(function(iiitem, idx) {
							if(idx === 0) {
								let $strong = $('<strong/>');
								$strong.html(`${iiitem}`);
								$p.append($strong);
							} else if(idx > 0) {
								let $a = $('<a/>').html(`${iiitem}`);
								$p.append($a)
							}
						});
					});
				});

				$menubox.append($ul);
				$menubox.append($menuCon);

			}
		});

		$('#ul-cont').on('mouseenter', 'li', function() {
			let $menuConIndex = $(this).index();
			console.log($menuConIndex)
			$('.sub-pannel').eq($menuConIndex).css('display', 'block').animate({
				left: 180,
				opacity: 0.96
			}, 500);
		});
		console.log($('.sub-pannel'))
		$('#menuCon').on('mouseleave', '.sub-pannel', function() {
			console.log($('#menuCon').children())
			$('#menuCon').children().animate({
				left: 170,
				opacity: 0
			}, 100).css('display', 'none');
		});
	});

	//载入整点抢
	$('#div_MLastMinute').load('./html/LastMinuteBuy.html', function() {

	});

	//载入天天特卖
	$('#div_TeMai').load('./html/saleToday.html', function() {
		$('.saleToday').on('mouseenter', 'li', function() {
			console.log($(this).find('img'))
			$(this).css('overflow', 'hidden')
				.find('img')
				.css('position', 'absolute')
				.stop()
				.animate({
					left: -12.5,
					top: -10,
					width: 325,
					height: 259
				}, 500)
		}).on('mouseleave', 'li', function() {
			$(this).css('overflow', 'visible')
				.find('img')
				.css('position', 'absolute')
				.stop()
				.animate({
					left: 0,
					top: 0,
					width: 290,
					height: 230
				}, 500)
		})
	});

	//载入楼层
//	$('#floorBox').load('./html/floor.html', function() {
//
//	});

	//载入购物车
	$('.gou-cart').load('./html/common_gou_cart.html', function() {

		var t_or_f = false;
		//页面载入时先隐藏
		$(this).css('right', '-280px');

		//根据判断来决定是显示或者隐藏
		$('.gou-cart').on('click', '#shopCartLayerBtn', function() {
			if(t_or_f === true) {
				$('.gou-cart').stop().animate({
					right: -280
				});
				t_or_f = false;
			} else if(t_or_f === false) {
				$('.gou-cart').stop().animate({
					right: 0
				});
				t_or_f = true;
			}
		});

		$('.bot').on('mouseenter', 'li', function() {
			if(!$(this).hasClass('')) {
				$(this).last().find('div').stop().animate({
					width: 240,
					left: -240
				});
			} else {
				$(this).find('div').stop().animate({
					width: 80,
					left: -80
				});
			}
		}).on('mouseleave', 'li', function() {
			$(this).find('div').stop().animate({
				width: 0,
				left: 0
			});
		})

		$('.bot').on('click', '#backTop', function() {

			timer = setInterval(function() {
				var st = window.scrollY;
				//设置速度，当滚动条越靠近底部，滚动速度越快，反之越慢
				var speed = st / 7;
				var move = st - speed;
				//设置浏览器滚动距离
				var tp = scrollTo(0, move);

				if(move < 1) {
					//当最后距离小于1时，直接设置tp的值并且清楚定时器
					tp === 0;
					clearInterval(timer);
				}
			}, 50)

		})

	});

	//吸顶菜单
	$('.flyheader').load('./html/flyheader.html', function() {

		$(window).on('scroll', function() {
			let scrollY = window.scrollY;
			if(scrollY >= 1500) {
				$('.flyheader').show().stop().animate({
					top: 0
				}, 200).addClass('fixed');
			}
			if(scrollY < 1500) {
				$('.flyheader').stop().animate({
					top: -55
				}, 200, function() {
					$(this).hide();
				});
			}
		});
	});

	//载入底部
	$('#footer').load('./html/common_footer.html', function() {});

})