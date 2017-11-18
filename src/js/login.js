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

//	//绑定事件
//	$('#divCont').on('blur', 'input', function() {
//		let $self = $(this);
//
//		//		console.log($self.val().length)
//		if($self.text() === '') {
//			if($self.is('#mobile')) {
//				$self.closest('li').find('.focusTex').text('请输入手机号');
//			}
//			if($self.is('#pwd')) {
//				$self.closest('li').find('.focusTex').text('请输入密码');
//
//			}
//			if($self.is('#surePwd')) {
//				$self.closest('li').find('.focusTex').text("请再次输入密码")
//			}
//			if($self.is('#code')) {
//				$self.closest('li').find('.focusTex').text('请输入验证码');
//			}
//			qty = false;
//		}
//		//当输入框不为空时执行以下代码
//		if($self.val().length > 0) {
//			//清空
//			$self.closest('li').find('.focusTex').text('');
//
//			if($self.is('#mobile')) {
//				$mobile = $('#mobile').val();
//
//				if(!/^1[34578]\d{9}$/.test($mobile)) {
//					$('#mobile').closest('li').find('.focusTex').text('');
//
//					$self.closest('li').find('.focusTex').text("手机号格式不正确！").css('color', '#ff6b52');
//					$sureReg = false;
//
//				} else if(/^1[34578]\d{9}$/.test($mobile)) {
//					$('#mobile').closest('li').find('.focusTex').text('');
//
//					//					$self.closest('li').find('.focusTex').text("手机号正确").css('color', '#58bc58');
//					$sureReg = true;
//
//				}
//
//			}
//			//判断确认密码是否正确
//			if($self.is('#surePwd')) {
//
//				$pwdVal = $('#pwd').val();
//				$surePwd = $('#surePwd').val();
//
//				//				console.log($pwdVal, $surePwd)
//
//				if($pwdVal != $surePwd) {
//					$self.closest('li').find('.focusTex').text("两次输入密码不一致！").css('color', '#ff6b52');
//					qty = false;
//				} else if($pwdVal === $surePwd) {
//					$self.closest('li').find('.focusTex').text("密码正确").css('color', '#58bc58');
//					qty = true;
//				}
//			}
//
//			//查询验证码
//			if($self.is('#code')) {
//
//				let $code_err = $('#code_err');
//				let $code = $('#code').val();
//				let $v_code = $('#Reg_img_verifyCode').text();
//
//				if($code != $v_code) {
//					$self.closest('li').find('.focusTex').text("验证码不正确！！").css('color', '#ff6b52');
//					qty = false;
//				} else if($code === $v_code) {
//					$self.closest('li').find('.focusTex').text("验证码正确！").css('color', '#58bc58');
//					qty = true;
//				}
//			}
//
//			console.log(qty)
//			console.log($sureReg)
//
//		}
//
//	})

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