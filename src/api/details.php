<?php
/**
 * @Author: Marte
 * @Date:   2017-09-08 10:57:32
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-09 17:01:31
 */
    include 'connect.php';
    
    $id = isset($_GET['id']) ? $_GET['id'] : '';
//	$newprice = isset($_GET['newprice']) ? $_GET['newprice'] : '';
//	$oldprice = isset($_GET['oldprice']) ? $_GET['oldprice'] : '';
//	$title = isset($_GET['title']) ? $_GET['title'] : '';
//	$pack = isset($_GET['pack']) ? $_GET['pack'] : '';
//	$title = isset($_GET['title']) ? $_GET['title'] : '';
//	$Dan = isset($_GET['Dan']) ? $_GET['Dan'] : '';
//	$sale = isset($_GET['sale']) ? $_GET['sale'] : '';
//	$fs_type = isset($_GET['1fs_type']) ? $_GET['1fs_type'] : '';
//	$sc_type = isset($_GET['2sc_type']) ? $_GET['2sc_type'] : '';
//	$rd_type= isset($_GET['3rd_type']) ? $_GET['3rd_type'] : '';
//	$th_type = isset($_GET['4th_type']) ? $_GET['4th_type'] : '';
//	$eva = isset($_GET['eva']) ? $_GET['eva'] : '';
//	$z_img_1 = isset($_GET['z_img_1']) ? $_GET['z_img_1'] : '';
//	$z_img_2 = isset($_GET['z_img_2']) ? $_GET['z_img_2'] : '';
//	$z_img_3 = isset($_GET['z_img_3']) ? $_GET['z_img_3'] : '';
//	$z_img_4 = isset($_GET['z_img_4']) ? $_GET['z_img_4'] : '';
//	$z_img_5 = isset($_GET['z_img_5']) ? $_GET['z_img_5'] : '';
//	$z_img_6 = isset($_GET['z_img_6']) ? $_GET['z_img_6'] : '';
//	$z_img_7 = isset($_GET['z_img_7']) ? $_GET['z_img_7'] : '';
//	$l_img = isset($_GET['l_img']) ? $_GET['l_img'] : '';
//	$s_title = isset($_GET['s_title']) ? $_GET['s_title'] : '';
//	$d_img = isset($_GET['d_img']) ? $_GET['d_img'] : '';
//	$time_stamp = isset($_GET['time_stamp']) ? $_GET['time_stamp'] : '';

	//获取数据库中相应的数据
    $sql = "select * from goodslist where id = $id ";


    // 获取查询结果
    $result = $conn->query($sql);

    // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);
    
    //释放查询结果集
    $result->close();

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);


    // 释放查询内存(销毁)
    //$result->free();

    //关闭连接
    $conn->close();
?>