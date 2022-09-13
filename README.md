# MMPWG-V22
 Eine WG-Sharing Plattform für die Interaktiven Medien 3

 ## Live-Beispiel

[https://376009-17.web.fhgr.ch/](https://376009-17.web.fhgr.ch/)

## Installation auf eigenem Webserver

1) Bennenne die Datei config_leer.php in config.php um.
2) Gib in config.php die Verbindungsdaten zu deiner Datenbank ein.
3) Lade database.sql in phpmyadmin hoch.
4) Lade alle Dateien auf den Webserver
5) Stelle sicher, dass sich die .htaccess Datei auf deinem Webserver im Root-Folder befindet. Diese wird für den Authorization-Header gebraucht.

## Fehlende Features

- Formularvalidierung
- Dropdown Stadt und Tabelle Stadt ggf. entfernen, da Doppelspurigkeit mit Hashtags