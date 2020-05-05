// en metode der gør at admin, kan se hvilket telefon nummer, der hører til hvilket navn. og som så viser navnet på Useren nedeunder.
//TODO: skriv om så, man kun finder User en gang
function showUser(){
    let d = document.getElementById('enteredNumber')
    let target = axios.post('http://localhost:3000/users/findOne',{
        tlfNumber:d.value
    })
        .then(result => {
            document.getElementById('navn').innerHTML = result.data.firstName + ' ' + result.data.lastName;
            document.getElementById('number').innerHTML = result.data.tlfNumber;
            console.log(result)
            return result
        })
        .catch(error => {
            console.log(error.result)
        })
}

function deleteUser(){
    let d = document.getElementById('enteredNumber')
    let target = axios.post('http://localhost:3000/users/findOne',{
        tlfNumber:d.value
    })
        .then(result => {
            axios.delete('http://localhost:3000/users/'+ result.data._id)
                .then(result => {
                console.log(result)
                return result
            })
                .catch(error => {
                    console.log(error.result)
                })
        })
        .catch(error => {
            console.log(error.result)
        })
}

function makeAUserAdmin(){
    let d = document.getElementById('enteredNumber')
    let target = axios.post('http://localhost:3000/users/findOne',{
        tlfNumber:d.value
    })
        .then(result => {
            axios.patch('http://localhost:3000/users/'+ result.data._id, [{propName:'userType',value: 'admin'}])
                .then(result => {
                    console.log(result)
                    return result
                })
                .catch(error => {
                    console.log(error.result)
                })
        })
        .catch(error => {
            console.log(error.result)
        })
}
// Funktionen addMovie poster filmen til API'en som sørger for at lægge det i databasen.
function addMovie(){
    //TODO: post en instans af film klassen.
    axios.post('http://localhost:3000/films/', {
        filmName: document.getElementById("filmName").value,
        genre: document.getElementById("genre").value,
        filmLength: document.getElementById("filmLength").value,
        ageRestriction: document.getElementById("ageRestriction").value,
        description: document.getElementById("description").value
    })
        .then(result=>{console.log(result)})
        .catch(error => {
            console.log(error.result)
        })
}

// Denne funktion laver en showing for en konkret film i en cinemahall som postes i databasen via API'en.
function makeShowing() {
    let showingbutton = document.getElementById('showingbutton')
    showingbutton.className = 'showingButtons'
    showingbutton.style.display = 'none'
    let showingDiv = document.getElementById('makeShowing')
    let showingForm =  document.createElement('form');
    showingDiv.appendChild(showingForm)
    //Her hentes alle film fra databasen
    axios.get('http://localhost:3000/films/')
        .then(result => {
        let films = result.data.products
            //For hver film kører nedenstående funktion
        films.forEach(film => {
            let filmName = document.createElement('p')
            filmName.innerHTML = film.filmName
            showingForm.appendChild(filmName)
            let button = document.createElement('button')
            button.type = 'button'
            button.id = film.filmName
            button.innerHTML = 'Vælg film'
            button.className = 'showingButtons'
            filmName.appendChild(button)
            // Når Vælg film kanppen trykkes, smides filmId'et i session storage og knappen forsvinder
            document.getElementById(film.filmName).addEventListener('click', () => {
                showingForm.innerHTML = ''
                sessionStorage.setItem('filmId', film.filmId)
                // Nedenfor hentes alle sale i databasen
                axios.get('http://localhost:3000/cinemahalls').then(result => {
                    let cinemahalls = result.data
                    // Der foretages samme html manipulationer som med film
                    cinemahalls.forEach(cinemahall => {
                        let hallName = document.createElement('p')
                        hallName.innerHTML = cinemahall.hallName
                        showingForm.appendChild(hallName)
                        let button = document.createElement('button')
                        button.type = 'button'
                        button.id = cinemahall.hallName
                        button.innerHTML = 'Vælg sal'
                        button.className = 'showingButtons'
                        hallName.appendChild(button)
                        document.getElementById(cinemahall.hallName).addEventListener('click', () => {
                            sessionStorage.setItem('hallId', cinemahall._id)
                            showingForm.innerHTML = ''
                            let dato = document.createElement('input')
                            dato.type = 'date'
                            let time = document.createElement('input')
                            time.type = 'time'
                            showingForm.appendChild(dato)
                            showingForm.appendChild(time)
                            let button = document.createElement('button')
                            button.type = 'button'
                            button.id = 'date'
                            button.innerHTML = 'vælg spilletidspunkt'
                            button.className = 'showingButtons'
                            showingForm.appendChild(button)
                            document.getElementById('date').addEventListener('click', () => {
                                //Nedenfor sættes dato og time sammen
                                let dateTime = dato.value + ' ' + time.value
                                //TODO: lav til en instans af Showing klassen
                                //Showingen postes nu til databasen
                                axios.post('http://localhost:3000/showings', {
                                    film: sessionStorage.getItem('filmId'),
                                    dateTime: dateTime,
                                    hall: sessionStorage.getItem('hallId')
                                }).then(result => {
                                    console.log(result)
                                    sessionStorage.removeItem('filmId')
                                    sessionStorage.removeItem('hallId')
                                }).catch(err => {
                                    console.log(err)
                                })
                            })
                        })
                    })

                })
            })
        })
    }).catch(err => {
        console.log(err)
    });
}