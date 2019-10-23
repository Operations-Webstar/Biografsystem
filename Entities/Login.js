
function checkLogin()
{
    let storedName = localStorage.getItem('firstName');
    let storedPassword = localStorage.getItem('password');

    let enteredName = document.getElementById('enteredFirstName');
    let enteredPassword = document.getElementById('enteredPassword');

    if (enteredName.value === storedName && enteredPassword.value === storedPassword) {
        localStorage.setItem('logInStatus', 'true');
        console.log(1)
        window.location.href = 'index.html';
        console.log(2)
    } else {
        alert('wrong pass or user');
    }
}

function signOut() {
    localStorage.setItem('logInStatus', 'false');
    localStorage.clear()
}
