<?php

require_once('config.php');
require_once('authorization.php');

$userID = $_POST["userID"];

// prepare pdo-statement

$stmt = $pdo->prepare("

SELECT * FROM wg WHERE user ='$userID';

");

if ($stmt->execute()) {

    $resultateArray = $stmt->fetchAll();

    $jsonArray = json_encode($resultateArray);

    print_r($jsonArray);
}