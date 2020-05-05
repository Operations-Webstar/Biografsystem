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

//en tidligere ide, som ikke blev til noget, da vi ændrede lokal storage til at være en variabel som er aktiv.
/*localStorage.setItem('logInStatus', 'true');
   window.location.href = 'index1.html';
   var logOn = JSON.stringify(storedUsers[i])
   break;
}

<!-- </header>


fra booking.js, noget start kode.
<section class="midt">
    <div class="container">
        <h1>Log på for at se dine bookinger</h1>
        <br/>

        Navn:
        <br/>
        <input type="text" id="name" value="" placeholder="Your name"/>
        <br/>
        <br/>
        Telefonnummer:
        <br/>
        <input type="text" id="telefon" value="" placeholder="Your telephonenumber"/>
        <br/>
        <br/>
        Fødselsdato:
        <br/>
        <input type="text" id="birthday" value="" placeholder="Your birthdate"/>
        <br/>
        <br/>


        <button type="button" id="logIn" >Log in</button>
        <br/>
        <br/>

        <h1>Mine bestillinger:</h1>
        <ul id="køb">
            <li> køb 1</li>
            <li> køb 2</li>
            <li> køb 3</li>
        </ul>
        <br/>

    </div>
</section>
<br/> -->
}
// Laver et array, der skal bruges til kalenderen

static login(){
    let divLogin = document.createElement("div");
    divLogin.id = 'popup';
    let divIn = document.createElement("div");
    divIn.className = 'bookupIndhold';
    divLogin.innerHTML = 'Hello';
    document.body.appendChild(divLogin);
    divLogin.appendChild(divIn);
    let loginForm =  document.createElement('form');
    divIn.appendChild(loginForm);
    let enteredNumber = document.createElement('input');
    let enteredPassword = document.createElement('input');
    enteredNumber.value = '';
    enteredNumber.style.margin = '10px'
    enteredPassword.value = '';
    enteredPassword.style.margin = '10px'
    enteredNumber.placeholder= 'number';
    enteredNumber.id = 'enteredNumber';
    enteredPassword.placeholder = 'password';
    let button = document.createElement('input');
    button.type = 'button';
    button.value = 'Log in'
    loginForm.appendChild(enteredNumber);
    loginForm.appendChild(enteredPassword);
    loginForm.appendChild(button);
    button.addEventListener('click', function () {
        let user = Tools.getUser();
        //if statement, der bruges til at tjekke om informationen er korrekt, og giver alerts alt efter hvad fejlen er.
        if (enteredNumber.value === '' || enteredPassword.value === ''){
            alert('Missing information')
        } else if(user === undefined){
            alert('No user with this number')
        } else if (enteredNumber.value !== user._tlfNumber || enteredPassword.value !== user._password) {
            alert('Wrong pass')
        }  else {
            //Sætter keyen activeUser til at være lig den user, som lige er logget ind. Så den kan tilgås senere.
            // activeUser nøglen, vil være lig at en user er logget ind.
            localStorage.setItem('activeUser', JSON.stringify(user));
            //Sender en videre til bookingsiden
            window.location.href = 'index.html';
        }
    })
    //Laver et alternativt manuelt multidimensiontelt array, da loop array'et ikke kan gøres multidimensionelt
// Her er der lavet et 2x2 array

var filmArrayEt = [filmEt, filmTo, filmTre];
var filmArrayTo = [filmTo, filmTre];
var datoArray = [[filmArrayEt, filmArrayTo]];

console.log(filmEt);

}
//en static funktion der logger ind bruger ind, dette gøres ved at kalde den statisk. Den tjekker om telefonnummer og
// password passer sammen. Hvis Ja, så sætter den localStorage keyen 'activeUser' til at være den User
// der prøver at logge ind
function logIn() {
    //laver de forskellige variabler(som hentes fra HTML), som skal bruges i forbundelse med funktionen
    let enteredNumber = document.getElementById('enteredNumber').value.toString();
    let enteredPassword = document.getElementById('enteredPassword').value;
    //Henter User, ved hjælp af Tools.getUser, som finder User via telefonnummeret
    let user = Tools.getUser();
    //if statement, der bruges til at tjekke om informationen er korrekt, og giver alerts alt efter hvad fejlen er.
    if (enteredNumber === '' || enteredPassword === ''){
        alert('Missing information')
    } else if(user === undefined){
        alert('No user with this number')
    } else if (enteredNumber !== user._tlfNumber || enteredPassword !== user._password) {
        alert('Wrong pass')
    }  else {
        //Sætter keyen activeUser til at være lig den user, som lige er logget ind. Så den kan tilgås senere.
        // activeUser nøglen, vil være lig at en user er logget ind.
        localStorage.setItem('activeUser', JSON.stringify(user));
        //Sender en videre til bookingsiden
        window.location.href = 'index.html';
    }
}

//  Konstruerer novemberEt funktionen med start og slut som parametre
Der er tre variable, en startdato og en slutdato som bruger den indbyggede Date metode og en variabel der bliver tildelt et
tomt array. Herefter laves et for loop, som kører fra startDato's værdi til slutDato. Herefter skubbes værdien ind i array'et igen.
L. 259 returnerer funktionen værdien af arrayet november
function novemberEt(start, slut) {
    var startDato = new Date(start);
    var slutDato = new Date(slut);
    var november = [];

    for (var i=0; startDato <= slutDato; i++) {
        november.push(new Date(startDato.setDate(startDato.getDate() +1)));
    }
    return november
}
console.log(novemberEt("Nov 3", "Nov 10"))

*/
//getAllUsers, bruges til at få fat i et Array med de users, som er gemt i localstorage
//Variable, som man skal manipulerer med
/*static allUsers = Tools.getAllUsers();
static getAllUsers(){
    let storedUsers = [];
    // Hvis users i localStorage er lig nul, så pusher man en new Admin(Thomas) ind i arrayet
    //ellers så henter man localstorage ned, også laver den til javascript array med objekter.
    if (localStorage.getItem('users') === null) {
        storedUsers.push(new Admin('Thomas', 'Lindskov', '30110976', '19-02-1996', 'hejsa', 'true'))
    } else {
        storedUsers = JSON.parse(localStorage.getItem('users'))
    }
    return storedUsers
};*/

// Bruges til at få fat i en helt bestemt user, så man f.eks. kan logge den user ind, eller finde
//useren i systemet, baseret på userens inputtede telefonnummer, da det er vores unikke-ID til useren.
/*static getUser() {
    let enteredNumber = document.getElementById('enteredNumber').value.toString();
    for(let i = 0; i < this.allUsers.length; i++) {
        if (enteredNumber === this.allUsers[i]._tlfNumber) {
            return this.allUsers[i];
        }
    }
};*/

// Finder her hvad den indtastede users id er, så man kan manipulere Arrayet, i andre funktioner
//f.eks. hvis man vil slette en specifik user eller gøre dem til admin
/*static getUserIndex() {
    let enteredNumber = document.getElementById('enteredNumber').value.toString();
    for (let i = 0; i < this.allUsers.length; i++) {
        if (enteredNumber === this.allUsers[i]._tlfNumber) {
            return i;
        }
    }
};*/


// skal bruges til at finde ud af, hvad den aktive users index er, så man kan manipulere arrayet
//f.eks. hvis man booker et sæde, så skal den kunne smides op i Arrayet igen, så man beholder bookingen.
/*static getActiveUserIndex() {
    let userNumber = this.activeUser._tlfNumber;

    for (let i = 0; i < this.allUsers.length; i++) {
        if (userNumber === this.allUsers[i]._tlfNumber) {
            return i;
        }
    }
};*/
//const bookingData = Tools.getActiveUser();

/*if(bookingData === 'none'){
} else {
    let booking = bookingData._booking;
    document.querySelector("#displayOfMovies").appendChild(buildTable(booking));
}*/

/*function checkBooking(){
    if(Tools.getActiveUser == 'none'){
        document.getElementById('booking').innerHTML = 'Du er ikke logget ind'
    }
    else if(JSON.parse(localStorage.getItem('activeUser'))._booking == undefined){
        document.getElementById('booking').innerHTML = 'Ingen sæder booket';
    } else {
        document.getElementById('booking').innerHTML = `Kig i tabellen under for at se dine bookinger.`
    }
}
window.onload = checkBooking();*/

/*function lavFilm(filmNummer) {
    document.getElementById("filmName").innerHTML = filmNummer.filmName;
    document.getElementById("description").innerHTML = filmNummer.description;
    document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
    document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
    document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
    bookup.style.display = "block";
    sessionStorage.setItem('film', JSON.stringify(filmNummer))
}*/

