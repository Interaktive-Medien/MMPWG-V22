let registrierButton = document.querySelector('#button-registrieren');

registrierButton.addEventListener('click', async (e) => {
    e.preventDefault();

    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let email = document.querySelector('#email').value;

    let formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    fetch("https://376009-17.web.fhgr.ch/php/registrieren.php",
        {
            body: formData,
            method: "post",
        })

        .then((res) => {

            return res.text();

        })
        .then((data) => {

        document.querySelector('#nachricht').innerHTML = data;

        })

});