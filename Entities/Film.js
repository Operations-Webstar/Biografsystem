//  Konstruerer klassen Film med en constructor, som indeholder fem properties.
class Film {
    constructor(filmName, genre, filmLength, ageRestriction, description) {
        this.filmName = filmName;
        this.genre = genre;
        this.filmLength = filmLength;
        this.ageRestriction = ageRestriction;
        this.description = description;
    }
// Funktionen agecheck benyttes til at sikre at brugeren er gammel nok til at se den ønskede film.
     static ageCheck(Film, User){
        let filmRes = Film.ageRestriction;
        // getAge omdanner en date of birth til en alder, mere info findes i tools-klassen.
        let userAge = Tools.getActiveUser().getAge();
        return filmRes <= userAge;
    }
}



