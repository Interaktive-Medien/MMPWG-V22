<?php
require_once('config.php');
require_once('authorization.php');

$userID = $_POST["userID"];

$sql = "DELETE FROM wg WHERE user = ?";
$stmt= $pdo->prepare($sql);

$success = $stmt->execute([$userID]);

// falls success true bzw. 1 ist
if ($success){

    print_r('WG erfolgreich gelöscht.');

} else {

    print_r($success);

};