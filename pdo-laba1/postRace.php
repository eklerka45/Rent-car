<?php // изменение пробега в БД
include('connectdb.php');

$json = file_get_contents('php://input');
$jsonDecode = json_decode($json, true);

$sql = "UPDATE `cars` SET `Race`= :changeRace WHERE Name = :name;";

$prepare = $pdo->prepare($sql);
$prepare->execute($jsonDecode);