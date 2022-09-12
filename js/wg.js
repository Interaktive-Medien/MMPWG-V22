getUserWG()

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
                window.location="/login.html"

            }

        })
        .then((data) => {

            // falls es noch keine WG zu diesem User gibt
            if(data.length == 0){

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

                // setze den korrekten Status
                if (data[0].status){

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-frei').besetzt = true;

                }

                // zeige den korrekten Button an
                document.querySelector('#button-update').classList.remove("hidden");
                document.querySelector('#button-delete').classList.remove("hidden");
                
            }

            console.log(data);



        })
}

function insertWG(){

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let stadt = document.querySelector('#stadt').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let formData = new FormData(); 
    formData.append('userID', user);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);

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
                window.location="/login.html"

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


function updateWG(){

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let stadt = document.querySelector('#stadt').value;
    let status = document.querySelector('input[name="status"]:checked').value;

    let formData = new FormData(); 
    formData.append('userID', user);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);

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
                window.location="/login.html"

            }

        })
        .then((data) => {

            console.log(data);
            document.querySelector('#nachricht').innerHTML = data;

        })



}


function deleteWG(){

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let formData = new FormData(); 
    formData.append('userID', user);

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
                window.location="/login.html"

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
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;

        })
}