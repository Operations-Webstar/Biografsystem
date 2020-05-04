/* Daniel: Funktionen lavFilm konstrueres med filmNummer som parameter. I funktionens statement henter den seks HTML elementer.
De fem elementer bliver erstattet med filmNummer's(Film objektet's) tilsvarende værdi.
L. 10 ændre funktionen en i CSS'en så pop-up boksen bliver synlig, når funktionen køres.
L. 11 konverteres værdien af funktionens parameter til JSON.string, som gemmes med sessionStorage med 'film' som key.
*/

/* Daniel: Der konstrueres bookNu funktionen, som tildeler variablen chosenFilm, det filmobjekt der er gemt i sessionStore med 'film' som key.
 Fra L. 20 bruges if/else statement og en nyttefunktion til at vise en alert, hvis brugeren ikke er logget ind.
 L. 23 ageCheck funktionen bruges til tjekke om brugeren er gammel nok, til at se filmen og videredirigeres til calender.html
 l. 26 Der vises en alert, hvis brugeren ikke er gammel nok. -Daniel
 */

async function retriveShowings() {
    await axios.post('http://localhost:3000/showings/s', {filmId: JSON.parse(sessionStorage.getItem('film')).filmId}).then(result => {
        sessionStorage.setItem('SelectedMovieShowings', JSON.stringify(result.data));
        sessionStorage.removeItem('film')
    })
        .catch(error =>
        {console.log(error)})

}

function bookNu(){
    var chosenFilm = JSON.parse(sessionStorage.getItem('film'));
    var active = Tools.getActiveUser()
    if(active == null){
        alert('Du skal være logget ind for at vælge film')
    }
    else if(Film.ageCheck(chosenFilm, active.dateOfBirth)) {
       retriveShowings().then(r => window.location = "calendar.html")
    }
    else {
        alert("Du er ikke gammel nok til at se denne film!")
    }
}


function createFilmButtons() {
    axios.get('http://localhost:3000/films/')
        .then(result => {
            let filmData = result.data.products
            let div = document.getElementById('FilmDiv')
            filmData.forEach((oneFilm, index) => {
                let button = document.createElement('button')
                button.className = "Knap"
                let img = document.createElement("img")
                img.className = "vinduebillede"
                img.src = "https://previews.123rf.com/images/diawka/diawka1908/diawka190800018/128941916-cinema-concept-striped-boxes-with-popcorn-3d-glasses-light-box-with-coming-soon-text-and-copy-space-.jpg"
                let nameForFilm = document.createElement('h1')
                nameForFilm.id = index
                nameForFilm.innerHTML = oneFilm.filmName
                button.addEventListener('click', () => {
                    let filmNummer = oneFilm
                    document.getElementById("filmName").innerHTML = filmNummer.filmName;
                    document.getElementById("description").innerHTML = filmNummer.description;
                    document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
                    document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
                    document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
                    bookup.style.display = "block";
                    sessionStorage.setItem('film', JSON.stringify(filmNummer))

                })

                div.appendChild(button)
                button.appendChild(img)
                button.appendChild(nameForFilm)

                window.onclick = function(event) {
                    if(event.target === bookup) {
                        bookup.style.display = "none";
                    }
                }

            })
        })
}
window.onload = createFilmButtons()



/* Daniel: Her hentes den første knap ned, og tildeles en funktion med lavFilm funktionen inde.
lavFilm køres med den tilsvarende film som parameter
L. 61-63 window.onclick tildeles en anonym funktion, med et if/else statement, som ændrer style.display til none hvis brugeren
klikker andre steder end inden i pop-up boksen. Altså pop-up boksen lukker, hvis brugeren klikker andre steder end den.
*/
// Random number function


// Daniel: Fortryd knappen kører en anonym funktion, som lukker pop-up boksen hvis brugeren trykker på fortryd.
Fortryd.onclick = function() {
    bookup.style.display = "none";
};