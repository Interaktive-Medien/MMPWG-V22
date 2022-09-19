<?php
require_once('config.php');
require_once('authorisieren.php');

$userID = $_POST["userID"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$beschreibung = $_POST["beschreibung"];
$stadt = $_POST["stadt"];
$status = $_POST["status"];
$bild = $_POST["bild"];

$hashtags = json_decode($_POST['hashtags']);

// Füge zuerst in Tabelle WG ein

$sql = "INSERT INTO wg (titel, bild, adresse, stadt, beschreibung, user, status) VALUES (:titel, :bild, :adresse, :stadt, :beschreibung, :user, :status)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('titel' => $titel, 'bild' => $bild, 'adresse' => $adresse, 'stadt' => $stadt, 'beschreibung' => $beschreibung, 'user' => $userID, 'status' => $status));

// wenn erfolgreich ($erfolg == true), füge Hashtags Relationstabelle ein
if ($erfolg) {

    $letzteID = $pdo->lastInsertId();

    insertHashtags($hashtags, $letzteID);

} else {

    // gib die Fehlermeldung aus
    print_r($erfolg);
};

function insertHashtags($hashtags, $letzteID)
{

    require('config.php');

    // und wenn überhaupt Hashtags angeklickt wurden
    if (sizeof($hashtags) > 0) {

        $sql = "INSERT INTO wg_hat_hashtag (wg_id, hashtag_id) VALUES (:wg_id, :hashtag_id)";

        $stmt = $pdo->prepare($sql);

        foreach ($hashtags as $hashtag) {

            $erfolg = $stmt->execute(array('wg_id' => $letzteID, 'hashtag_id' => $hashtag));
        }

        if ($erfolg) {

            print_r("Dein Inserat wurde erstellt.");
        } else {

            // gib die Fehlermeldung aus
            print_r($erfolg);
        }
    } else {

        print_r("Dein Inserat wurde ohne Hashtags erstellt.");
    }
}
