// til login pagen
/*eslint-env browser*/
//laver funktion til at tjekke login
/*function checkLogin() {
    //laver de forskellige variabler(som hentes fra HTML), som skal bruges i forbundelse med funktionen
    let enteredName = document.getElementById('enteredFirstName').value.toString();
    let enteredPassword = document.getElementById('enteredPassword').value;
    //Henter localstorage med JSON.parse, så jeg får objekterne ned i mit Script igen
    let storedUsers = JSON.parse(localStorage.getItem('users'));
    // sætter et for loop igang, som kører igennem storedUsers arrayet, indtil den finder et match
    // når den finder match så sætter den login status til true, og sender en til index.html
    // sætter også javascript variablen til true, så næste if kan virke korrekt.

    for (let i = 0; i < storedUsers.length; i++) {
        if (enteredName == storedUsers[i]._tlfNumber && enteredPassword == storedUsers[i]._password) {
            let logIn = JSON.stringify(storedUsers[i]);
            localStorage.setItem('userLoggedIn', logIn);
            window.location.href = 'index.html';
            break;
        }
    }
        localStorage.setItem('logInStatus', 'true');
        window.location.href = 'index.html';
        var logOn = JSON.stringify(storedUsers[i])
        break;
    }
}
if(logInStatus == false){
    alert('wrong user or pass')
}
}*/

//simpel logud funktion, som sætter lokalStorage logInStatus keyen til false
    /*function signOut() {
        localStorage.setItem('activeUser', 'none');
    }*/

//clear lokalstorage så den bliver tom
    /*function clearStorage() {
        localStorage.clear();
        localStorage.setItem('activeUser', 'none');
    }*/

// En if statement, der viser de rigtige knapper, i forhold til logInStatusen som er under lokalStorage
        /*if (localStorage.getItem('activeUser') != 'none') {
            document.getElementById("log").style.display = "none";
            document.getElementById("log1").style.display = "none";
        } else if (localStorage.getItem('activeUser') == 'none' || localStorage.getItem('userLoggedIn') == null) {
            document.getElementById('log2').style.display = "none";
        }*/