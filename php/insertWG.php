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

$hashtags = json_decode($_POST['hashtags']);

// Füge zuerst in Tabelle WG ein

$stmt = $pdo->prepare("INSERT INTO wg (titel, bild, adresse, stadt, beschreibung, user, status) VALUES (:titel, :bild, :adresse, :stadt, :beschreibung, :user, :status)");

$success = $stmt->execute(array('titel' => $titel, 'bild' => $bild, 'adresse' => $adresse, 'stadt' => $stadt, 'beschreibung' => $beschreibung, 'user' => $userID, 'status' => $status));

// wenn erfolgreich ($success == true), füge Hashtags Relationstabelle ein
if ($success) {

    // und wenn überhaupt Hashtags angeklickt wurden
    if (sizeof($hashtags) > 0) {

        $letzteID = $pdo->lastInsertId();

        $stmt2 = $pdo->prepare("INSERT INTO wg_hat_hashtag (wg_id, hashtag_id) VALUES (:wg_id, :hashtag_id)");

        foreach ($hashtags as $hashtag) {

            $success2 = $stmt2->execute(array('wg_id' => $letzteID, 'hashtag_id' => $hashtag));
        }

        if ($success2) {

            print_r("Dein Inserat wurde erstellt.");
        } else {

            // gib die Fehlermeldung aus
            print_r($success2);
        }

    } else {

        print_r("Dein Inserat wurde ohne Hashtags erstellt.");
    }

} else {

    // gib die Fehlermeldung aus
    print_r($success);
};
