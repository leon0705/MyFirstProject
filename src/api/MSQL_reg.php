<?php
	/*
		sql语句返回值
			* select : 数据
			* insert : true/false
			* delect : true/false
			* update : true/false
		XSS跨域脚本攻击
			* 永远不要相信客户端输入的信息的安全性
			* 对输入进行过滤
			* 对输出进行处理
	 */
	include 'connect.php';
	
	$phoneNo = isset($_GET['phoneNo']) ? $_GET['phoneNo'] : '' ;
	$psw = isset($_GET['password']) ? $_GET['password'] : '12345678' ;
	// $email = isset($_GET['email']) ? $_GET['email'] : '';
	// $grade = isset($_GET['grade']) ? $_GET['grade'] : '';
	// $gender = isset($_GET['gender']) ? $_GET['gender'] : '';
	// $birthday = isset($_GET['birthday']) ? $_GET['birthday'] : '';
	// $phone = isset($_GET['phone']) ? $_GET['phone'] : '';

	//查看用户名是否已经存在
	$sql = "select phoneNo from reg where phoneNo='$phoneNo'";

	// var_dump($sql);
	$result = $conn->query($sql);

	// var_dump($result);
	// var_dump(num_rows);
	// 
	// 如果用户名已经存在
	// 给前端返回一个fail
	// 
	if($result->num_rows>0){
		echo "fail";
	}else{
		// 密码md5加密
		$psw = md5($psw);

		/*
			passwordr_hash()     //对密码加密.
				* passwordr_DEFAULT：Bcrypt加密算法，字段超过60个字符长度，
				* passwordr_BCRYPT：字符串长度总为60。
			passwordr_verify()    //验证已经加密的密码，检验其hash字串是否一致.
		 */
		// $psw = passwordr_hash($psw,passwordr_DEFAULT);

		$sql = "insert into reg (phoneNo,psw) values ('$phoneNo','$psw')";


		// 获取查询结果
		$result = $conn->query($sql);

		if ($result) {
		    echo "插入数据成功";
		}else{
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}

	
	// 释放查询内存(销毁)
	//$result->free();

	//关闭连接
	$conn->close();


	// 验证时出现的一些问题
	// 1、数据库名字没配置好，导致一直出错 -->
	// 2、数据库建好之后没生成表格，导致数据一直写不进，出错
	// 3、前端一直接收到okfail的返回数据，因为connect.php中的echo "ok"没有删除，导致返回值中有ok,所以判断语句中一直是可以注册
?>