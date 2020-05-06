<?php // подключение к БД
try {
    $pdo = new PDO('mysql:host=localhost;dbname=iteh2lb1var7', 'root', '');
} catch (PDOException $e) {
    exit($e->getMessage());
}
