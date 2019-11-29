//Thomas
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