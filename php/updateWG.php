<?php
require_once('config.php');
require_once('authorization.php');

$userID = $_POST["userID"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$beschreibung = $_POST["beschreibung"];
$stadt = $_POST["stadt"];
$status = $_POST["status"];

$bild = $_POST["bild"];


$sql = "UPDATE wg SET titel=?, bild=?, adresse=?, stadt=?, beschreibung=?, status=? WHERE user=?";
$stmt= $pdo->prepare($sql);

$success = $stmt->execute([$titel, $bild, $adresse, $stadt, $beschreibung, $status, $userID]);

// falls success true bzw. 1 ist
if ($success){

    print_r('Erfolgreich aktualisiert.');

} else {

    print_r($success);

};