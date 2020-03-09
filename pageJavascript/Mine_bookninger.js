//Malene: funktion laves for at displaye forskellige beskeder alt efter om brugeren er logget ind og har booket sæder.

function checkBooking(){
    if(Tools.activeUser == 'none'){
        document.getElementById('booking').innerHTML = 'Du er ikke logget ind'
    }
    else if(JSON.parse(localStorage.getItem('activeUser'))._booking == undefined){
        document.getElementById('booking').innerHTML = 'Ingen sæder booket';
    } else {
        document.getElementById('booking').innerHTML = `Kig i tabellen under for at se dine bookinger.`
    }
}
window.onload = checkBooking();

//Malene: Der konstrueres en tabel med tre rows, hvori brugerens bookings vil blive displayet.

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
                cell.style.textAlign= "right";
            }
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    return table;
}

//Malene: For at bookingdataen bliver vist i ovenstående tabel skal systemet finde bookingen i user-arrayet der ligger i local storage.

const bookingData = Tools.getActiveUser();
if(bookingData === 'none'){
} else {
    let booking = bookingData._booking;
    document.querySelector("#displayOfMovies").appendChild(buildTable(booking));
}