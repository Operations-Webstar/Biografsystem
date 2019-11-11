class Film {
    constructor(filmName, genre, filmLength, ageRestriction, description) {
        this.filmName = filmName;
        this.genre = genre;
        this.filmLength = filmLength;
        this.ageRestriction = ageRestriction;
        this.description = description;
    }
    getAge(User){

        //finder både idags dato, og finder userindsat date her

        let today = new Date();

        //Bruger new date, så at user.dateOfbirth kommer i Dato format, så vi kan bruge de næste funktioner

        let dateOfBirth = new Date(User.dateOfBirth);
        if(typeof dateOfBirth === "undefined"){
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
            age -1
        }
        return age
    }

    ageCheck(Film, User){
        var filmRes = Film.ageRestriction;
        var userAge = Film.getAge(User);
        return filmRes <= userAge;
    }
}
// Laver 3 objekter udfra klassen Film -Daniel
var filmEt = new Film(
    "Joker",
    "Thriller",
    "120",
    "16",
    "Denne film handler om skurke"
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
    "Denne film handler om Batman"
);
// Laver en funktion, hvor man bare sætter filmen ind i funktionen og derefter laver den et film objekt -Daniel
function lavFilm(filmNummer) {
    document.getElementById("filmName").innerHTML = filmNummer.filmName;
    document.getElementById("description").innerHTML = filmNummer.description;
    document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
    document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
    document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
    document.getElementById("description").innerHTML = filmNummer.description;
    bookup.style.display = "block";

// Laver 3 knapper, for hver film -Daniel

}
buttonEt.onclick = function(){
    lavFilm(filmEt)
};

buttonTo.onclick = function(){
    lavFilm(filmTo)
};

buttonTre.onclick = function(){
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


var filmArrayEt = [filmEt, filmTo, filmTre];
var filmArrayTo = [filmTo, filmTre];
// Laver et array, der skal bruges til kalenderen -Daniel
var startDato = new Date("Nov 8, 2019 12:00:00");
var slutDato = new Date("Nov 30, 2019 12:00:00");
var november = [];
// Laver det gennem et loop, så koden fylder mindre og med dato funktionen -Daniel
for (var i=0; startDato <= slutDato; i++) {
    november.push(new Date(startDato.setDate(startDato.getDate() + 1)));
}
//Laver et alternativt manuelt multidimensiontelt array, da loop array'et ikke kan gøres multidimensionelt
//
var datoArray = [[filmArrayEt, filmArrayTo]];
console.log(datoArray[0][1]);
