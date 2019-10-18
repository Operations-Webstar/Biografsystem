
checkLogin()
{
    let storedName = localStorage.getItem('firstName');
    let storedPassword = localStorage.getItem('password');

    let enteredName = document.getElementById('enteredFirstName');
    let enteredPassword = document.getElementById('enteredPassword');

    if (enteredName.value === storedName && enteredPassword === storedPassword) {
        alert('Logged in')
    } else {
        alert('wrong pass or user')
    }
}