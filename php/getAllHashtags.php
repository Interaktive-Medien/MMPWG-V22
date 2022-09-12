<?php

require_once('config.php');
require_once('authorization.php');

// prepare pdo-statement

$stmt = $pdo->prepare("

SELECT * FROM hashtag;

");

if ($stmt->execute()) {

    $resultateArray = $stmt->fetchAll();

    $jsonArray = json_encode($resultateArray);

    print_r($jsonArray);
}