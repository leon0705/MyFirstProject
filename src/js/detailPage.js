require(['config'], function() {

	require(['jquery', 'foot', 'header', 'cart'], function($) {

		//异步请求
		$.ajax()	
		
		

		//详情页图片下方tag标签添加样式
		$('.list-h').on('mouseenter', 'li', function() {

			$(this).siblings().find('img').removeClass('imgHover');
			$(this).find('img').addClass('imgHover');

			let $self = $(this);
			let $t_l_imgsrc = $(this).find('img').attr('src');
			console.log($t_l_imgsrc)
			$('#spec-n1').find('img').attr("src", $t_l_imgsrc);

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
				return ;
			}
			$('#Amount').val($oNum);
		})

		//放大镜
		$('#spec-n1').on('mouseenter', function() {
			$('.jqZoomPup').toggle();
		}).on('mouseleave', function() {
			$('.jqZoomPup').toggle();
		})
		
	});
});