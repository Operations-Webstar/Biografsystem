
//funktion laves for at displaye forskellige beskeder alt efter om brugeren er logget ind og har booket sæder.

//Der konstrueres en tabel med tre rows, hvori brugerens bookings vil blive displayet.

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

//For at bookingdataen bliver vist i ovenstående tabel skal systemet finde bookingen i user-arrayet der ligger i local storage.

function myBooking () {
    axios.get('http://localhost:3000/bookings/find/'+ JSON.parse(sessionStorage.getItem("activeUser")).userId)
        .then(result => {
            let x = []
            result.data.booking.forEach(allInfo => {
                axios.get('http://localhost:3000/showings/' + allInfo.showing._id)
                    .then(result1 => {

                       x.push({
                            Film: result1.data.showing.film.filmName+ ".",
                            Tid: result1.data.showing.dateTime + ".",
                            Sal: result1.data.showing.hall.hallName + ".",
                            Sæder:allInfo.seats
                        })
                        sessionStorage.setItem("info", JSON.stringify(x))
                        })
                    })
        })
        }

function f() {
    let info = JSON.parse(sessionStorage.getItem('info'))
        console.log(info)
    if(info == null){
        alert('du har ingen bookinger')
        return
    }
    document.getElementById('bookingButton').style.display = 'none'
        document.querySelector("#displayOfMovies").appendChild(buildTable(info));
}

window.onload= myBooking()




