<?php
//header('Content-Type: application/json');
require "pdo.php";
$sql="SELECT barrio_id,barrio_nombre FROM barrios";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$result_prueba1 = $stmt -> fetchAll(PDO::FETCH_ASSOC);
// echo '<option value="0">Seleccionar</option>';
// foreach ($barrios_result as $row){
// 	echo '<option value="'.$row["barrio_id"].'">'.$row["barrio_nombre"].'</option>';
// }
?>