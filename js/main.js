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
                window.location="/login.html"

            }

        })
        .then((data) => {

            console.log(data);

            zeichneWGs(data);

        })
}

function zeichneWGs(data) {

    data.forEach(element => {

        const child = document.createElement("div");
        child.innerHTML =

            '<div class="wg">' +
            '<h2>' + element.titel + '</h2>' +
            '<img class="wg-image" src="images/' + element.bild + '">' +
            '<p>' + element.beschreibung + '</p>' +
            '<a href="maps.google.com">' + element.adresse + '</a>'
            + '</div>';


        document.getElementById("liste-wg").appendChild(child);

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
                window.location="/login.html"

            }

        })
        .then((data) => {

            console.log(data);

            document.getElementById("userName").innerHTML = data;

        })
}




// Eventlistener Functions

function logout() {

    localStorage.clear();

    window.location="/login.html";

}