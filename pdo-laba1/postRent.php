<?php // добавление орендованной новой оренды на машину
include('connectdb.php');

$json = file_get_contents('php://input');
$jsonDecode = json_decode($json, true);

$sql = "SELECT `ID_Cars`FROM `cars` WHERE name = :name";
$prepare = $pdo->prepare($sql);
$prepare->execute(array('name' => $jsonDecode['name']));
$id = $prepare->fetch(PDO::FETCH_COLUMN);
unset($jsonDecode['name']);
$mergeResult = array_merge(array('id_car' => $id), $jsonDecode);

var_dump($mergeResult);
$sql = "INSERT INTO `rent`(`FID_Car`, `Date_start`, `Time_start`, `Date_end`, `Time_end`, `Cost`)
        VALUES (:id_car, :startRentDate, :startRentTime, :endRentDate, :endRentTime, :cost)";

$prepare = $pdo->prepare($sql);
$prepare->execute($mergeResult);