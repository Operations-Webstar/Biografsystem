// til login pagen
/*eslint-env browser*/

function checkLogin()
{
    let logInStatus = false;
    let enteredName = document.getElementById('enteredFirstName').value.toString();
    let enteredPassword = document.getElementById('enteredPassword').value;
    let storedUsers = JSON.parse(localStorage.getItem('users'));
    for(let i=0; i<storedUsers.length;i++){
        if (enteredName == storedUsers[i].tlfNumber && enteredPassword == storedUsers[i].password){
            localStorage.setItem('logInStatus', 'true');
            window.location.href = 'index.html';
            logInStatus = true;
            break;
        }
    }
    if(logInStatus == false){
        alert('wrong user or pass')
    }
}



function signOut() {
    localStorage.setItem('logInStatus', 'false');
}

function clearStorage(){
    localStorage.clear()
}
// til når man er logget ind
console.log(localStorage.getItem('logInStatus'))
if(localStorage.getItem('logInStatus') == 'true'){

    document.getElementById("log").style.display = "none";
    document.getElementById("log1").style.display = "none";
} else if(localStorage.getItem('logInStatus') == 'false'){
    document.getElementById('log2').style.display  = "none";
}