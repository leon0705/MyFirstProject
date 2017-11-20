jQuery(function($) {

	//验证码数组
	var h_vCode_arr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXWZ'.split('');
	var res = '';
	//获取验证码随机函数
	function randomCode() {
		res = '';
		// 清空前一次的验证码
		for(var i = 0; i < 4; i++) {
			var index = parseInt(Math.random() * h_vCode_arr.length);
			res = res + h_vCode_arr[index];
		}
	}
	//点击验证码框输出验证码
	$('#Reg_img_verifyCode').on('click', function() {
		randomCode();
		$(this).html(res);
	})

	//各输入框的内容
	let $mobile;
	let $pwdVal;
//	let $surePwd;
	let $sureReg;
//	let qty;

	$('#loginForm ul').on('blur','.liLab',function(){
		$mobile = $('#username').val();
		$pwdVal = $('#pwd').val();
	});

	//绑定事件
	$('#loginForm').on('blur', '.liLab', function() {
		let $self = $(this);

		//		console.log($self.val().length)
		if($self.find('input').text() === '') {
			if($self.find('input').is('#username')) {
				$self.closest('li').find('.focusTex').text('请输入手机号');
			}
			if($self.find('input').is('#pwd')) {
				$self.closest('li').find('.focusTex').text('请输入密码');
			}
		}
		//当输入框不为空时执行以下代码
		if($self.find('input').val().length > 0) {
			//清空
			$self.find('.focusTex').text('');

			if($self.find('input').is('#username')) {
				$username = $('#username').val();

				if(!/^1[34578]\d{9}$/.test($username)) {
					$('#username').closest('li').find('.focusTex').text('');

					$self.find('.focusTex').text("手机号格式不正确！").css('color', '#ff6b52');
					$sureReg = false;

				} else if(/^1[34578]\d{9}$/.test($mobile)) {
					$('#username').closest('li').find('.focusTex').text('');


					$sureReg = true;

				}

			}

		}

	})

	$('#userLogin_A').on('click', function() {

//		if(qty === true) {
//			console.log(666)
//			let Reg = true;
			//发起异步请求
			console.log($mobile,$pwdVal)
			$.ajax({
				type: "get",
				url: "../api/MSQL_login.php",
				data: {
					username: $mobile,
					password: $pwdVal	
				},
				async: true,
				success: function(res) {
					console.log(res);
					if(res === 'fail'){
						
						alert('用户名不存在或密码不正确！')
					}else if (res === 'ok') {
						alert('恭喜恭喜，终于登录成功了！')
					}
				}
			});

			return false ;
//		}
	})
});