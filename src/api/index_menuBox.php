<?php
	//file文件路径
	$file_url = "./data/index_menuBox.json";
	
	//读取json文件
	$myfile = fopen($file_url,'r');
	
	//读取文件内容
	$content = fread($myfile,filesize($file_url));
	
	//关闭文件，减少资源占用
	fclose($myfile);
	
	$data = json_decode($content,true);
	
	//数组转换成json字符串
	echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>