getWGs();

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

                alert('SESSION EXPIRED');
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

