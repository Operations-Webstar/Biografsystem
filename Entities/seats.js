// Her laves klassen seats med de korrekte attributer og metoder
class Seat {
    constructor(seat, row) {
        this.seat = seat;
        this.row = row;
    }
}

var reserveSeatsButton = document.getElementById("reserveSeats")
var seatCheckbox = document.getElementsByClassName("Seat");
console.log(seatCheckbox)
console.log(seatCheckbox.length)

reserveSeatsButton.onclick = function(){

    // Her tjekker den om der er er nogen af check-boksene der er cheked


            for(i=0; i < seatCheckbox.length; i++){
                if(seatCheckbox[i].checked == true){
                    document.location.href = 'Mine_bookninger.html'
                    alert("Du har nu reserveret: "+ seatCheckbox[i].id)

                    /*else if {
                        alert("Hov! Du mangler at angive hvilke sæder du ønsker at reservere")     */

                    }


        }
    }



/*
var i =0;
var len = seatCheckbox.length;
console.log(len)
var seatChosen = "";
var validSeat = false;

function validSeats() {
    for (i=0; i<len; i++) {
        if(seatCheckbox[i].checked) {
                    console.log(seatCheckbox[i].id)
            /*
            seatChosen = seatCheckbox[i].value;
            validSeat = true;
            document.location.href = 'Kurv.html';
        }
    }
}*/









