<?php

require_once('config.php');
require_once('authorisieren.php');

$userID = $_POST["userID"];

// prepare pdo-statement

$sql = "SELECT * FROM wg WHERE user ='$userID';";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $resultatInserat = $stmt->fetchAll();

    $resultatInserat = json_encode($resultatInserat);

    print_r($resultatInserat);

}