// Tager hall fra session storage
let hallInfo = JSON.parse(sessionStorage.getItem('ChosenHall'))
let Hall = new Cinemahall(hallInfo._id, hallInfo.hallName, hallInfo.rows, hallInfo.columns)

let seatArray = document.getElementById("seatarray");
// Ud fra hall's rækker og kolonner oprettes et dobbelt array af checkboxes
for (let i = 0; i<Hall.columns;i++) {
    for(let j = 0; j<Hall.rows;j++){
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = 'række ' + (1+i).toString() + ' ' + 'kolonne ' + (1+j).toString();
        checkbox.value = "value";
        checkbox.id = (1+i).toString()+(1+j).toString();
        checkbox.className = "Seat"
        seatArray.appendChild(checkbox)
    }
    let lb = document.createElement("br")
    let lb2 = document.createElement("br")
    seatArray.appendChild(lb)
    seatArray.appendChild(lb2)
}

    let seatCheckbox = document.getElementsByClassName("Seat");
    let reserveSeatsButton = document.getElementById("seatSelector");

    function g() {
        let booking = {}
        var counter = 0;
        var finalMessage = "Du har nu reserveret: ";
        var seatsArray = [];

        for (let i = 0; i < seatCheckbox.length; i++) {
            if (seatCheckbox[i].checked === true) {
                finalMessage += seatCheckbox[i].name + ", ";
                counter++;
                seatsArray.push(seatCheckbox[i].name)
            }
        }
console.log(counter)
        if (counter > 0) {
            booking = new Booking(JSON.parse(sessionStorage.getItem('ChosenShowing'))._id, seatsArray, JSON.parse(sessionStorage.getItem('activeUser')).userId)
            axios.post('http://localhost:3000/bookings', booking)
                .then(result => {
                    console.log(result)
                    sessionStorage.removeItem('ChosenShowing')
                    sessionStorage.removeItem('ChosenHall')
                    sessionStorage.removeItem('chosenDate')
                    sessionStorage.removeItem('SelectedMovieShowings')
                    alert(finalMessage)
                    window.location = 'Mine_bookninger.html'
                }).catch(err => {
                    console.log(err)
            })
        } else {
            alert("Hov! Du mangler at markere de ønskede sæder.")
        }
    }
// En funktion der kigger alle bookinger på denne showing igennem, for at gøre bookede sæder uncklickable
function bookedSeats() {
    var seats = document.getElementsByClassName('Seat');
    axios.get('http://localhost:3000/bookings/' + JSON.parse(sessionStorage.getItem('ChosenShowing'))._id)
        .then(result => {
            console.log(result.data.booking.products)
            for (let i = 0; i < result.data.booking.products.length; i++) {
                let s = result.data.booking.products[i].seats
                for (let j = 0; j < s.length; j++) {
                    for(let e = 0; e< seats.length; e++)
                    if(s[j] == seats[e].name){
                        document.getElementById(seats[e].id).setAttribute('disabled', 'disabled')
                    }
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
}
window.onload = bookedSeats()
/*for (let l = 0; l <= manyArrayWithSeats.length; l++) {
    for (let j = 0; j <= seats.length; j++) {
        seats[j].name
        if (seats[j].name) {
            document.getElementById(seats[j].id).setAttribute('disabled', 'disabled')
        }
    }
}*/

/*if(seatsBooked === undefined){
 } else {
     for (let l = 0; l < seatsBooked.length; l++) {
         for (let o = 0; o < seats.length; o++) {
             if (seats[o].id === seatsBooked[l]) {
                 document.getElementById(seats[o].id).setAttribute('disabled', 'disabled')
             }
         }
     }
 }*/

// Variablen reserveSeatsButton og seatCheckbox defineret i et globalt scope.
// De bliver begge tildelt værdier der findes i Dommen via et .getElementBy... statementes
/*
let reserveSeatsButton = document.getElementById("seatSelector");
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
            document.location.href = 'Mine_bookninger.html';
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

window.onload = bookedSeats();*/