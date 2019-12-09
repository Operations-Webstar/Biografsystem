function lavFilm(filmNummer) {
    document.getElementById("filmName").innerHTML = filmNummer.filmName;
    document.getElementById("description").innerHTML = filmNummer.description;
    document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
    document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
    document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
    document.getElementById("Book").value = filmNummer.filmName;
    bookup.style.display = "block";
    sessionStorage.setItem('film', JSON.stringify(filmNummer))
}

function bookNu(){
    var chosenFilm = JSON.parse(sessionStorage.getItem('film'));
    if(Tools.activeUser === 'none'){
        alert('Du skal være logget ind for at vælge film')
    }
    else if(Film.ageCheck(chosenFilm, Tools.activeUser.dateOfBirth)) {
    window.location = "calendar.html" }
    else {
        alert("Du er ikke gammel nok til at se denne film!")
    }
}

// Laver 3 objekter udfra klassen Film -Daniel
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
// Laver en funktion, hvor man bare sætter filmen ind i funktionen og derefter laver den et film objekt -Daniel

bookup = document.getElementById('bookup');
// Laver 3 knapper, for hver film og sætter filmEt ind -Daniel

document.getElementById('buttonEt').onclick = function(){
    lavFilm(filmEt);
    window.onclick = function(event) {
        if(event.target === bookup) {
            bookup.style.display = "none";
        }
    }
};


document.getElementById('buttonTo').onclick = function(){
    lavFilm(filmTo);
    window.onclick = function(event) {
        if(event.target === bookup) {
            bookup.style.display = "none";
        }
    }
};

document.getElementById('buttonTre').onclick = function(){
    lavFilm(filmTre);
    window.onclick = function(event) {
        if(event.target === bookup) {
            bookup.style.display = "none";
        }
    }
};

// Fortryd knap
Fortryd.onclick = function() {
    bookup.style.display = "none";
};

// Hvis man clicker andre steder end popuppen, lukker den




//Laver et alternativt manuelt multidimensiontelt array, da loop array'et ikke kan gøres multidimensionelt
// Her er der lavet et 2x2 array
/*
var filmArrayEt = [filmEt, filmTo, filmTre];
var filmArrayTo = [filmTo, filmTre];
var datoArray = [[filmArrayEt, filmArrayTo]];

console.log(filmEt);*/


