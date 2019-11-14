class Film {
    constructor(filmName, genre, filmLength, ageRestriction, description, dates) {
        this.filmName = filmName;
        this.genre = genre;
        this.filmLength = filmLength;
        this.ageRestriction = ageRestriction;
        this.description = description;
        this.dates = dates

    }
    static lavFilm(filmNummer) {
        document.getElementById("filmName").innerHTML = filmNummer.filmName;
        document.getElementById("description").innerHTML = filmNummer.description;
        document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
        document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
        document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
        document.getElementById("description").innerHTML = filmNummer.description;
        document.getElementById("Book").value = filmNummer.filmName;
        bookup.style.display = "block";
    }
    static bookNu(){
        var bookFilm = document.getElementById("Book");
        localStorage.setItem('film', bookFilm.value)
        window.location = "Seats.html"
    }
        getAge(User){

            //finder både idags dato, og finder userindsat date her

            let today = new Date();

            //Bruger new date, så at user.dateOfbirth kommer i Dato format, så vi kan bruge de næste funktioner

            let dateOfBirth = new Date(User.dateOfBirth);
            if (typeof dateOfBirth === "undefined") {
                console.log('no date of birth');
            } else {
                dateOfBirth = new Date(User.dateOfBirth)
            }
            //sætter age i lige med idag årstal minus birthDate årstal og trækker dem fra hinanden

            let age = today.getFullYear() - dateOfBirth.getFullYear();

            //sætter m lig med nuværende måned - fødselsdags måned

            let m = today.getMonth() - dateOfBirth.getMonth();

            //Hvis 0 er større end M, har personen allerede haft fødselsdag, så behøves der ikke trækkes 1 fra.
            //Dog hvis m === 0 eller at idag's dag ikke er større end fødselsdags dagen, så minusser man age med 1
            // da personen ikke har nået at have haft fødselsdag

            if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
                age - 1
            }
            return age
        }

    ageCheck(Film, User){
        var filmRes = Film.ageRestriction;
        var userAge = Film.getAge(User);
        return filmRes <= userAge;
    }
}


// Laver et array, der skal bruges til kalenderen -Daniel
var startDato = new Date("Nov, 2019");
var slutDato = new Date("Nov 30, 2019");
function novemberEt() {
    var november = [];
// Laver det gennem et loop, så koden fylder mindre og med dato funktionen -Daniel
    for (var i=0; startDato <= slutDato; i++) {
        november.push(new Date(startDato.setDate(startDato.getDate() +1)));
    }
    return november
}
// Laver 3 objekter udfra klassen Film -Daniel
var filmEt = new Film(
    "Joker",
    "Thriller",
    "120",
    "16",
    "Denne film handler om skurke",
    novemberEt(),
);

var filmTo = new Film(
    "Avengers",
    "Action Thriller",
    "150",
    "12",
    "Denne film handler om superhelte",
    19,
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
    Film.lavFilm(filmEt)

};


document.getElementById('buttonTo').onclick = function(){
    Film.lavFilm(filmTo)
};

document.getElementById('buttonTre').onclick = function(){
    Film.lavFilm(filmTre)
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
