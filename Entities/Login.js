
function checkLogin()
{
    let enteredName = document.getElementById('enteredFirstName').value.toString();
    let enteredPassword = document.getElementById('enteredPassword').value;
    let storedUsers = JSON.parse(localStorage.getItem('users'));
    for(let i=0; i<storedUsers.length;i++){
        if (enteredName == storedUsers[i].tlfNumber && enteredPassword == storedUsers[i].password){
            localStorage.setItem('logInStatus', 'true');
            window.location.href = 'index.html';
        }
         else {
            alert('wrong pass or user');
        }
    }
}

function signOut() {
    localStorage.clear();
}
