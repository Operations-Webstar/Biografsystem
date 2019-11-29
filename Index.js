function lavFilm(filmNummer) {
    document.getElementById("filmName").innerHTML = filmNummer.filmName;
    document.getElementById("description").innerHTML = filmNummer.description;
    document.getElementById("genre").innerHTML = "Filmens genre: " + filmNummer.genre;
    document.getElementById("filmLength").innerHTML = "Filmens længde: " + filmNummer.filmLength + " minutter";
    document.getElementById("ageRestriction").innerHTML = "Aldersgrænse: " + filmNummer.ageRestriction;
    document.getElementById("description").innerHTML = filmNummer.description;
    document.getElementById("Book").value = filmNummer.filmName;
    bookup.style.display = "block";
    sessionStorage.setItem('film', JSON.stringify(filmNummer))
}

function bookNu(){
    var chosenFilm = JSON.parse(sessionStorage.getItem('film'));
    if(Film.ageCheck(chosenFilm, activeUser.dateOfBirth)) {
    window.location = "testcalendar.html" }
    else {
        alert("Du er ikke gammel nok til at se denne film!")
    }
}