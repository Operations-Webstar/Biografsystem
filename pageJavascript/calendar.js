//TODO: fikse, så hvis der ingen showings er på en måned, at alt er rødt.
//TODO: jump to virker slet ikke.
//TODO: gør så man ikke kan booke gamle dage.

let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let selectedYear = document.getElementById("year");
let selectedMonth = document.getElementById("month");
let months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];
let showingData = JSON.parse(sessionStorage.getItem('SelectedMovieShowings'));
console.log(showingData)

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
 //console.log(JSON.parse(sessionStorage.getItem('film')).filmName)
function presentShowingsOnDate(){
           //Thomas: laver en div, som kommer til at fylde hele siden
           let divMovieTimes = document.createElement("div");
           divMovieTimes.id = 'popup';

           //Thomas: laver endnu en div, inden i som bliver en boks, som kommer til at ligge i midten af siden
           let divIn = document.createElement("div");
           divIn.style.backgroundColor ='grey'

           divIn.className = 'bookupIndhold';
            let sessChosenDate = new Date(sessionStorage.getItem('chosenDate'))
           for(let i=0; i < showingData.length; i++){
                let tempDate = new Date(showingData[i].dateTime)
               if(sessChosenDate.getMonth() === tempDate.getMonth() && sessChosenDate.getDate() === tempDate.getDate() 
               && sessChosenDate.getFullYear() && tempDate.getFullYear()){
                   let timeSlotButton = document.createElement("button");
                   
                   let hours = tempDate.getHours()
                   let minutes = tempDate.getMinutes()
                   if(hours.length = 1){hours = "0"+tempDate.getHours()}
                   if(minutes.length = 1){minutes = "0"+tempDate.getMinutes()}
                   timeSlotButton.innerHTML = hours + "." + minutes
                   timeSlotButton.addEventListener('click', () => {
                        sessionStorage.setItem('ChosenShowing', JSON.stringify(showingData[i]));
                        axios.get('http://localhost:3000/cinemahalls/' + showingData[i].hall).then(result => {
                            sessionStorage.setItem('ChosenHall', JSON.stringify(result.data))
                            window.location = 'seats.html'
                        })
                            .catch(err => console.log(err))

                    })

                   divIn.appendChild(timeSlotButton) 
                   
               }
           }
           
   
           //Thomas: Sætter det hele ind på siden
               document.body.appendChild(divMovieTimes);
               divMovieTimes.appendChild(divIn);
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
                let DateCheckM = document.getElementById('month');
                let DateCheckY = document.getElementById('year');
                let DateCheckD = cellText.textContent;
                let userChoiceDateCheckM = DateCheckM.options[DateCheckM.selectedIndex].innerHTML;
                let userChoiceDateCheckY = DateCheckY.options[DateCheckY.selectedIndex].innerHTML;
                let ChosenDateCheck = new Date(`${DateCheckD} ${userChoiceDateCheckM} ${userChoiceDateCheckY}`);

                for(let i=0; i< showingData.length;i++){
                        let tempDate = new Date(showingData[i].dateTime)
                        console.log(ChosenDateCheck.getMonth() === tempDate.getMonth() && ChosenDateCheck.getDate() === tempDate.getDate() 
                        && ChosenDateCheck.getFullYear() && tempDate.getFullYear())
                    if(ChosenDateCheck.getMonth() === tempDate.getMonth() && ChosenDateCheck.getDate() === tempDate.getDate() 
                    && ChosenDateCheck.getFullYear() && tempDate.getFullYear()) {
                        
                            cell.style.color = "green"
                            cell.addEventListener('click', function (){
                                let listM = document.getElementById('month');
                                let listY = document.getElementById('year');
                                let listD = cellText.textContent;
            
                                //let userChoiceD = listD.id[listD.selectedIndex].innerHTML;
                                let userChoiceM = listM.options[listM.selectedIndex].innerHTML;
                                let userChoiceY = listY.options[listY.selectedIndex].innerHTML;
                                let userChoiceDate = `${listD} ${userChoiceM} ${userChoiceY}`;
                                sessionStorage.setItem('chosenDate', userChoiceDate);
                                presentShowingsOnDate();
                                console.log(sessionStorage.getItem('chosenDate'))
                                })
                    }else{
                        if(cell.style.color != "green"){
                        cell.style.color = "red"}
                    }
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