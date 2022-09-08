<?php

require_once('config.php');
require_once('authorization.php');

$stmt = $pdo->prepare("

SELECT WG.ID, WG.titel, WG.bild, WG.adresse, ST.stadt, WG.beschreibung, U.name, U.email, WG.status, WG.timestamp
FROM wg WG
INNER JOIN user U
ON WG.user = U.ID
INNER JOIN stadt ST
ON WG.stadt = ST.ID
ORDER BY WG.timestamp DESC;

");

if ($stmt->execute()) {

  $array = $stmt->fetchAll();

  $jsonArray = json_encode($array);

  print_r($jsonArray);

}
