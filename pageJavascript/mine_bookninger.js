
//TODO: når bookinger er done, skal de smides ind i dette interface.
//Malene: funktion laves for at displaye forskellige beskeder alt efter om brugeren er logget ind og har booket sæder.

/*function checkBooking(){
    if(Tools.getActiveUser == 'none'){
        document.getElementById('booking').innerHTML = 'Du er ikke logget ind'
    }
    else if(JSON.parse(localStorage.getItem('activeUser'))._booking == undefined){
        document.getElementById('booking').innerHTML = 'Ingen sæder booket';
    } else {
        document.getElementById('booking').innerHTML = `Kig i tabellen under for at se dine bookinger.`
    }
}
window.onload = checkBooking();*/

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

//const bookingData = Tools.getActiveUser();

/*if(bookingData === 'none'){
} else {
    let booking = bookingData._booking;
    document.querySelector("#displayOfMovies").appendChild(buildTable(booking));
}*/

async function myBooking () {
    axios.get('http://localhost:3000/bookings/find/'+ JSON.parse(sessionStorage.getItem("activeUser")).userId)
        .then(async result => {
            var x =[]
            console.log(result)
            result.data.booking.forEach(allInfo => {
                axios.get('http://localhost:3000/showings/' + allInfo.showing._id)
                    .then( async result1 => {
                       const newObject = {
                            Film: result1.data.showing.film.filmName,
                            Time: result1.data.showing.dateTime,
                            Hall: result1.data.showing.hall.hallName,
                            Seats: allInfo.seats
                        }
                            await x.push(newObject)
                        })

                    })
           await JSON.stringify(sessionStorage.setItem("info",x))

            })
        }
window.onload= myBooking().then(r =>{
    let info = JSON.parse(sessionStorage.getItem("info"))
    console.log(info)
    document.querySelector("#displayOfMovies").appendChild(buildTable(info));
})

