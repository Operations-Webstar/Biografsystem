function lavFilm(filmNummer) {
    document.getElementById("filmName").innerHTML = filmNummer.filmName;
    document.getElementById("description").innerHTML = filmNummer.description;
    document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
    document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
    document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
    document.getElementById("description").innerHTML = filmNummer.description;
    document.getElementById("Book").value = filmNummer.filmName;
    bookup.style.display = "block";
    sessionStorage.setItem('film', JSON.stringify(filmNummer))
}

function bookNu(){
    var chosenFilm = JSON.parse(sessionStorage.getItem('film'));
    if(Film.ageCheck(chosenFilm, activeUser.dateOfBirth)) {
    window.location = "testcalendar.html" }
    else {
        alert("Du er ikke gammel nok til at se denne film!")
    }
}

// Laver 3 objekter udfra klassen Film -Daniel
var filmEt = new Film(
    "Joker",
    "Thriller",
    "120",
    "16",
    "Denne film handler om skurke",
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
// Laver en funktion, hvor man bare sætter filmen ind i funktionen og derefter laver den et film objekt -Daniel


// Laver 3 knapper, for hver film og sætter filmEt ind -Daniel

document.getElementById('buttonEt').onclick = function(){
    lavFilm(filmEt)

};


document.getElementById('buttonTo').onclick = function(){
    lavFilm(filmTo)
};

document.getElementById('buttonTre').onclick = function(){
    lavFilm(filmTre)
};
// Fortryd knap
Fortryd.onclick = function() {
    bookup.style.display = "none";
};

// Hvis man clicker andre steder end popuppen, lukker den
window.onclick = function(event) {
    if (event.target === bookup) {
        bookup.style.display = "none";
    }
};



//Laver et alternativt manuelt multidimensiontelt array, da loop array'et ikke kan gøres multidimensionelt
// Her er der lavet et 2x2 array
var filmArrayEt = [filmEt, filmTo, filmTre];
var filmArrayTo = [filmTo, filmTre];
var datoArray = [[filmArrayEt, filmArrayTo]];

console.log(filmEt);