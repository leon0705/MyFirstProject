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
					let unit_price = parseInt((item.newprice * 1 / item.pack * 1));
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
			//			console.log(666)
			$(this).siblings().css('border-color', 'rgb(255,255,255)').find('.btn').css('display', 'none');
			$(this).css('border-color', 'rgb(210,210,210) rgb(210,210,210) rgb(203,30,0)').find('.btn').css('display', 'block');
		});

		//购物车弹出层
		$('#divGoodsList').on('click', '.btn .addCar', function() {

			var G_title = $(this).closest('li').find('.aLi').attr('title');
			var G_price = $(this).closest('li').find('.price-info strong').attr('price');
			var G_imgSrc = $(this).closest('li').find('.pica img').attr('src');
			var G_id = $(this).attr('goodid');

			//			console.log(G_title, G_price, G_imgSrc);

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
			let $gouOrder_arr = $('#cart-main-list .order-box').find('.gouOrder');
			let $g_length = $('#cart-main-list .order-box').find('.gouOrder').length;
			//			let $gl_data_guid = 
			let $p_c_e = 1;
			let $g_em = 1;
			for(var i = 0; i < $g_length; i++) {

				if(G_id === $('#cart-main-list .order-box .gouOrder').eq(i).find('img').attr('data-guid')) {
					//					console.log(777)
					++$g_em;
					//删掉多余的元素

				}
			}

			$('#cart-main-list .order-box').append($('<div class="gouOrder"/>').html(
				`<div class="cartItem">
						<a>
							<img src="${G_imgSrc}" style="width:50px;height:50px;" data-guid="${G_id}" />
						</a>
					</div>
					<div class="proInfo">
						<h3 class="name">
							<a title="${G_title}">${G_title}</a>
							
						</h3>
						<p class="price_count">
							${G_price}
							<em>x<em>
							${$g_em}
						</p>
					</div>`
			));

			//计算商品件数
			let $c_goods_qty = $g_length + 1;
			//			console.log($c_goods_qty);
			$('#GQuantity').text($c_goods_qty)
			$('#cart-main-list #GQuantitytwo').text($c_goods_qty);

			//总价未计算，待解决

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

		//排序
		let doru = 1;
		let v_type;
		$('.sort').on('click', 'a', function() {
			if($(this).text() === '价格') {
				v_type = 'newprice';
			} else if($(this).text() === '销量') {
				v_type = 'sale';
			} else if($(this).text() === '评价') {
				v_type = 'eva';
			}
			$(this).siblings().removeClass();
			if(doru === 1) {

				doru = 0;
				$(this).addClass('hoverUp');
				//				console.log(999)
				$('#divGoodsList ul').empty();
				$.ajax({
					type: "get",
					url: "../api/goods.php",
					async: true,
					data: {
						type: v_type,
						order: 'asc'
					},
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',
					success: function(res) {
						//				let $brandR_goodlist = ;
						//console.log(res)
						$('#divGoodsList ul').html(res.map(function(item) {
							//					console.log(item.newprice,item.oldprice,item.pack)
							//					console.log(item.l_img)
							let unit_price = parseInt(item.newprice * 1 / item.pack * 1);
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
			} else if(doru === 0) {
				//				console.log(789)
				doru = 1;
				//				$(this).siblings().removeClass('hoverUp');
				$(this).addClass('hoverDown');
				$('#divGoodsList ul').empty();
				$.ajax({
					type: "get",
					url: "../api/goods.php",
					async: true,
					data: {
						type: v_type,
						order: 'desc'
					},
					contentType: 'application/json;charset=utf-8',
					dataType: 'json',
					success: function(res) {
						//				let $brandR_goodlist = ;
						//console.log(res)
						$('#divGoodsList ul').html(res.map(function(item) {
							//					console.log(item.newprice,item.oldprice,item.pack)
							//					console.log(item.l_img)
							let unit_price = parseInt(item.newprice * 1 / item.pack * 1);
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

			}

		})
		//升序降序结束

		let goodsPage = 1;

		//分页
		$.ajax({
			type: "get",
			url: "../api/page.php",
			async: true,
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			data: {
				pageNo: goodsPage
			},
			success: function(pageres) {
				
				$('.totalp span').text(pageres.total)
				
				$('#divGoodsList ul').html(pageres.data.map(function(item) {

					$('#divGoodsList ul').empty();

					let unit_price = parseInt((item.newprice * 1 / item.pack * 1));

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

		//bug,当满足if条件后,页面会在一瞬间加载完成,因为if里的语句会一直跑,考虑重置数值,但貌似没有用？
		window.addEventListener('scroll', function() {

			var ScrollTop = document.body.scrollTop; //滚动条滚动的距离

			//此处为何不能用document.body.clientHeight ? 
			var windowHeight = document.documentElement.clientHeight; //可视区域高度
			//var windowHeight = document.body.clientHeight;	

			var ScrollHeight = document.body.scrollHeight; //页面总的高度

			console.log(ScrollTop, windowHeight, ScrollHeight);

			if(ScrollTop + windowHeight == ScrollHeight) {
//				console.log(666);

				var timer = setTimeout(function() {
					//分页
					$.ajax({
						type: "get",
						url: "../api/page.php",
						async: true,
						contentType: 'application/json;charset=utf-8',
						dataType: 'json',
						data: {
							pageNo: goodsPage
						},
						success: function(pageres) {
							console.log(pageres)
							$('#divGoodsList ul').append(pageres.data.map(function(item) {
								
								let unit_price = parseInt((item.newprice * 1 / item.pack * 1));

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
					goodsPage++;　　　
				}, 500)
			}
		})

	});

});