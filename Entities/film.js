let user = require('./User.js');
class film {
    constructor(filmName, filmId, genre, threeD, ageRestriction) {
        this.filmName = filmName;
        this.filmId = filmId;
        this.genre = genre;
        this.threeD = threeD;
        this.ageRestriction = ageRestriction;
}
    getAge(user){
        //finder både idags dato, og finder userindsat date her
        let today = new Date();
        //Bruger new date, så at user.dateOfbirth kommer i Dato format, så vi kan bruge de næste funktioner
        let dateOfBirth = new Date(user.dateOfBirth);
        if(typeof dateOfBirth === "undefined"){
            console.log('no date of birth');
        } else {
           dateOfBirth = new Date(user.dateOfBirth)
        }
        //sætter age i lige med idag årstal minus birthDate årstal og trækker dem fra hinanden
        var age = today.getFullYear() - dateOfBirth.getFullYear();
        //sætter m lig med nuværende måned - fødselsdags måned
        let m = today.getMonth() - dateOfBirth.getMonth();
        //Hvis 0 er større end M, har personen allerede haft fødselsdag, så behøves der ikke trækkes 1 fra.
        //Dog hvis m === 0 eller at idag's dag ikke er større end fødselsdags dagen, så minusser man age med 1
        // da personen ikke har nået at have haft fødselsdag
        if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
        }
        return age
    }

ageCheck(film, user){
    var filmRes = film.ageRestriction;
    var userAge = film.getAge(user);
    if(filmRes <= userAge) {
        return true
    } else {
        return false
    }
}
}
let Thomas = new user(1, 'Thomas',1,'2005-02-19', 1);
let joker = new film('joker', 2 , 'horror', true, 18);
console.log(new film().ageCheck(joker, Thomas));

var joker = new film ("Joker", 2, "krimi, thriller",false, 15)

var onceInHollywood = new film ("Once Upon a Time... in Hollywood", 3, "komedie, drama", false, 15)

var  it2 = new film ( "IT 2", 4, "gyser", false, 15)

var avengers = new film ( "Avengers Endgame", 5,"action, adventure", true, 11)