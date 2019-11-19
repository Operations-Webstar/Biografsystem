class Booking {
    constructor(bookingId, userId, screeningId) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.screeningId = screeningId;
    }
    // function updateSeatsAvailable(){}
}
//d

//Malene
function checkBooking(){
    var displayFilms = localStorage.getItem("film");
    var displaySeats = JSON.parse(localStorage.getItem("seatsChosen"));
    if(displaySeats === null){
        document.getElementById('seats123').innerHTML = 'ingen sæder booket';
    } else {
        document.getElementById('filmNavn').innerHTML = 'til film ' + displayFilms;
        document.getElementById('seats123').innerHTML = 'Du har booket' + displaySeats;
    }
}

window.onload = checkBooking();