// globaler array hashtags
var hashtags = [];

// globale Variable wgID
var wgID = "";

//lade alle verfügbaren Hashtags aus der DB fürs Formular
holeAlleHashtags();

// lade die WG des eingeloggten Users
holeUserWG();

function holeUserWG() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://376009-17.web.fhgr.ch/php/holeUserWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // falls es noch keine WG zu diesem User gibt
            // falls es noch keine WG zu diesem User gibt
            // falls es noch keine WG zu diesem User gibt
            if (data.length == 0) {

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um deine WG aufzuschalten:"

                // zeige den korrekten Button an
                document.querySelector('#button-neue').classList.remove("hidden");

                // falls es bereits eine WG zu diesem User gibt
                // falls es bereits eine WG zu diesem User gibt
                // falls es bereits eine WG zu diesem User gibt
            } else {

                // speichere die wg ID in der globalen variable
                // diese brauchen wir später zum aktualisieren und löschen der WG
                wgID = data[0].ID;

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Hier kannst du deine WG bearbeiten:"

                // zeige den korrekten Button an
                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");

                // fülle das Formular mit den Werten aus der DB aus
                document.querySelector('#titel').value = data[0].titel;
                document.querySelector('#adresse').value = data[0].adresse;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#stadt').value = data[0].stadt;
                document.querySelector('#bild').value = data[0].bild;
                document.querySelector('#bild-vorschau').src = data[0].bild;

                // setze den korrekten Status (Radiobutton) aus den Infos der DB
                if (data[0].status == 1) {

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-besetzt').checked = true;

                }

                // färbe die Hashtags dieser WG korrekt ein
                holeHashtagsVonWG(wgID);

            }
        })
}

// wird mit onclick Event aus HTML getriggert
function neueWG() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    // Formulardaten in Body übertragen
    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let stadt = document.querySelector('#stadt').value;
    let bild = document.querySelector('#bild').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let jsonHashtags = JSON.stringify(hashtags)

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);
    formData.append('bild', bild);

    formData.append('hashtags', jsonHashtags);

    fetch("https://376009-17.web.fhgr.ch/php/neueWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // zeige die Nachricht an
            document.querySelector('#nachricht').innerHTML = data;

            // aktualisiere Buttons
            document.querySelector('#button-neue').classList.add("hidden");
            document.querySelector('#button-aktualisieren').classList.remove("hidden");
            document.querySelector('#button-loeschen').classList.remove("hidden");

        })



}

// wird mit onclick Event aus HTML getriggert
function aktualisiereWG() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    // Formulardaten in Body übertragen
    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let stadt = document.querySelector('#stadt').value;
    let bild = document.querySelector('#bild').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let jsonHashtags = JSON.stringify(hashtags)

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);
    formData.append('bild', bild);
    formData.append('hashtags', jsonHashtags);

    formData.append('wgID', wgID);

    fetch("https://376009-17.web.fhgr.ch/php/aktualisiereWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            // zeige die Nachricht an
            document.querySelector('#nachricht').innerHTML = data;

        })
}

// wird mit onclick Event aus HTML getriggert
function loescheWG() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('wgID', wgID);

    fetch("https://376009-17.web.fhgr.ch/php/loescheWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            console.log(data);
            document.querySelector('#nachricht').innerHTML = data;

            // button aktualisieren
            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");

            // Formularfelder leeren
            document.querySelector('#titel').value = "";
            document.querySelector('#adresse').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#stadt').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;

            document.querySelector('#bild-vorschau').src = "";

            document.querySelector('.hashtag').style = "Color: black;"

            // Variablen leeren
            hashtags = [];
            wgID = "";



        })
};

// Hashtags
// Hashtags
// Hashtags
// Hashtags
// Hashtags
// Hashtags
// Hashtags
// Hashtags
// Hashtags
// Hashtags

// lade alle Hashtags aus der Datenbank
function holeAlleHashtags() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    fetch("https://376009-17.web.fhgr.ch/php/holeAlleHashtags.php",
        {
            body: "",
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            data.forEach(hashtag => {

                // schreibe Hashtags ins HTML
                let dieserHashtag = document.createElement("div");

                dieserHashtag.innerHTML = " <p onclick='addHashtag(" + hashtag.ID + ")' id='" + hashtag.ID + "' class='hashtag'> #" + hashtag.hashtag + "</p> ";

                dieserHashtag.style = 'margin-right: 10px; cursor: pointer;';
                document.getElementById("hashtags").appendChild(dieserHashtag);

            });

        })
}

// beim Klick auf einen Hashtag wird dessen ID dem globalen Hashtag-Array hinzugefügt
function addHashtag(id) {

    // Prüfe, ob hashtag bereits im Array ist 
    if (hashtags.indexOf(id) == -1) {

        document.getElementById(id).style = "Color: blue;"

        hashtags.push(id);

    } else {

        document.getElementById(id).style = "Color: black;"

        hashtags.splice(hashtags.indexOf(id), 1);

    }

}

// lade die ausgewählten (selected) Hashtags zu dieser WG
function holeHashtagsVonWG(id) {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('wgID', id);

    fetch("https://376009-17.web.fhgr.ch/php/holeHashtagsVonWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            // error handling if session is expired
            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html"

            }

        })
        .then((data) => {

            if (data) {

                data.forEach(hashtag => {

                    // färbe die hashtags ein
                    document.getElementById(hashtag.ID).style = "color: Blue;";

                    // pushe die hashtags in die globale variable
                    hashtags.push(parseInt(hashtag.ID));

                });

            }

        })

}

function logout() {

    localStorage.clear();

    window.location = "/login.html";

}