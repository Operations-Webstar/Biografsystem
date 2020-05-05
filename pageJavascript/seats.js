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
            //laver tre for-loops, så vi kører igennem de to dimensionelle array, og sammenligner med det med seats arrayet.
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
