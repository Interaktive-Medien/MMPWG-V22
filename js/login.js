const registrierButton = document.querySelector('#button-registrieren');

registrierButton.addEventListener('click', async (e) => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch("https://376009-17.web.fhgr.ch/php/login.php",
        {

            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(email + ':' + password),

            }
        })

        .then((res) => {

            return res.json();

        })
        .then((data) => {

            console.log(data);
            document.querySelector('#nachricht').innerHTML = data[0];

            localStorage.setItem("user", data[1]);
            localStorage.setItem("token", data[2]);

        })

});

// registrierButton.addEventListener('click', async (e) => {
//     e.preventDefault();

//     let formData = new FormData();
//     formData.append('username', 'nick');
//     formData.append('password', 'password');

//     fetch("https://376009-17.web.fhgr.ch/php/login.php",
//         {
//             body: formData,
//             method: "post",
//             headers: {

//                 'Authorization': 'Basic ' + btoa('login:password'),
//                 'CustomHeader': 'mycustomheader',

//             }
//         })

//         .then((res) => {

//             return res.text();

//         })
//         .then((data) => {

//             console.log(data)

//         })

// });