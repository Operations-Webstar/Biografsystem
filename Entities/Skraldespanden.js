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
    // når den finder match så sætter den login status til true, og sender en til index1.html
    // sætter også javascript variablen til true, så næste if kan virke korrekt.

    for (let i = 0; i < storedUsers.length; i++) {
        if (enteredName == storedUsers[i]._tlfNumber && enteredPassword == storedUsers[i]._password) {
            let logIn = JSON.stringify(storedUsers[i]);
            localStorage.setItem('userLoggedIn', logIn);
            window.location.href = 'index1.html';
            break;
        }
    }
        localStorage.setItem('logInStatus', 'true');
        window.location.href = 'index1.html';
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
            document.getElementById("logIn").style.display = "none";
            document.getElementById("signIn").style.display = "none";
        } else if (localStorage.getItem('activeUser') == 'none' || localStorage.getItem('userLoggedIn') == null) {
            document.getElementById('log2').style.display = "none";
        }*/

//Uden for for class funktionen
/*function createUser() {
    let form_valid =true;
    let validation_message ="";
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let phone = document.getElementById('phoneNumber').value;
    let birthday = new Date(document.getElementById('bday').value);
    let password = document.getElementById('password').value;
    let storedUsers = [];

//tjekker om firstname har en værdi eller er tom, hvis ja, så bliver form_valid = false
    if (firstName == null || firstName=="") {
        validation_message += "First name must be filled in! \n";
        form_valid = false;
    }
//tjekker om lastName har en værdi eller er tom, hvis ja, så bliver form_valid = false
    if (lastName == null || lastName=="") {
        validation_message += "Last name must be filled in! \n";
        form_valid = false;
    }

//tjekker om phone er tom, om det ikke er et nummmer og om længden ikke er 8, hvis ja, så bliver form_valid = false
    if (phone == ""){
        validation_message += "Please enter a phone number \n";
        form_valid = false;
    } else if (isNaN(phone) ) {
        validation_message += "Phone numbers can only contain numbers! \n";
        form_valid = false
    } else if (phone.length!=8){
        validation_message += "Phone numbers can only have a length of 8 \n";
        form_valid = false;
    }

    //tjekker om birthday kommer ud som invalid date, hvis den gør, så bliver form_valid = false
    if(birthday == 'Invalid Date') {
        validation_message += "insert a real date\n"
        form_valid = false;
    }

    //tjekker om password er tom, lig null eller ikke længere end 3 karakter, hvis ja, så bliver form_valid = false
    if ((password == null || password=="") && password.length < 3) {
        validation_message += "your password must be longer than 3 characters \n";
        form_valid = false;
    }

    //Hvis users i localStorage er lig nul, så pusher man en new user(Thomas) ind i arrayet
    //ellers så henter man localstorage ned, også laver den til javascript array med objekter.
    if(localStorage.getItem("users") == null) {
        storedUsers.push(new user ('Thomas', 'Lindskov', 30110976, '19-02-1996', 'hejsa'))
    } else {
        storedUsers = JSON.parse(localStorage.getItem('users'))
    }

    //hvis form_valid == true dvs. at alle krav til sign in funktionen er blevet udfyldt, så sætter man storedUsers
    // arrayet ind i localstorage via stringify. ellers så alert den (validation_message) med tilhørende strings.
    if (form_valid === true) {
        storedUsers.push(new user(firstName, lastName, phone, birthday, password));
        localStorage.setItem('users', JSON.stringify(storedUsers));
        window.location.href='Login.html'
    } else {
        alert(validation_message);
    }
}*/