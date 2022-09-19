<?php

require_once('config.php');
require_once('authorization.php');

// prepare pdo-statement

$wgID = $_POST["wgID"];

$sql = "

SELECT h.ID, h.hashtag FROM hashtag h 
INNER JOIN wg_hat_hashtag junc ON h.ID = junc.hashtag_id
WHERE junc.wg_id = '$wgID';

";

$stmt = $pdo->prepare($sql);

$success = $stmt->execute();

if ($success) {

    $resultateArray = $stmt->fetchAll();

    $jsonArray = json_encode($resultateArray);

    print_r($jsonArray);
}