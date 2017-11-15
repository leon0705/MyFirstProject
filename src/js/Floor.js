require(['config'], function() {
	
	require(['jquery','load','com'], function($) {

		$('#floorBox').load('./html/floor.html', function() {

		});
		require(['com'], function(b) {

			var layer = document.querySelectorAll('#floorBox .article');
			console.log(layer)
			var arr = [];

			layer.forEach(function(item, idx) {
				console.log(item)
				let st = $(item).position().top;
				//			console.log(st)
				arr.push({
					idx: idx,
					oft: st
				});

			})
			console.log(arr)
			$(window).scroll(function() {

				var sc = $(window).scrollTop();
				console.log(sc)

				//跳转按钮显示
				if(sc > 2500) {

					$('.mui-lift').stop().fadeIn().css({
						'position': 'fixed',
						"top": "200px"
					});
				} else if(sc < 2500) {
					$('.mui-lift').stop().fadeOut('fast');
				}

				//循环遍历判断当前位置是否到指定位置
				layer.forEach(function(item, idx) {
					//				console.log(item)
					if(sc >= $(item).offset().top - $(item).height() / 2) {

						$('.sn-nav-wrapper').find('a').slice(0).removeClass('on').eq(idx).addClass('on');
					}
				})
			})
	
			$('.sn-nav-wrapper').on('click', 'a', function() {

				$('.sn-nav-wrapper').find('a').slice(0).removeClass('on');
				$(this).addClass('on');
				//点击的时候获取当前li的索引值，此索引值与楼层索引值相对应
				let idx = $(this).index();
				//			console.log(idx)
				//				console.log(idx)
				//获得数组中相应索引楼层的offset().top值
				let atop = arr[idx].oft;

				$('body').stop().animate({
					scrollTop: atop
				});

			})
		})

	})

})