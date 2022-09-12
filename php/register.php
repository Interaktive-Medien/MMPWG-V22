<?php
require_once('config.php');

$username = $_POST["username"];

// damit basic-auth funktioniert, muss in .htaccess folgende zeile sein:
// RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

$email = $_SERVER["PHP_AUTH_USER"];
$password = $_SERVER["PHP_AUTH_PW"];

// echo $_SERVER['HTTP_CUSTOMHEADER'];

// verschlüssle das passwort
$password = password_hash ($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO user (name, email, password) VALUES (:Name, :Email, :Password)");

$success = $stmt->execute(array('Name' => $username, 'Email' => $email, 'Password' => $password));

// falls success true bzw. 1 ist
if ($success){

    print_r('Registrierung erfolgreich.');

} else {

    print_r($success);

};