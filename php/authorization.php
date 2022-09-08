<?php

deleteOldSessions();

$userid = $_SERVER["PHP_AUTH_USER"];
$token = $_SERVER["PHP_AUTH_PW"];

$stmt = $pdo->prepare("

SELECT ID 
FROM session 
WHERE user_ID='$userid' 
AND token='$token' 
AND timestamp > (NOW() - INTERVAL 2 HOUR);

");

if ($stmt->execute()) {

    $resultateArray = $stmt->fetchAll();

    $anzahlResultate = count($resultateArray);

    if ($anzahlResultate >= 1) {

        $id = $resultateArray[0]['ID'];

        updateTimestamp($id);
    } else {

        exit(http_response_code(401));
    }
}

function updateTimestamp($ID)
{
    // update this session with current timestamp

    require('config.php');

    $sql = "UPDATE session SET timestamp = now() WHERE ID=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$ID]);
}

function deleteOldSessions()
{

    require('config.php');

    $stmt = $pdo->prepare("

    DELETE 
    FROM session
    WHERE timestamp < (NOW() - INTERVAL 2 HOUR);

");

    $stmt->execute();
}
