let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let selectedYear = document.getElementById("year");
let selectedMonth = document.getElementById("month");

let months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear +1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth,currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear -1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth -1;
    showCalendar(currentMonth, currentYear)
}

function jump() {
    currentYear = parseInt(selectedYear.value);
    currentMonth = parseInt(selectedMonth.value);
    showCalendar(currentYear,currentMonth);
}




function showCalendar(month, year) {
    //ugen starter mandag derfor skal der skrives minus -1 både i firstDay og i if statementet efter.
    let firstDay = (new Date(year, month)).getDay()-1;
    if (firstDay === -1) {
        firstDay = 6;
    }
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    console.log(daysInMonth);
    //henter den indre krop af kalanderen
    let table = document.getElementById("calendar-body");

    //clearer table
    table.innerHTML = "";

    //indsætter år- og månedsinformation igen vha. DOM
    monthAndYear.innerHTML = months[month] + " " + year;
    selectedYear.value = year;
    selectedMonth.value = month;

    //opsætter alle celler igen
    let date = 1;
    for (let i= 0; i<6; i++){

        //laver en række
        let row = document.createElement("tr");

        //laver de tilhørende celler og indsætter deres data
        for (let j = 0; j<7; j++){
            //hvis dagen er før den første dag i måneden indsættes der ikke clickability og tal på dagen
            if (i === 0 && j < firstDay){
                let cell = document.createElement("td", );
                let cellText = document.createTextNode("");
                cell.class = 'cellText';
                cell.appendChild(cellText);
                row.appendChild(cell);

            }
            //stopper koden hvis date er over antal dage i måned
            else if (date > daysInMonth) {

                break;
            }
            //alle rækker
            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date.toString());
                cell.addEventListener('click', function (){
                    let listM = document.getElementById('month');
                    let listY = document.getElementById('year');
                    let listD = cellText.textContent;

                    //let userChoiceD = listD.id[listD.selectedIndex].innerHTML;
                    let userChoiceM = listM.options[listM.selectedIndex].innerHTML;
                    let userChoiceY = listY.options[listY.selectedIndex].innerHTML;
                    let userChoiceDate = `${listD} ${userChoiceM} ${userChoiceY}`;
                    sessionStorage.setItem('choosenDate', userChoiceDate);
                    window.location = "Seats.html";
                });

                //indsætter nu også med row til sidst
                cell.appendChild(cellText);
                row.appendChild(cell);
                table.appendChild(row);
                date++;
            }

        }
    }
}






