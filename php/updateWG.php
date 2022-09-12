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

$wgID = $_POST["wgID"];

$hashtags = json_decode($_POST['hashtags']);

$sql = "UPDATE wg SET titel=?, bild=?, adresse=?, stadt=?, beschreibung=?, status=? WHERE user=?";
$stmt = $pdo->prepare($sql);

$success = $stmt->execute([$titel, $bild, $adresse, $stadt, $beschreibung, $status, $userID]);

// falls success true bzw. 1 ist
if ($success) {

    // lösche die alten hashtags
    $sql = "DELETE FROM wg_hat_hashtag WHERE wg_id = ?";
    $stmt = $pdo->prepare($sql);

    $success = $stmt->execute([$wgID]);

    // füge die neuen hashtags ein, wenn überhaupt hashtags angeklickt wurden
    if (sizeof($hashtags) > 0) {

        $stmt = $pdo->prepare("INSERT INTO wg_hat_hashtag (wg_id, hashtag_id) VALUES (:wg_id, :hashtag_id)");

        foreach ($hashtags as $hashtag) {

            $success = $stmt->execute(array('wg_id' => $wgID, 'hashtag_id' => $hashtag));
        }

        if ($success) {

            print_r("Dein Inserat wurde aktualisiert.");
        } else {

            // gib die Fehlermeldung aus
            print_r($success);
        }
    } else {

        print_r("Dein Inserat wurde ohne Hashtags aktualisiert.");
    }
} else {

    print_r($success);
};
