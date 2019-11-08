class Booking {
    constructor(bookingId, userId, screeningId) {
        this.bookingId = bookingId;
        this.userId = userId;
        this.screeningId = screeningId;
    }
    // function updateSeatsAvailable(){}
}

var displaySeats = JSON.parse(localStorage.getItem("seatsChosen"))
console.log(displaySeats)
debugger
document.getElementById('seats123').innerHTML = displaySeats;
