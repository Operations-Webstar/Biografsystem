// Klassen bliver ikke brugt endnu, men det kommer det til, vi havde ikke tid til at gøre den klar.
/*class Seat {
    constructor(seat, row) {
        this.seat = seat;
        this.row = row;
    }
}*/
// Nedenfor bliver variablen reserveSeatsButton og seatCheckbox defineret i et global scope, hvilket gør dem globalt tilgængelige.
// Variablen reserveSeatsButton værdi bliver sat til at være HTML-elementet hvis id er "reserveSeats". Dette findes i DOMMEN via .getElementById.
// Det samme gøres for variablen seatCheckbox hvis værdi bliver sat til at være alle HTML-elementer der hører under klassen "Seat" via .getElementByClassName

let reserveSeatsButton = document.getElementById("reserveSeats");
let seatCheckbox = document.getElementsByClassName("Seat");

//Nedenfor laves en funktion som executes når der trykkes på knappen med id'et reserveSeats

reserveSeatsButton.onclick = function(){

// Herefter defineres flere variable i et local scope, det betyder de ikke kan tilgås uden for funktionen.
// De defineres lokalt, da de ikke skal bruges uden for dette scope.

            var counter = 0;
            var finalMessage = "Du har nu reserveret: ";
            var seatsArray = [];


// Der laves et for loop med tre statements. I første statement "i = 0" sættes variablen i til at være 0 inden loopet begynder
// I andet statement "i < seatCheckbox.length" defineres betingelsen for at loopet kører - nemlig at "i" skal være mindre end mængden af sæder
// I tredje statement "i++" bliver det defineret at hver gang loopet har kørt skal variablen i stige en gang i værdi.


            for(let i = 0; i < seatCheckbox.length; i++){
                if(seatCheckbox[i].checked === true){
                    finalMessage +=  seatCheckbox[i].id + ", ";
                    counter++;
                    seatsArray.push(seatCheckbox[i].id)
        }
    }

// I for-loopet ovenfor laves et if-statement. Er nogen af checkboksene vinget af vil if-statementet være true hvilket medfører at den
// efterfølgende kode bliver executed. Den vil nu printe??? variablen finalMessage og de checked seats.
// Herefter pushes ids på de markede checkbokse op i det tomme array ved navn "seatsArray"

// Herefter benyttes local storage for at gemme de sæder som kunden ønsker at reservere ved at gemme det i browseren. Dette gøres med metoden .setItem
// som definerer den item vi vil gemme med et navn og en værdi. Værdien sættes til at være vores nu fyldte array??? ved navn "seatsArray".
// Arrayet laves til en string via JSON.stringify, da local storage kun kan gemme strings.

    sessionStorage.setItem('seatsChosen', JSON.stringify(seatsArray));

// Et if-statement laves med formålet om at bekræfte kunden om hvilke sæder personen har reserveret i form af en alert.
// Dette sker kun hvis counteren er større en 0 - altså at minimum 1 sæde er vinget af.
// Herefter sendes man videre til HTML siden "Mine bookinger".

            if (counter>0) {
                let stored = Tools.getAllUsers();
                let active= Tools.getActiveUser();
                let act = Tools.getActiveUserIndex();
                let booking = new Booking(JSON.parse(sessionStorage.getItem("film")).filmName, JSON.parse(sessionStorage.getItem("seatsChosen")),sessionStorage.getItem('choosenDate'));
                if(active === 'none'){
                    alert('Du skal være logget ind, for at bruge booke sæder')
                } else {
                active._booking.push(booking);
                stored[act] = active;
                localStorage.setItem('activeUser', JSON.stringify(active));
                localStorage.setItem('users', JSON.stringify(stored));
                document.location.href = 'Mine_bookninger.html';
                    alert(finalMessage)}
            }


// Er ingen af checkboksene tjekket af og counter vil dermed være lig med 0, da vil den alerte som følger:

            if (counter===0) {
                alert("Hov! Du mangler at markere de ønskede sæder.")
            }
};

function bookedSeats() {
    let seats = document.getElementsByClassName('Seat');
    let seatsBooked = Tools.getBookedSeats();
    if(seatsBooked === undefined){
    } else {
        for (let l = 0; l < seatsBooked.length; l++) {
            for (let o = 0; o < seats.length; o++) {
                if (seats[o].id === seatsBooked[l]) {
                    document.getElementById(seats[o].id).setAttribute('disabled', 'disabled')
                }
            }
        }
    }
}

window.onload = bookedSeats();
