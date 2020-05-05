// Følgende funktion finder showings for den valgte film og tilføjer dem til session storage, som kalenderen kan trække ud.
//async gør at funktionen returner et promise.
async function retriveShowings() {
    //await gør at Javascript venter til at det her promise er ordnet før den kører videre.
    await axios.post('http://localhost:3000/showings/findAllForOneFilm', {filmId: JSON.parse(sessionStorage.getItem('film')).filmId})
        .then(result => {
        sessionStorage.setItem('SelectedMovieShowings', JSON.stringify(result.data));
        sessionStorage.removeItem('film')
    })
        .catch(error =>
        {console.log(error)})

}
// funktion i pop uppen som tjekker om man er logget ind og er gammel nok til at se den valgte film.
// Gør begge dele sig gældende, sendes man som bruger videre til kalenderen.
function bookNu(){
    var chosenFilm = JSON.parse(sessionStorage.getItem('film'));
    var active = Tools.getActiveUser()
    if(active == null){
        alert('Du skal være logget ind for at vælge film')
    }
    else if(Film.ageCheck(chosenFilm, active.dateOfBirth)) {
        //gør at det først er efter et furfilled promise den går videre.
       retriveShowings().then(r => window.location = "calendar.html")
    }
    else {
        alert("Du er ikke gammel nok til at se denne film!")
    }
}

// Følgende er en funktion der laver alle filmknapperne.
function createFilmButtons() {
    // Alle film fra databasen hentes og laves til en knap som ved klik åbner en pop up
    axios.get('http://localhost:3000/films/')
        .then(result => {
            let filmData = result.data.products
            let div = document.getElementById('FilmDiv')
            filmData.forEach((oneFilm, index) => {
                let id = oneFilm.filmId
                oneFilm = new Film(oneFilm.filmName, oneFilm.genre, oneFilm.filmLength, oneFilm.ageRestriction, oneFilm.description)
                oneFilm.filmId = id
                let button = document.createElement('button')
                button.className = "Knap"
                let img = document.createElement("img")
                img.className = "vinduebillede"
                img.src = "https://previews.123rf.com/images/diawka/diawka1908/diawka190800018/128941916-cinema-concept-striped-boxes-with-popcorn-3d-glasses-light-box-with-coming-soon-text-and-copy-space-.jpg"
                let nameForFilm = document.createElement('h1')
                nameForFilm.id = index
                nameForFilm.innerHTML = oneFilm.filmName
                //Pop-uppen åbner op og viser mere information om den valgte film.
                button.addEventListener('click', () => {
                    let filmNummer = oneFilm
                    document.getElementById("filmName").innerHTML = filmNummer.filmName;
                    document.getElementById("description").innerHTML = filmNummer.description;
                    document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
                    document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
                    document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
                    bookup.style.display = "block";
                    // Filmdataen bliver lageret i session storage
                    sessionStorage.setItem('film', JSON.stringify(filmNummer))

                })

                div.appendChild(button)
                button.appendChild(img)
                button.appendChild(nameForFilm)
            // Trykker man uden for pop-uppen lukker den
                window.onclick = function(event) {
                    if(event.target === bookup) {
                        bookup.style.display = "none";
                    }
                }

            })
        })
}
window.onload = createFilmButtons()


//  Fortryd knappen kører en anonym funktion, som lukker pop-up boksen hvis brugeren trykker på fortryd.
Fortryd.onclick = function() {
    bookup.style.display = "none";
};