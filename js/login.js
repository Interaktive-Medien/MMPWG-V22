let registrierButton = document.querySelector('#button-registrieren');

registrierButton.addEventListener('click', async (e) => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch("https://376009-17.web.fhgr.ch/php/login.php",
        {
            body: formData,
            method: "post",
        })

        .then((res) => {

            return res.json();

        })
        .then((data) => {

            // console.log(data);
            document.querySelector('#nachricht').innerHTML = data[0];

            // variable userid nennen, statt user
            localStorage.setItem("userID", data[1]);
            localStorage.setItem("token", data[2]);

            if (data[1] != 0 && data[2] != 0) {

                window.location = "https://376009-17.web.fhgr.ch/"

            }

        })

});