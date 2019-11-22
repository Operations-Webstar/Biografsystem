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



const filmBookingCell = [
    {spilleFilm: "Joker", spilleTidspunkt: "17. januar", seating: "s2r4"},
    {spilleFilm: "Batman", spilleTidspunkt: "30. februar", seating: "s1r5"}
];


function buildTable(data) {
    let table = document.createElement("table");

    let fields = Object.keys(data[0]);
    let headRow = document.createElement("tr");
    fields.forEach(function(field) {
        let headCell= document.createElement("th");
        headCell.appendChild(document.createTextNode(field));
        headRow.appendChild(headCell);
    });
table.appendChild(headRow);

data.forEach(function(object){
    let row = document.createElement("tr");
    fields.forEach(function(field){
        let cell = document.createElement("td");
        cell.appendChild(document.createTextNode(object[field]));
        if (typeof object[field] == "number") {
            cells.style.textAlign= "right";
        }
        row.appendChild(cell);
    });
    table.appendChild(row);
});
return table;
}
document.querySelector("#displayOfMovies").appendChild(buildTable(filmBookingCell));