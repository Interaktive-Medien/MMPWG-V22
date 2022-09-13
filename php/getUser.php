<?php

require_once('config.php');
require_once('authorization.php');

$userID = $_POST["userID"];

// prepare pdo-statement

$sql = "SELECT name FROM user WHERE ID='$userID';";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $resultateArray = $stmt->fetchAll();

    $jsonArray = json_encode($resultateArray[0]["name"]);

    print_r($jsonArray);
}