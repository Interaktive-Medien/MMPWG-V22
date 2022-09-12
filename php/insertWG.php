<?php
require_once('config.php');
require_once('authorization.php');

$userID = $_POST["userID"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$beschreibung = $_POST["beschreibung"];
$stadt = $_POST["stadt"];
$status = $_POST["status"];

$bild = 'https://www.google.ch';


$stmt = $pdo->prepare("INSERT INTO wg (titel, bild, adresse, stadt, beschreibung, user, status) VALUES (:titel, :bild, :adresse, :stadt, :beschreibung, :user, :status)");

$success = $stmt->execute(array('titel' => $titel, 'bild' => $bild, 'adresse' => $adresse, 'stadt' => $stadt, 'beschreibung' => $beschreibung, 'user' => $userID, 'status' => $status ));

// falls success true bzw. 1 ist
if ($success){

    print_r('Veröffentlichung erfolgreich.');

} else {

    print_r($success);

};