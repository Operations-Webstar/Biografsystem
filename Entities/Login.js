
function checkLogin()
{
    let storedName = localStorage.getItem('firstName');
    let storedPassword = localStorage.getItem('password');

    let enteredName = document.getElementById('enteredFirstName');
    let enteredPassword = document.getElementById('enteredPassword');

    if (enteredName.value === storedName && enteredPassword.value === storedPassword) {
        localStorage.setItem('logInStatus', 'true')
        window.location.href (index.html)
    } else {
        alert('wrong pass or user')
    }
}

function signOut() {
    localStorage.setItem('logInStatus', 'false')
}
