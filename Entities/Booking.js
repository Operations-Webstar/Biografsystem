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
    let displayFilms = localStorage.getItem("film");
    let displaySeats = JSON.parse(localStorage.getItem("seatsChosen"));
    let displayDate = localStorage.getItem('choosenDate');
    if(displaySeats === null){
        document.getElementById('booking').innerHTML = 'Ingen sæder booket';
    } else {
        document.getElementById('booking').innerHTML = `Du har booket ${displaySeats}, til film ${displayFilms}, den ${displayDate}`;
    }
}
window.onload = checkBooking();


