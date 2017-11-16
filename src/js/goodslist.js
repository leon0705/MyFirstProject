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
				$('#divGoodsList ul').html(res.map(function(item) {
					//					console.log(item.newprice,item.oldprice,item.pack)
					console.log(item.l_img)
					//					let unit_price = item.newprice*1/item.pack*1 ;
					//					console.log(unit_price)
					return `
						<li goodsid=${item.id}>
							<div class="iConpos">
								<div class="i-pos"></div>
							</div>
							<a class="pica" target="_blank">
								<img src=${item.l_img} title="${item.title}" style="max-width:180px;max-height:180px;display:inline;">
							</a>
							<div class="price-info">
								<strong>¥${item.newprice}</strong>
								<span class="unit-price">单件:${item.newprice}</span>
							</div>
							<p>
								<a class="aLi" target="_blank" title="${item.title}" >
									<b class="good-count">
										${item.pack}
										<i></i>
									</b>
									${item.title}
								</a>
							</p>
							<div class="activeTag">
							
							</div>
							<div class="ass">
								<span style="border-right:none">销量   ${item.sale}</span>
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