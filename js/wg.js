// globaler array hashtags
var hashtags = [];
var wgID = "";

// muss mit der Funktion getHashtags beginnen, da sonst die Hashtags nicht eingefärbt werden können
// fix this
getHashtags();

function getUserWG() {

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', user);

    fetch("https://376009-17.web.fhgr.ch/php/getUserWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(user + ':' + token),
                // 'CustomHeader' : 'hallo'
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

            console.log(data.length);

            // falls es noch keine WG zu diesem User gibt
            if (data.length == 1) {

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Fülle dieses Formular aus, um deine WG aufzuschalten:"

                // zeige den korrekten Button an
                document.querySelector('#button-insert').classList.remove("hidden");

                // falls es bereits eine WG zu diesem User gibt
            } else {

                // zeige Infotext an
                document.querySelector('#infoText').innerHTML = "Hier kannst du deine WG bearbeiten:"

                // fülle das Formular mit den Werten aus der DB aus
                document.querySelector('#titel').value = data[0].titel;
                document.querySelector('#adresse').value = data[0].adresse;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#stadt').value = data[0].stadt;
                document.querySelector('#bild').value = data[0].bild;

                document.querySelector('#bild-vorschau').src = data[0].bild;

                // speichere die wg ID in der globalen variable
                // diese brauchen wir später zum aktualisieren und löschen der WG
                wgID = data[0].ID;

                // setze den korrekten Status

                if (data[0].status == 1) {

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-besetzt').checked = true;

                }

                // hashtags korrekt einfärben, aber nur falls diese existieren
                if (data[1]) {

                    let hashtagArray = data[1];
                    // console.log(data[1][0].ID);

                    hashtagArray.forEach(hashtag => {

                        // färbe die hashtags ein
                        document.getElementById(hashtag.ID).style = "color: Blue;";

                        // pushe die hashtags in die globale variable
                        hashtags.push(parseInt(hashtag.ID));

                    });

                }

                // zeige den korrekten Button an
                document.querySelector('#button-update').classList.remove("hidden");
                document.querySelector('#button-delete').classList.remove("hidden");

            }
        })
}

function insertWG() {

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let stadt = document.querySelector('#stadt').value;
    let bild = document.querySelector('#bild').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let jsonHashtags = JSON.stringify(hashtags)

    let formData = new FormData();
    formData.append('userID', user);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);
    formData.append('bild', bild);

    formData.append('hashtags', jsonHashtags);

    fetch("https://376009-17.web.fhgr.ch/php/insertWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(user + ':' + token),
                // 'CustomHeader' : 'hallo'
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

            // aktualisiere buttons
            document.querySelector('#button-insert').classList.add("hidden");
            document.querySelector('#button-update').classList.remove("hidden");
            document.querySelector('#button-delete').classList.remove("hidden");

        })



}


function updateWG() {

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let stadt = document.querySelector('#stadt').value;
    let bild = document.querySelector('#bild').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let jsonHashtags = JSON.stringify(hashtags)

    let formData = new FormData();
    formData.append('userID', user);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);
    formData.append('bild', bild);
    formData.append('hashtags', jsonHashtags);

    formData.append('wgID', wgID);


    fetch("https://376009-17.web.fhgr.ch/php/updateWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(user + ':' + token),
                // 'CustomHeader' : 'hallo'
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

        })



}


function deleteWG() {

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', user);
    formData.append('wgID', wgID);

    fetch("https://376009-17.web.fhgr.ch/php/deleteWG.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(user + ':' + token),
                // 'CustomHeader' : 'hallo'
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
            document.querySelector('#button-insert').classList.remove("hidden");
            document.querySelector('#button-update').classList.add("hidden");
            document.querySelector('#button-delete').classList.add("hidden");

            // felder leeren
            document.querySelector('#titel').value = "";
            document.querySelector('#adresse').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#stadt').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;

            document.querySelector('#bild-vorschau').src = "";

            document.querySelector('.hashtag').style = "Color: black;"

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

function getHashtags() {

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    fetch("https://376009-17.web.fhgr.ch/php/getHashtags.php",
        {
            body: "",
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(user + ':' + token),
                // 'CustomHeader' : 'hallo'
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

                // console.log(hashtag);

                let dieserHashtag = document.createElement("div");

                dieserHashtag.innerHTML = " <p onclick='addHashtag(" + hashtag.ID + ")' id='" + hashtag.ID + "' class='hashtag'> #" + hashtag.hashtag + "</p> ";

                dieserHashtag.style = 'margin-right: 10px; cursor: pointer;';
                document.getElementById("hashtags").appendChild(dieserHashtag);

            });

            // spaghetti-code!!
            // hier irgendwie promise returnen und erst dann getUserWG abrufen?

            getUserWG();

        })
}

function addHashtag(id) {

    if (hashtags.indexOf(id) == -1) {

        document.getElementById(id).style = "Color: blue;"

        hashtags.push(id);

    } else {

        document.getElementById(id).style = "Color: black;"

        hashtags.splice(hashtags.indexOf(id), 1);

    }

}