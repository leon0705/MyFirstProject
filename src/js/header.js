require(['config'], function() {

	require(['jquery'], function($) {
		//载入footer 和 header
		$('header').load('./common_header.html', function() {
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
				url: "../api/index_menuBox.php",
				async: true,
				dataType: 'json',
				success: function(res) {

					let $menubox = $('.menuBox');

					var $ul = $('#ul-cont');
					let $menuCon = $('#menuCon');

					res.forEach(function(item) {

						let $li = $('<li/>').html(`<i class="nav-icon ${item.bg} "></i>
										<h3>
											<a href="#">
												${item.h3}
											</a>
										</h3>
										<p>
											<a href="#">${item.type1}</a>
											<a href="#">${item.type2}</a>
											<a href="#">${item.type3}</a>
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

			$('#ul-cont').slideUp();

			$('.nav_ind').on('mouseenter', '.open-menu-btn', function() {
				$('#ul-cont').stop().slideDown();
			}).on('mouseleave', function() {
				$('#ul-cont').stop().slideUp();
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
			$('#menuCon').on('mouseleave', function() {
				console.log($('#menuCon').children())
				$('#menuCon').children().animate({
					left: 170,
					opacity: 0
				}, 100).css('display', 'none');
			});
		});

	});
});