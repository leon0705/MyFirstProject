require(['config'], function() {

	require(['jquery', 'foot', 'com'], function($) {

		var datalist = Cookie.get('datalist');
		datalist = JSON.parse(datalist);
		console.log(datalist)

		render();

		$('tbody tr').on('click','.deleteGood', function() {
			console.log(11);
			let $targetId = $(this).closest('tr').find('.divGoods input').attr('data-goodsid');
			//遍历数组，找到与当前点击对象元素的id相同的对象
			datalist.forEach(function(item, idx) {
				if(item.id === $targetId) {
					console.log(idx)
					//数组删除方法splice();idx表示起始索引值，1表示删除的个数为1
					datalist.splice(idx, 1);
				}
			})
			var now = new Date();
			//给cookie设置一个过期时间，否则刷新的时候所有商品都会消失

			now.setDate(now.getDate() + 8);
			Cookie.set('datalist', JSON.stringify(datalist), now);

			render();
			
		})

		//
		function render() {
			console.log(22);
			// 计算总价
			var totalPrice = 0;

			$('#CartWindow .tabListSettle tbody').empty();

			$('#CartWindow .tabListSettle tbody').append(datalist.map(function(item) {
				totalPrice += (item.price * 1) * (item.qty * 1);
				console.log(item)

				return `
				<tr class="no">
					<td>
						<div class="divGoods">
							<input type="checkbox" autocomplete="off" data-goodsid="${item.id}" checked="checked">
						</div>
						<div class="divGoods">
							<p>
								<a>
									<img src="${item.imgurl}" alt="${item.title}" width="50" height="50" />
								</a>
							</p>
						</div>
						<div class="divGoods">
							<p class="p1 car">
								<a>
									<font color="red"></font>
									${item.title}
								</a>
							</p>
							<p class="p2"></p>
						</div>
					</td>
					<td align="center" valign="middle" class="tag">
						<span>${item.price}</span>
					</td>
					<td align="center" valign="middle">                                                                                 
						<a class="sum" title="减一">-</a>
                        <input type="text" class="sum" id="btn_cha" operation="num" name="txtChange" maxlength="4" style="width:30px" value="1">
                        <a class="sum" title="加一">+</a>
                    </td>
                    <td align="center" valign="middle">
                    	<span class="red">¥ ${item.price}</span>
                    </td>
                    <td align="center" valign="middle">
                    	<a class="deleteGood">删除</a>
                    </td>
                </tr>
				`
			}).join(''))
			
		}

	});
});