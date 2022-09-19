
// zeige alle WGs an
holeWGs();

// zeige eingeloggten Username an
holeUser();

function holeWGs() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    fetch("https://376009-17.web.fhgr.ch/php/holeWGs.php",
        {
            body: '',
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

            // return data;
            WGsAnzeigen(data);

        })
}

function WGsAnzeigen(data) {

    data.forEach(wg => {

        // status-emoji erstellen, ggf. in Funktion auslagern
        if (parseInt(wg.status)){

            wg.status = '🟢';

        } else {

            wg.status = "🔴"

        }

        // evtl vereinfachen?
        let wgContainer = document.createElement("div");
        wgContainer.innerHTML =

            '<div class="wg">' +
            '<h2>' + wg.status + ' ' + wg.titel + '</h2>' +
            '<img class="wg-image" src="' + wg.bild + '">' +
            '<p>' + wg.beschreibung + '</p>' +
            '📍 <a target="_blank" href="https://www.google.com/maps/search/?api=1&query='+ wg.adresse + '">' + wg.adresse + '</a> <br>' +
            '👉 <a target="_blank" href="https://www.google.com/maps/search/?api=1&query='+ wg.adresse + '">' + wg.email + '</a>' +
            '<p> <b> <span id="WG-' + wg.ID + '">  </span> <b> </p>'
            + '</div>';

        document.getElementById("liste-wg").appendChild(wgContainer);

        holeHashtagsVonWG(wg.ID);

    });

}

function holeUser() {

    // get authentication variables from localstorage
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', userID);

    fetch("https://376009-17.web.fhgr.ch/php/holeUser.php",
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

            document.getElementById("userName").innerHTML = data;

        })
}

// hole die Hashtags aus der Relationstabelle für jede WG in der Übersicht
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

            if (data.length > 0){

            data.forEach(element => {

                // füge die Hashtags ins Dokument ein 
               // (hook: ID, welche in der Funktion WGsAnzeigen dynamisch vergeben wird)
                document.getElementById("WG-" + id).innerHTML += '#' + element.hashtag + ' ';

            });

        }

        })

}

function logout() {

    localStorage.clear();

    window.location = "/login.html";

}