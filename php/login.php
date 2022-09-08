<?php
require_once('config.php');

// get authorization header variables from fetch request

$email = $_SERVER["PHP_AUTH_USER"];
$password = $_SERVER["PHP_AUTH_PW"];

// prepare pdo-statement

$stmt = $pdo->prepare("

SELECT ID, name, email, password FROM user WHERE email='$email';

");

// check if email exists in database

if ($stmt->execute()) {

    $resultateArray = $stmt->fetchAll();

    $anzahlResultate = count($resultateArray);

    if ($anzahlResultate == 1) {

        $dbPassword = $resultateArray[0]['password'];

        // if email exists, check that password exists
        checkPassword($password, $dbPassword, $resultateArray[0]);
    } else {

        $message = 'Diese E-Mail Adresse wurde nicht in der Datenbank gefunden.';
        sendResponse($message, 0 , 0);
    }
}

function checkPassword($password, $dbPassword, $userInfo)
{

    // check if passwords match

    $success = password_verify($password, $dbPassword);

    if ($success) {

        // print_r('Login erfolgreich.');
        createToken($userInfo, 0 , 0);
    } else {

        $message = 'Das Passwort ist falsch.';
        sendResponse($message, 0, 0);
    };
}


function createToken($userInfo)
{
    require('config.php');

    $userID = $userInfo['ID'];
    $token = generateRandomString(42);

    $stmt = $pdo->prepare("INSERT INTO session (user_ID, token) VALUES (:UserID, :Token)");

    $success = $stmt->execute(array('UserID' => $userID, 'Token' => $token));

    // falls success true bzw. 1 ist
    if ($success) {

        $message = "Login erfolgreich.";

        sendResponse($message, $userID, $token);
        
    } else {

        $message = "Es konnte kein Token erstellt werden";
        sendResponse($message, 0, 0);
    };
}

// send answer to frontend
function sendResponse($message, $userID, $token)
{

    $response = array($message, $userID, $token);

    $jsonResponse = json_encode($response);

    print_r($jsonResponse);
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
