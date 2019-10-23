
function checkLogin()
{

    let enteredName = document.getElementById('enteredFirstName');
    let enteredPassword = document.getElementById('enteredPassword');
    storedUsers = JSON.parse(localStorage.getItem('users'))
    console.log(storedUsers)
    debugger
    for(let i=0; i>storedUsers.length;i++){
        if (enteredName == storedUsers[i].tlfNumber && enteredPassword == storedUsers[i].password) {
            localStorage.setItem('logInStatus', 'true');
            console.log(1)
            debugger
            window.location.href = 'index.html';
            console.log(2)
            debugger
        } else {
            alert('wrong pass or user');
        }
    }


}

function signOut() {
    localStorage.clear();
}
