// Klassen bliver ikke brugt dette semester, men det kommer den til, vi havde ikke tid til at fikse det.
/*class Seat {
    constructor(seat, row) {
        this.seat = seat;
        this.row = row;
    }
}*/
// Malene:
// Variablen reserveSeatsButton og seatCheckbox defineret i et globalt scope.
// De bliver begge tildelt værdier der findes i Dommen via et .getElementBy... statementes

let reserveSeatsButton = document.getElementById("reserveSeats");
let seatCheckbox = document.getElementsByClassName("Seat");

//Nedenfor laves en funktion som executes når der trykkes på knappen med id'et reserveSeats

reserveSeatsButton.onclick = function(){

// Herefter defineres flere variable i et local scope

            var counter = 0;
            var finalMessage = "Du har nu reserveret: ";
            var seatsArray = [];


// Der laves et for loop der har som betigelse at det kun kører så længe i er mindre end mængden af sæder

            for(let i = 0; i < seatCheckbox.length; i++){
                if(seatCheckbox[i].checked === true){
                    finalMessage +=  seatCheckbox[i].id + ", ";
                    counter++;
                    seatsArray.push(seatCheckbox[i].id)
        }
    }

// I for-loopet ovenfor laves et if-statement som tjekker hvilke checkbokse (sæder) der er markeret.
// Er minimum 1 sæde taget vil ids på de markede checkbokse pushes op i det tomme array ved navn "seatsArray"

    sessionStorage.setItem('seatsChosen', JSON.stringify(seatsArray));

// Et if-statement laves med formålet om at bekræfte kunden om hvilke sæder personen har reserveret samt gemme denne information i local storage.
// Dette finder kun sted hvis kunden er logget ind (active), her vil informationen om reserverede sæder skubbes op i local storage.
// Herefter sendes man videre til HTML siden "Mine bookinger".

            if (counter>0) {
                let stored = Tools.getAllUsers();
                let active= Tools.getActiveUser();
                let act = Tools.getActiveUserIndex();
                let booking = new Booking(JSON.parse(sessionStorage.getItem("film")).filmName, JSON.parse(sessionStorage.getItem("seatsChosen")),sessionStorage.getItem('choosenDate'));
                if(active === 'none'){
                    alert('Du skal være logget ind, for at booke sæder')
                } else {
                active._booking.push(booking);
                stored[act] = active;
                localStorage.setItem('activeUser', JSON.stringify(active));
                localStorage.setItem('users', JSON.stringify(stored));
                document.location.href = 'bookninger.html';
                    alert(finalMessage)}
            }


// Er ingen af checkboksene tjekket af og counter vil dermed være lig med 0, da vil den alerte som følger:

            if (counter===0) {
                alert("Hov! Du mangler at markere de ønskede sæder.")
            }
};
// Der laves en function som sørger for at de sæder der allerede er booket til den konkrete forestilling ikke kan bookes igen af andre kunder.

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