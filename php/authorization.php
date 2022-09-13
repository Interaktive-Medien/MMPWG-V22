<?php

loescheAlteSessions();

$userid = $_SERVER["PHP_AUTH_USER"];
$token = $_SERVER["PHP_AUTH_PW"];

$sql = "

SELECT ID 
FROM session 
WHERE user_ID='$userid' 
AND token='$token' 
AND timestamp > (NOW() - INTERVAL 2 HOUR);";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $resultateArray = $stmt->fetchAll();

    $anzahlResultate = count($resultateArray);

    if ($anzahlResultate >= 1) {

        $id = $resultateArray[0]['ID'];

        aktualisiereTimestamp($id);

    } else {

        // sende einen http Fehler ans Frontend, exit Skript
        exit(http_response_code(401));
    }
}

function aktualisiereTimestamp($ID)
{
    // update this session with current timestamp

    require('config.php');

    $sql = "UPDATE session SET timestamp = now() WHERE ID=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$ID]);
}

function loescheAlteSessions()
{
    require('config.php');

    $sql = "
    DELETE 
    FROM session
    WHERE timestamp < (NOW() - INTERVAL 2 HOUR);";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
}
