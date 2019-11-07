// Her laves klassen Seat med de korrekte attributer og metoder
class Seat {
    constructor(seat, row) {
        this.seat = seat;
        this.row = row;
    }
}
// Variablen reserveSeatsButton returnerer den værdi der er koblet på Id'et

var reserveSeatsButton = document.getElementById("reserveSeats")
var seatCheckbox = document.getElementsByClassName("Seat");

reserveSeatsButton.onclick = function(){

// Her tjekker den om der er er nogen af checkboksene som er vinget af startende fra checkboks 0

            var counter = 0
            var finalMessage = "Du har nu reserveret: "

            for(i=0; i < seatCheckbox.length; i++){
                if(seatCheckbox[i].checked == true){
                    finalMessage +=  seatCheckbox[i].id + ", "
                    counter++
        }
    }
// Er en eller flere checkbokse vinget af, vil følgende alert poppe op:

            if (counter>0) {
                alert(finalMessage)
                document.location.href = 'Mine_bookninger.html'

            }
// Er ingen af checkboksene checked, vil følgende alert poppe op:

            if (counter==0) {
                alert("Hov! Du mangler at markere de ønskede sæder.")
            }
}










