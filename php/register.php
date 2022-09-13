<?php
require_once('config.php');

$username = $_POST["username"];

// damit basic-auth funktioniert, muss in .htaccess folgende zeile sein:
// RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

$email = $_SERVER["PHP_AUTH_USER"];
$password = $_SERVER["PHP_AUTH_PW"];

// echo $_SERVER['HTTP_CUSTOMHEADER'];

if (existiertEmail($email)) {

    // verschlüssle das passwort
    $password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO user (name, email, password) VALUES (:Name, :Email, :Password)";

    $stmt = $pdo->prepare($sql);

    $erfolg = $stmt->execute(array('Name' => $username, 'Email' => $email, 'Password' => $password));

    // falls erfolg true bzw. 1 ist
    if ($erfolg) {

        print_r('Registrierung erfolgreich.');

    } else {

        print_r($erfolg);
    };

} else {

    print_r('Fehler: Diese E-Mail Adresse wurde wurde bereits registriert.');

};

function existiertEmail($email)
{
    require('config.php');

    $sql = "SELECT * FROM user WHERE email='$email';";
    
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute()) {

        $resultateArray = $stmt->fetchAll();

        if (sizeof($resultateArray) == 0) {

            return true;
        } else {

            return false;
        }
    }
}
