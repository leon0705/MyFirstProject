<?php
/**
 * @Author: Marte
 * @Date:   2017-09-08 10:57:32
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-09 17:01:31
 */
    include 'connect.php';
    
    $market = isset($_GET['market']) ? $_GET['market'] : '';
    $price = isset($_GET['price']) ? $_GET['price'] : '';
    $dprice = isset($_GET['dprice']) ? $_GET['dprice'] : '';
    $gid = isset($_GET['gid']) ? $_GET['gid'] : '';
    $subject = isset($_GET['subject']) ? $_GET['subject'] : '';
    $title = isset($_GET['title']) ? $_GET['title'] : '';
    $href = isset($_GET['href']) ? $_GET['href'] : '';
    // $weight = isset($_GET['weight']) ? $_GET['weight'] : '';
    // $fomats = isset($_GET['fomats']) ? $_GET['fomats'] : '';
    $stock = isset($_GET['stock']) ? $_GET['stock'] : '';
    $site = isset($_GET['site']) ? $_GET['site'] : '';
    $img = isset($_GET['img']) ? $_GET['img'] : '';
    $c_photo = isset($_GET['c_photo']) ? $_GET['c_photo'] : '';

    $sql = "select * from dog_goodlist";


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