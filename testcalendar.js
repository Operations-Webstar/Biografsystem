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
    currentMonth = (currentMonth + 1) % 12
    showCalendar(currentMonth,currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear -1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth -1;
    showCalendar(currentMonth, currentYear)
}

function jump() {
    currentYear = parseInt(selectedYear.value)
    currentMonth = parseInt(selectedMonth.value)
}




function showCalendar(month, year) {
    //ugen starter mandag.
    let firstDay = (new Date(year, month)).getDay()-1;
    if (firstDay === -1) {
        firstDay = 6;
    }
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    //henter den indre krop af kalanderen
    let table = document.getElementById("calendar-body")

    //clearer table
    table.innerHTML = ""

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
            //første tal
            if (i === 0 && j < firstDay){
                let cell = document.createElement("td", );
                let cellText = document.createTextNode("");
                cell.class = 'cellText';
                cell.appendChild(cellText);
                row.appendChild(cell);

            }
            //sidste tal
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
                    localStorage.setItem('choosenDate', userChoiceDate);
                    window.location = "Seats.html";
                });
                // viser dags dato som en anden farve
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    //cell.classList.add("bg-info");
                }
                //indsætter nu også med row til sidst
                cell.appendChild(cellText);
                row.appendChild(cell);
                table.appendChild(row);
                date++;
            }

        }
    }
}






