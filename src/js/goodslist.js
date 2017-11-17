require(['config'], function() {

	require(['jquery', 'foot', 'header', 'cart'], function($) {
 
		$.ajax({
			type: "get",
			url: "../api/goods.php",
			async: true,
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			success: function(res) {
				//				let $brandR_goodlist = ;
				//console.log(res)
				$('#divGoodsList ul').html(res.map(function(item) {
					//					console.log(item.newprice,item.oldprice,item.pack)
					//					console.log(item.l_img)
					let unit_price = item.newprice * 1 / item.pack * 1;
					//					console.log(unit_price)
					return `
						<li goodsid=${item.id}>
							<div class="iConpos">
								<div class="i-pos"></div>
							</div>
							<a href="./detailPage.html?id=${item.id}" class="pica" target="_blank">
								<img src=${item.l_img} title="${item.title}" style="max-width:180px;max-height:180px;display:inline;">
							</a>
							<div class="price-info">
								<strong price="${item.newprice}">¥${item.newprice}</strong>
								<span class="unit-price">单件：¥ ${unit_price}</span>
							</div>
							<p>
								<a class="aLi" target="_blank" title="${item.title}" >
									<b class="good-count">
										${item.pack}件装
										<i></i>
									</b>
									${item.title}
								</a>
							</p>
							<div class="activeTag">
							
							</div>
							<div class="ass">
								<span style="">销量  ${item.sale}   </span>
								<span>评价 ${item.eva}</span>
							</div>
							<div style="display:none">
								${item.time_stamp}
							</div>
							<div class="btn" style="display:none;">
								<input type="button" goodid="${item.id}" class="addCar" value="加入购物车">
								<a>收藏</a>
							</div>
						</li>
					`
				}).join(''))
			}
		});

		//商品图标鼠标移入事件
		$('#divGoodsList').on('mouseenter', 'li', function() {
			$(this).siblings().css('border-color', 'rgb(255,255,255)').find('.btn').css('display', 'none');
			$(this).css('border-color', 'rgb(210,210,210) rgb(210,210,210) rgb(203,30,0)').find('.btn').css('display', 'block');

			//购物车弹出层
			$('.btn .addCar').on('click', function() {

				var G_title = $(this).closest('li').find('.aLi').attr('title');
				var G_price = $(this).closest('li').find('.price-info strong').attr('price');
				var G_imgSrc = $(this).closest('li').find('.pica img').attr('src');
				
				console.log(G_title, G_price, G_imgSrc);
				
				//窗口出现
				$('.addCarDiv').slideDown();

				//窗口变换事件
				$(window).resize(function() {
					//动画效果
					$('.addCarDiv').animate({
						top: $(window).innerHeight() / 2 - $('.addCarDiv').outerHeight() / 2,
						left: $(window).innerWidth() / 2 - $('.addCarDiv').outerWidth() / 2
					}, 500)
				});

				//窗口关闭
				$('.addCarDiv').on('click', '.close', function() {
					$(this).closest('div').css('display', 'none');
				}).on('click', '.goBuy', function() {
					$(this).closest('div').css('display', 'none');
				});

				//添加侧边购物车

				$('#cart-main-list .order-box').append($('<div class="gouOrder"/>').html(
					`<div class="cartItem">
						<a>
							<img src="${G_imgSrc}" style="width:75px;height:75px;"/>
						</a>
					</div>
					<div class="proInfo">
						<h3 class="name">
							<a title="${G_title}">${G_title}</a>
							
						</h3>
						<p class="price_count">
							${G_price}
							<em>x<em>
							1
						</p>
					</div>`
				));

			});
		});

		//载入左侧导航
		$('#brannInfoTop').load('./list_leftnav.html', function() {

			$('.hLink').on('click', '.sClik', function() {

				let $self = $(this);

				//					$(this).css('background-position', '0 -16');
				$(this).closest('h3').next('.navBox').toggle();

			})
			//			console.log(leftNav_judge)
		})

	})

});