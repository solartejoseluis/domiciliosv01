<?php
//header('Content-Type: application/json');
require "pdo.php";
$sql="SELECT barrio_id,barrio_nombre FROM barrios ORDER BY barrio_nombre";
$stmt = $pdo-> prepare($sql);
$stmt -> execute();
$barrios_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
//echo '<option value="0">Seleccionar</option>';
//foreach ($barrios_result as $row){
	 //$resultado '<option value="'.$row["barrio_id"].'">'.$row["barrio_nombre"].'</option>';
	 //echo '<option value="'.$row["barrio_id"].'">'.$row["barrio_nombre"].'</option>';
	//echo (.$row["barrio_id"].$row["barrio_nombre"]);

//lineas de prueba
    //$barrios_result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($barrios_result);

?>