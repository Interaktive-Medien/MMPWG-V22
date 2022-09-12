<?php

require_once('config.php');
require_once('authorization.php');

$userID = $_POST["userID"];

// prepare pdo-statement

$stmt = $pdo->prepare("

SELECT * FROM wg WHERE user ='$userID';

");

if ($stmt->execute()) {

    $resultatInserat = $stmt->fetchAll();

    $resultatInserat = json_encode($resultatInserat);

    print_r($resultatInserat);

}