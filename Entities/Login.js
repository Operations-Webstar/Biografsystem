// til login pagen
/*eslint-env browser*/
//laver funktion til at tjekke login
function checkLogin() {
    //laver de forskellige variabler, som skal bruges i forbundelse med funktionen
    let logInStatus = false;
    let enteredName = document.getElementById('enteredFirstName').value.toString();
    let enteredPassword = document.getElementById('enteredPassword').value;
    //Henter localstorage med JSON.parse, så jeg får objekterne ned i mit Script igen
    let storedUsers = JSON.parse(localStorage.getItem('users'));
    // sætter et for loop igang, som kører igennem storedUsers arrayet, indtil den finder et match
    // når den finder match så sætter den login status til true, og sender en til index.html
    // sætter også javascript variablen til true, så næste if kan virke korrekt.
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
//simpel logud funktion, som sætter lokalStorage logInStatus keyen til false
function signOut() {
    localStorage.setItem('logInStatus', 'false');
}

//clear lokalstorage så den bliver tom
function clearStorage(){
    localStorage.clear()
}
// En if statement, der viser de rigtige knapper, i forhold til logInStatusen som er under lokalStorage
if(localStorage.getItem('logInStatus') == 'true'){
    document.getElementById("log").style.display = "none";
    document.getElementById("log1").style.display = "none";
} else if(localStorage.getItem('logInStatus') == 'false'|| localStorage.getItem('logInStatus') == null){
    document.getElementById('log2').style.display  = "none";
}