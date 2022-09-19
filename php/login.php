<?php
// noch testen: require statt require once, damit in funktionen verfügbar?
require_once('config.php');

// get authorization header variables from fetch request

$email = $_SERVER["PHP_AUTH_USER"];
$password = $_SERVER["PHP_AUTH_PW"];

// prüfe, ob mit dieser E-Mail ein User registriert ist
$sql = "SELECT ID, name, email, password FROM user WHERE email='$email';";

$stmt = $pdo->prepare($sql);

// oder hier fetch statt execute?
$erfolg = $stmt->execute();

if ($erfolg) {
    
    // doppelt gemoppelt? noch testen
    $resultateArray = $stmt->fetchAll();

    $anzahlResultate = count($resultateArray);

    // nur wenn genau 1 user mit dieser email registriert ist, kann eingeloggt werden
    if ($anzahlResultate == 1) {

        // pw aus der db in variable schreiben
        $dbPasswort = $resultateArray[0]['password'];

        $userInfo = $resultateArray[0];

        // prüfe das passwort
        pruefePasswort($password, $dbPasswort, $userInfo);

    } else {

        $nachricht = 'Diese E-Mail Adresse wurde nicht in der Datenbank gefunden.';
        sendeAntwort($nachricht, 0 , 0);
    }
}

function pruefePasswort($password, $dbPassword, $userInfo)
{

    // prüfe, ob das eingegebene passwort und das passwort aus der Datenbank übereinstimmen

    $erfolg = password_verify($password, $dbPassword);

    if ($erfolg) {

        // wenn das passwort stimmt, erstelle einen token
        erstelleToken($userInfo, 0 , 0);

    } else {

        $nachricht = 'Das Passwort ist falsch.';
        sendeAntwort($nachricht, 0, 0);
    };
}


function erstelleToken($userInfo)
{
    require('config.php');

    $userID = $userInfo['ID'];
    $token = generateRandomString(42);

    $sql = "INSERT INTO session (user_ID, token) VALUES (:UserID, :Token)";

    $stmt = $pdo->prepare($sql);

    $erfolg = $stmt->execute(array('UserID' => $userID, 'Token' => $token));

    // falls erfolg true bzw. 1 ist
    if ($erfolg) {

        $nachricht = "Login erfolgreich.";

        sendeAntwort($nachricht, $userID, $token);
        
    } else {

        $nachricht = "Es konnte kein Token erstellt werden";
        sendeAntwort($nachricht, 0, 0);
    };
}

// send answer to frontend
function sendeAntwort($nachricht, $userID, $token)
{
    $antwort = array($nachricht, $userID, $token);

    $jsonAntwort = json_encode($antwort);

    print_r($jsonAntwort);
}

function generateRandomString($length)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
