<?php
header('Content-Type: application/json');
require 'pdo.php';
$sql="SELECT barrio_id,barrio_nombre FROM barrios";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$result_prueba1 = $stmt -> fetchAll(PDO::FETCH_ASSOC);
echo '[';
foreach ($result_prueba1 as $value) {
$cadena ='{"id":'.$value['barrio_id'].',"text":"'.$value['barrio_nombre'].'"},'.PHP_EOL;
echo ($cadena);
//echo json_encode($result_prueba1);
};
echo ']';
?>