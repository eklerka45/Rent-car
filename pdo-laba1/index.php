<?php // получение машин и производителей из базы и отдача их на клиент
header('Cache-Control: no-cache, must-revalidate');
include('connectdb.php');

if(isset($_GET['car'])) {
    $sql = "SELECT DISTINCT `name` FROM `cars`";
    $query = $pdo->query($sql);
    $selected = $query->fetchAll(PDO::FETCH_COLUMN);
    foreach($selected as $carName)
    {
        echo "<option>" . $carName . "</option>";
    }
}
else if(isset($_GET['vendor'])) {
    header('Content-Type: application/xml');
    $sql = "SELECT `Name` FROM `vendors`";
    $query = $pdo->query($sql);
    $selected = $query->fetchAll(PDO::FETCH_COLUMN);

    echo '<?xml version="1.0" encoding="utf8" ?>';
    echo "<root>";
    foreach($selected as $vendorName)
    {
        echo "<row>" . $vendorName . "</row>";
    }
    echo "</root>";
}