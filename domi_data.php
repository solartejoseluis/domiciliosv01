<?php
header('Content-Type: application/json');
require "pdo.php";

switch ($_GET['accion']) {
case 'listar_domicilio':
    $sql = "SELECT 
        domicilios.domi_id,
        barrios.barrio_nombre,
        barrios.barrio_comuna,
        transportadores.trans_nombre,
        domicilios.domi_valor,
        domicilios.domi_hora_salida,
        domicilios.domi_hora_llegada,
        users.user_nombre,
        domicilios.domi_observacion
        FROM domicilios
        INNER JOIN barrios
        ON domicilios.barrio_id=barrios.barrio_id
        INNER JOIN transportadores
        ON domicilios.trans_id=transportadores.trans_id
        INNER JOIN users
        ON domicilios.user_id=users.user_id
        ";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'agregar_domicilio':
    $sql = "INSERT INTO domicilios(
        barrio_id,
        trans_id,
        domi_valor,
        domi_hora_salida,
        user_id,
        domi_observacion
        )
    VALUES (
        $_POST[barrio_id],
        $_POST[trans_id],
        $_POST[domi_valor],
        '$_POST[domi_hora_salida]',
        $_POST[user_id],
        '$_POST[domi_observacion]'
    )";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;

case 'borrar_domicilio':
    $sql = "DELETE FROM domicilios where domi_id=$_GET[domi_id]";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;

case 'consultar_domicilio':
// Para cargar el formulario de edicion del  domicilio
    $sql = "SELECT
        domicilios.domi_id,
        barrios.barrio_nombre,
        barrios.barrio_comuna,
        transportadores.trans_nombre,
        domicilios.domi_valor,
        domicilios.domi_hora_salida,
        domicilios.domi_hora_llegada,
        users.user_nombre,
        domicilios.domi_observacion
        FROM domicilios
        INNER JOIN barrios
        ON domicilios.barrio_id=barrios.barrio_id
        INNER JOIN transportadores
        ON domicilios.trans_id=transportadores.trans_id
        INNER JOIN users
        ON domicilios.user_id=users.user_id
        WHERE domi_id=$_GET[domi_id]
    ";
    $stmt = $pdo -> prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    break;

case 'modificar_domicilio':
    $sql = "UPDATE domicilios SET
        domi_id=$_POST[domi_id],
        barrio_id=$_POST[barrio_id],
        trans_id=$_POST[trans_id],
        domi_valor=$_POST[domi_valor],
        domi_hora_salida='$_POST[domi_hora_salida]',
        domi_hora_llegada='$_POST[domi_hora_llegada]',
        user_id=$_POST[user_id],
        domi_observacion=$_POST[domi_observacion]
    WHERE domi_id=$_GET[domi_id]";
    $response = $pdo->exec($sql);
    echo json_encode($response);
    break;
}
?>
