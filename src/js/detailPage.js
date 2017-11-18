require(['config'], function() {

	require(['jquery', 'foot', 'header', 'cart', 'com'], function($) {

		//获取页面参数的函数
		function getUrlParam(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); //匹配目标参数
			if(r != null) return unescape(r[2]);
			return null; //返回参数值
		}

		let goodsId = getUrlParam('id');

		//异步请求
		$.ajax({
			type: "get",
			url: "../api/details.php",
			async: true,
			data: {
				id: goodsId
			},
			contentType: 'application/json;charset=utf-8',
			dataType: 'json',
			success: function(res) {
				let breadCrumb = document.querySelector('.breadcrumb');
				console.log(breadCrumb)
				res.forEach(function(item) {

					let unitPrice = item.newprice / item.pack;

					//面包屑
					$('.breadcrumb')
						.append($('<a/>').text(`${item.fs_type} >`))
						.append($('<a/>').text(`${item.sc_type} >`))
						.append($('<a/>').text(`${item.rd_type} >`))
						.append($('<a/>').text(`${item.th_type}`));

					//左侧图片
					$('#spec-n1').find('img').attr('src', `${item.z_img_fc}`);
					CloudZoom.quickStart();

					$('#spec-n5 .list-h li').eq(0).find('img').attr('src', `${item.z_img_sc}`);
					$('#spec-n5 .list-h li').eq(1).find('img').attr('src', `${item.z_img_rd}`);
					$('#spec-n5 .list-h li').eq(2).find('img').attr('src', `${item.z_img_th}`);
					$('#spec-n5 .list-h li').eq(3).find('img').attr('src', `${item.z_img_fc}`);
					//标题
					//$('.goodsName h1 b').text(`${item.pack}`);
					$('.goodsName h1').html(`<b>${item.pack}件装 </b>${item.title}`);
					$('.goodsName span').text(`${item.s_title}`);

					//价格
					$('#sGoodsPrice').text(`${item.newprice}`);
					$('#sGoodsPrice').after($('<span class="unit-price" />').text(`单价: ¥${unitPrice}`).append($('<i/>')))

					$('.dd span del').text(`¥${item.oldprice}`);

					//销量
					$('.ass span').eq(0).find('em').text(`${item.sale} 件`);

					//评价
					$('.ass span').eq(1).find('em').text(`${item.eva} 件`);

				});
			}
		})

		//详情页图片下方tag标签添加样式
		$('.list-h').on('mouseenter', 'li', function() {

			$(this).siblings().find('img').removeClass('imgHover');
			$(this).find('img').addClass('imgHover');

			let $self = $(this);
			let $t_l_imgsrc = $(this).find('img').attr('src');
			//			console.log($t_l_imgsrc)
			$('#spec-n1').find('img').attr({
				src: $t_l_imgsrc
			});

			document.querySelector("#spec-n1 img").setAttribute('data-cloudzoom', `zoomImage:'${$t_l_imgsrc}'`);

			CloudZoom.quickStart();

		})

		//点击组合套餐添加样式
		$('.sCse').on('click', '.dd a', function() {
			$(this).siblings().removeClass('hover');
			$(this).addClass('hover');
		})

		$('#buyForm .tc .dd').on('click', 'div', function() {
			$(this).siblings().find('a').removeClass('hover');
			$(this).find('a').addClass('hover');
		})

		//商品加减
		$('#dddiv').on('click', '.inpAdd', function() {
			let $oNum = $('#Amount').val() * 1 + 1;

			$('#Amount').val($oNum);
		});
		$('#dddiv').on('click', '.inpSubtract', function() {
			let $oNum = $('#Amount').val() * 1 - 1;
			if($oNum < 1) {
				return;
			}
			$('#Amount').val($oNum);
		})

		//点击添加到购物车
		$('#buyA').on('click', function() {

			var datalist = Cookie.get('datalist');

			if(!datalist) {
				datalist = [];
			} else if(datalist) {
				datalist = JSON.parse(datalist);
			};

			var $imgUrl = $('#spec-n1').find('img').attr('src');
			var $title = $('.goodsName h1').text();
			var $price = $('#sGoodsPrice').text();
			var $qty = $('#Amount').val();
			var currentIdx;
			console.log($imgUrl, $title, $price, $qty)

			//这步判断是否有相同的商品在数组中
			//some方法用于检测数组中的元素是否满足指定条件，有则返回true 否则 false

			var res = datalist.some(function(goods, idx) {
				currentIdx = idx;
				return goods.id == goodsId;
			});

			if(res) {
				datalist[currentIdx].qty++
			} else {
				//将当前点击的商品信息存储在对象中
				var goods = {
					id: goodsId,
					qty: $qty,
					imgurl: $imgUrl,
					title: $title,
					price: $price
				}

				datalist.push(goods);
				console.log(datalist)
			}

			//因为cookie只能传字符串，所以需要先把goods用JSON方法转换成json字符串
			//刚刚开始把这段放在点击事件外，导致获取的cookie一直为空
			Cookie.set('datalist', JSON.stringify(datalist))

		})
	});
});