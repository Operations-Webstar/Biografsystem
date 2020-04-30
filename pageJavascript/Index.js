/* Daniel: Funktionen lavFilm konstrueres med filmNummer som parameter. I funktionens statement henter den seks HTML elementer.
De fem elementer bliver erstattet med filmNummer's(Film objektet's) tilsvarende værdi.
L. 10 ændre funktionen en i CSS'en så pop-up boksen bliver synlig, når funktionen køres.
L. 11 konverteres værdien af funktionens parameter til JSON.string, som gemmes med sessionStorage med 'film' som key.
*/

/*function lavFilm(filmNummer) {
    document.getElementById("filmName").innerHTML = filmNummer.filmName;
    document.getElementById("description").innerHTML = filmNummer.description;
    document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
    document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
    document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
    bookup.style.display = "block";
    sessionStorage.setItem('film', JSON.stringify(filmNummer))
}*/
/* Daniel: Der konstrueres bookNu funktionen, som tildeler variablen chosenFilm, det filmobjekt der er gemt i sessionStore med 'film' som key.
 Fra L. 20 bruges if/else statement og en nyttefunktion til at vise en alert, hvis brugeren ikke er logget ind.
 L. 23 ageCheck funktionen bruges til tjekke om brugeren er gammel nok, til at se filmen og videredirigeres til calender.html
 l. 26 Der vises en alert, hvis brugeren ikke er gammel nok. -Daniel
 */

function bookNu(){
    var chosenFilm = JSON.parse(sessionStorage.getItem('film'));
    var dateOfBirth = JSON.parse(sessionStorage.getItem('activeUser')).dateOfBirth;
    console.log(dateOfBirth)
    console.log(sessionStorage)
    if(Tools.activeUser === 'none'){
        alert('Du skal være logget ind for at vælge film')
    }
    else if(Film.ageCheck(chosenFilm, dateOfBirth)) {
        window.location = "calendar.html"
    }
    else {
        alert("Du er ikke gammel nok til at se denne film!")
    }
}


// Her konstrueres tre objekter ud fra Film klassen, med fem strings som bruges til at beskrive filmene til brugeren -Daniel
var filmEt = new Film(
    "Iron man",
    "Thriller",
    "120",
    "16",
    "Denne film handler om Iron man",
);

var filmTo = new Film(
    "Avengers",
    "Action Thriller",
    "150",
    "12",
    "Denne film handler om superhelte"
);
var filmTre = new Film(
    "The Dark Knight",
    "Action",
    "100",
    "16",
    "Denne film handler om Batman",
);

//TODO: fikse så den laver en knap for hver eneste film i databasen, dynamisk.
function getAllFilms(number){
    axios.get('http://localhost:3000/films/')
        .then(result=>{
            console.log(result)
            let filmData = result.data.products
            let filmNummer = filmData[number]

            document.getElementById("filmName").innerHTML = filmNummer.filmName;
            document.getElementById("description").innerHTML = filmNummer.description;
            document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
            document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
            document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
            bookup.style.display = "block";
            sessionStorage.setItem('film', JSON.stringify(filmNummer))
            Tools.retriveShowings()
        })
}

/* Daniel: Her hentes den første knap ned, og tildeles en funktion med lavFilm funktionen inde.
lavFilm køres med den tilsvarende film som parameter
L. 61-63 window.onclick tildeles en anonym funktion, med et if/else statement, som ændrer style.display til none hvis brugeren
klikker andre steder end inden i pop-up boksen. Altså pop-up boksen lukker, hvis brugeren klikker andre steder end den.
*/
document.getElementById('buttonEt').onclick = function(){
    getAllFilms(0);
    window.onclick = function(event) {
        if(event.target === bookup) {
            bookup.style.display = "none";
        }
    }
};

// Daniel: Samme proces sker her, som i L. 65-72, bare med knap to, hvor film to bruges som parameter i lavFilm funktionen
document.getElementById('buttonTo').onclick = function(){
    getAllFilms(1);
    window.onclick = function(event) {
        if(event.target === bookup) {
            bookup.style.display = "none";
        }
    }
};
// Daniel: Det helt samme sker her, som i L. 65-72, bare med knap tre, hvor film tre bruges som parameter i lavFilm funktionen
document.getElementById('buttonTre').onclick = function(){
    getAllFilms(0);
    window.onclick = function(event) {
        if(event.target === bookup) {
            bookup.style.display = "none";
        }
    }
};

// Daniel: Fortryd knappen kører en anonym funktion, som lukker pop-up boksen hvis brugeren trykker på fortryd.
Fortryd.onclick = function() {
    bookup.style.display = "none";
};






