class Booking {
    constructor(bookingId, userId, screeningId) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.screeningId = screeningId;
    }
    // function updateSeatsAvailable(){}
}
//d
var displayFilms = localStorage.getItem("film")
document.getElementById('filmNavn').innerHTML = displayFilms;
//Malene
var displaySeats = JSON.parse(localStorage.getItem("seatsChosen"))
console.log(displaySeats)
debugger
document.getElementById('seats123').innerHTML = displaySeats;

