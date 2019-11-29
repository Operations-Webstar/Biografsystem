class Film {
    constructor(filmName, genre, filmLength, ageRestriction, description) {
        this.filmName = filmName;
        this.genre = genre;
        this.filmLength = filmLength;
        this.ageRestriction = ageRestriction;
        this.description = description;
    }

     static ageCheck(Film, User){
        let filmRes = Film.ageRestriction;
        let userAge = Tools.getAge(User);
        return filmRes <= userAge;
    }
}



