getWGs();
getUser();

function getWGs() {

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    fetch("https://376009-17.web.fhgr.ch/php/getWGs.php",
        {
            body: '',
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

            zeichneWGs(data);

        })
}

function zeichneWGs(data) {

    data.forEach(element => {

        const child = document.createElement("div");
        child.innerHTML =

            '<div class="wg">' +
            '<h2>' + element.titel + '</h2>' +
            '<img class="wg-image" src="' + element.bild + '">' +
            '<p>' + element.beschreibung + '</p>' +
            '<a href="maps.google.com">' + element.adresse + '</a>' +
            '<p> <span id="WG-' + element.ID + '">  </span> </p>'
            + '</div>';


        document.getElementById("liste-wg").appendChild(child);

        getWgHashtags(element.ID);

    });

}

function getUser() {

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('userID', user);

    fetch("https://376009-17.web.fhgr.ch/php/getUser.php",
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

            document.getElementById("userName").innerHTML = data;

        })
}

function getWgHashtags(id) {

    // get authentication variables from localstorage
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    let formData = new FormData();
    formData.append('wgID', id);

    fetch("https://376009-17.web.fhgr.ch/php/getWgHashtags.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(user + ':' + token),

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

            console.log(id);

            console.log(data);

            if (data.length > 0){

            data.forEach(element => {

                document.getElementById("WG-" + id).innerHTML += '#' + element.hashtag + ' ';

            });

        }

        })

}


// Eventlistener Functions

function logout() {

    localStorage.clear();

    window.location = "/login.html";

}