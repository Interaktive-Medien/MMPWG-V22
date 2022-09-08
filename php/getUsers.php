<?php

require_once('config.php');

$stmt = $pdo->prepare("

SELECT name, email FROM user;

");

if ($stmt->execute()) {

  $array = $stmt->fetchAll();

  $jsonArray = json_encode($array);

  print_r($jsonArray);

}
