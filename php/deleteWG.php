<?php
require_once('config.php');
require_once('authorization.php');

$userID = $_POST["userID"];
$wgID = $_POST["wgID"];

$sql = "DELETE FROM wg WHERE user = ?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$userID]);

// falls erfolg true bzw. 1 ist
// lösche ebenfalls die Hashtags zur WG
if ($erfolg) {

    $sql = "DELETE FROM wg_hat_hashtag WHERE wg_id = ?";
    $stmt = $pdo->prepare($sql);

    $erfolg = $stmt->execute([$wgID]);

    if ($erfolg){

        print_r('WG erfolgreich gelöscht.');

    } else {

        print_r($erfolg);

    }

} else {

    print_r($erfolg);
};
