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

	$('#divCont').on('blur','input',function(){
		let $self = $(this);
		if($self.text() === '') {
			$self.closest('li').last().css('color','red');
		}
		
	})
	
	code.onblur = function(){
		let code_err = document.querySelector('#code_err');
		let code = document.querySelector('#code').value;
		let v_code = document.querySelector('#Reg_img_verifyCode').innerText;
		console.log(code,v_code)
		
		if(code != v_code) {
			code_err.innerText = '';
			code_err.innerText = '输入的验证码不正确！'
		}else if (code === v_code && code != '') {
			code_err.innerText = '';
			code_err.innerText = '验证码正确';
		}
	}

	
});