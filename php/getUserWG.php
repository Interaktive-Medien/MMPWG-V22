<?php

require_once('config.php');
// require_once('authorization.php');

$userID = $_POST["userID"];
// $userID = 18;

// prepare pdo-statement

$stmt = $pdo->prepare("

SELECT * FROM wg WHERE user ='$userID';

");

if ($stmt->execute()) {

    $resultatInserat = $stmt->fetchAll();

}

$stmt = $pdo->prepare("

SELECT hashtag.ID, hashtag.hashtag FROM wg
JOIN wg_hat_hashtag junc ON wg.ID = junc.wg_id
JOIN hashtag ON junc.hashtag_id = hashtag.ID
WHERE user = '$userID';

");

if ($stmt->execute()) {

    $resultatHashtags = $stmt->fetchAll();

    // füge die Hashtags als zweiten Array im Array $resultatInserat an
    array_push($resultatInserat, $resultatHashtags);

    $resultatInserat = json_encode($resultatInserat);

    print_r($resultatInserat);

}