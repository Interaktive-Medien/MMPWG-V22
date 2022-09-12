<?php

require_once('config.php');
require_once('authorization.php');

$userID = $_POST["userID"];

// prepare pdo-statement

$stmt = $pdo->prepare("

SELECT name FROM user WHERE ID='$userID';

");

if ($stmt->execute()) {

    $resultateArray = $stmt->fetchAll();

    $jsonArray = json_encode($resultateArray[0]["name"]);

    print_r($jsonArray);
}