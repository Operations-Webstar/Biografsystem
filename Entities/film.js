import {user} from 'User.js'
class film {
    constructor(filmName, filmId, genre, threeD, ageRestriction) {
        this.filmName = filmName;
        this.filmId = filmId;
        this.genre = genre;
        this.threeD = threeD;
        this.ageRestriction = ageRestriction;
}
    getAge(dateOfBirth){
        //finder både idags dato, og finder userindsat date her
        let today = new Date();
        let birthDate = user().dateOfBirth;
        //sætter age i lige med idag årstal minus birthDate årstal og trækker dem fra hinanden
        var age = today.getFullYear() - birthDate.getFullYear();
        //sætter m lig med nuværende måned - fødselsdags måned
        let m = today.getMonth() - birthDate.getMonth();
        //Hvis 0 er større end M, har personen allerede haft fødselsdag, så behøves der ikke trækkes 1 fra.
        //Dog hvis m === 0 eller at idag's dag ikke er større end fødselsdags dagen, så minusser man age med 1
        // da personen ikke har nået at have haft fødselsdag
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        }
        return age
    }

ageCheck(film, user){
    var film = this.ageRestriction
    var user = this.getAge()
    if(film <= user) {
        return true
    } else {
        return false
    }
}
}

var joker = new film('joker', 1, 'Horror',true, 18)
console.log(film().ageCheck(joker))

