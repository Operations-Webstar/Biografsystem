class Film {
    constructor(filmName, genre, filmLength, ageRestriction, description) {
        this.filmName = filmName;
        this.genre = genre;
        this.filmLength = filmLength;
        this.ageRestriction = ageRestriction;
        this.description = description;
    }


        static getAge(Birthday){

            //finder både idags dato, og finder userindsat date her

            let today = new Date();
            let dateOfBirth = Birthday;
            var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
            console.log(dateOfBirth.replace(pattern,'$3-$2-$1'));
            var dt = new Date(dateOfBirth.replace(pattern,'$3-$2-$1'));
            console.log(dt);

            //Bruger new date, så at user.dateOfbirth kommer i Dato format, så vi kan bruge de næste funktioner


            //sætter age i lige med idag årstal minus birthDate årstal og trækker dem fra hinanden

            let age = today.getFullYear() - dt.getFullYear();


            //sætter m lig med nuværende måned - fødselsdags måned

            let m = today.getMonth() - dt.getMonth();

            //Hvis 0 er større end M, har personen allerede haft fødselsdag, så behøves der ikke trækkes 1 fra.
            //Dog hvis m === 0 eller at idag's dag ikke er større end fødselsdags dagen, så minusser man age med 1
            // da personen ikke har nået at have haft fødselsdag

            if (m < 0 || (m === 0 && today.getDate() < dt.getDate())) {
                age - 1
            }
            return age
        }


     static ageCheck(Film, User){

        let filmRes = Film.ageRestriction;
        console.log(filmRes);
        let userAge = this.getAge(User);
        console.log(userAge);
         console.log(filmRes <= userAge);
        return filmRes <= userAge;
    }
}



