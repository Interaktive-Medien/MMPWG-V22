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

$erfolg = $stmt->execute([$titel, $bild, $adresse, $stadt, $beschreibung, $status, $userID]);

// falls erfolg true bzw. 1 ist
if ($erfolg) {

    loescheAlteHashtags($wgID);

    insertNeueHashtags($hashtags, $wgID);

} else {

    print_r($erfolg);

};

function loescheAlteHashtags($wgID){

        require('config.php');

        // lösche die alten hashtags
        $sql = "DELETE FROM wg_hat_hashtag WHERE wg_id = ?";
        $stmt = $pdo->prepare($sql);
    
        $stmt->execute([$wgID]);

}

function insertNeueHashtags($hashtags, $wgID){

    require('config.php');

    // füge die neuen hashtags ein, wenn überhaupt hashtags angeklickt wurden
    if (sizeof($hashtags) > 0) {

        $sql = "INSERT INTO wg_hat_hashtag (wg_id, hashtag_id) VALUES (:wg_id, :hashtag_id)";
        $stmt = $pdo->prepare($sql);

        foreach ($hashtags as $hashtag) {

            $erfolg = $stmt->execute(array('wg_id' => $wgID, 'hashtag_id' => $hashtag));
        }

        if ($erfolg) {

            print_r("Dein Inserat wurde aktualisiert.");

        } else {

            // gib die Fehlermeldung aus
            print_r($erfolg);
        }
        
    } else {

        print_r("Dein Inserat wurde ohne Hashtags aktualisiert.");
    }

}