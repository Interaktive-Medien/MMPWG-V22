<?php

$host = "localhost";
$user = "benutzername";
$password = "passwort";
$dbname = "datenbank-name";

$con = mysqli_connect($host, $user, $password,$dbname);

$pdo = new PDO('mysql:host='. $host . '; dbname=' . $dbname . ';charset=utf8', $user, $password);
$pdo->exec("set names utf8");

$method = $_SERVER['REQUEST_METHOD'];

if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}