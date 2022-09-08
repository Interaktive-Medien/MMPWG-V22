const registrierButton = document.querySelector('#button-registrieren');

registrierButton.addEventListener('click', async (e) => {
    e.preventDefault();

    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let email = document.querySelector('#email').value;

    let formData = new FormData();
    formData.append('email', email);

    fetch("https://376009-17.web.fhgr.ch/php/register.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(username + ':' + password),
                // 'CustomHeader' : 'hallo'
            }
        })

        .then((res) => {

            return res.text();

        })
        .then((data) => {

            console.log(data);
            document.querySelector('#nachricht').innerHTML = data;

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