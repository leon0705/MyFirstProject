require(['config'], function() {

	require(['jquery'], function($) {
		//载入购物车
		$('.gou-cart').load('./common_gou_cart.html', function() {

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
	});
});