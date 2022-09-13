<?php

require_once('config.php');
require_once('authorization.php');

// prepare pdo-statement

$sql = "SELECT * FROM hashtag;";
$stmt = $pdo->prepare($sql);

$success = $stmt->execute();

if ($success) {

    $resultateArray = $stmt->fetchAll();

    $jsonArray = json_encode($resultateArray);

    print_r($jsonArray);

} else {

    print_r("Hashtags können nicht geladen werden.");
}