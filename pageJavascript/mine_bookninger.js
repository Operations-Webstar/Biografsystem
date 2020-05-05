//funktion laves for at displaye forskellige beskeder alt efter om brugeren er logget ind og har booket sæder.

//Der konstrueres en tabel med tre rows, hvori brugerens bookings vil blive displayet.
function buildTable(data) {
    let table = document.createElement("table");
    table.id = 'table'
    let fields = Object.keys(data[0]);
    let headRow = document.createElement("tr");
    fields.forEach(function(field) {
        let headCell= document.createElement("th");
        headCell.appendChild(document.createTextNode(field));
        headRow.appendChild(headCell);
    });
    table.appendChild(headRow);

    data.forEach(function(object, index){
        let button = document.createElement('button')
        button.innerHTML = 'Slet booking'
        button.type = 'button'
        //sætter en event listener på, som så sletter den booking, den er ved.
        button.addEventListener("click", () =>{
            axios.delete('http://localhost:3000/bookings/' + JSON.parse(sessionStorage.getItem('info'))[index].booking_id)
                .then(result => {
                    console.log(result)
                }).catch(err => {
                console.log(err)
            })
        });
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
        table.appendChild(button)

    });
    return table;
}

// Via axios.get hentes bookingdata fra databasen ned for activeUser, som findes i databasen
function myBooking () {
    axios.get('http://localhost:3000/bookings/find/'+ JSON.parse(sessionStorage.getItem("activeUser")).userId)
        .then(result => {
            let x = []
            result.data.booking.forEach(allInfo => {
                axios.get('http://localhost:3000/showings/' + allInfo.showing._id)
                    .then(result1 => {
                    // Svarene fra databasen pushes ind i arrayet
                       x.push({
                            Film: result1.data.showing.film.filmName+ ".",
                            Tid: result1.data.showing.dateTime + ".",
                            Sal: result1.data.showing.hall.hallName + ".",
                            Sæder:allInfo.seats,
                            booking_id: allInfo._id
                        })
                        // Informationen om bookingerne indsættes i en "info"-key der oprettes i session storage.
                        sessionStorage.setItem("info", JSON.stringify(x))
                        })
                    })
        })
        }
// Hvis keyen "info" i session storage er tom, alertes der at der ikke er nogen bookinger
function f() {
    let info = JSON.parse(sessionStorage.getItem('info'))
    if(info == null){
        alert('du har ingen bookinger')
        return
    }
    let bookingInfo = info.map(doc => {
        return {
            Film: doc.Film,
            Tid: doc.Tid,
            Sal: doc.Sal,
            Sæder: doc.Sæder
        }
    })
    // Er der foretaget bookinger vises de i tabellen der konstrueres under buildTable
    document.getElementById('bookingButton').style.display = 'none'
        document.querySelector("#displayOfMovies").appendChild(buildTable(bookingInfo))

}

window.onload= myBooking()




