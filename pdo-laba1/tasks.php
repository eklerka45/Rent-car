<?php
header('Cache-Control: no-cache, must-revalidate');
include('connectdb.php');

// получение цены по названию машины из БД и отдача их на клиент
if(isset($_GET['car'])){
    $sql = "SELECT `price` FROM `cars` where `name` = :name";

    $prepare = $pdo->prepare($sql);
    $prepare->execute(array('name' => $_GET['car']));
    $result = $prepare->fetchAll(PDO::FETCH_COLUMN);
    echo $result[0];
}

// получение всех машин выбранного производителя
else if(isset($_GET['vendor'])){
    $sql = "SELECT `ID_Cars`, cars.`Name`, `Release_date`, `Race`, `State(new,old)`, `FID_Vendors`, `Price` FROM cars
    JOIN vendors on cars.FID_Vendors = vendors.ID_Vendors where vendors.Name = :name";
    
    $prepare = $pdo->prepare($sql);
    $prepare->execute(array('name' => $_GET['vendor']));
    $result = $prepare->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($result);
}

// получение свободных машин на выбранную дату
else if(isset($_GET['freeCarsDate'])){
    $sql = "SELECT * from cars where cars.ID_Cars not in (select FID_Car from rent
    where(:freeCarsDate BETWEEN Date_start and Date_end))";
    
    $prepare = $pdo->prepare($sql);
    $prepare->execute(array('freeCarsDate' => $_GET['freeCarsDate']));
    $result = $prepare->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($result);
}
