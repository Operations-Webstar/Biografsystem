//Thomas: en metode der gør at admin, kan se hvilket telefon nummer, der hører til hvilket navn. og som så viser navnet på Useren nedeunder.
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

function updateUser(){
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

function addMovie(){
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

function makeShowing() {
    let showingbutton = document.getElementById('showingbutton')
    showingbutton.className = 'showingButtons'
    showingbutton.style.display = 'none'
    let showingDiv = document.getElementById('makeShowing')
    let showingForm =  document.createElement('form');
    showingDiv.appendChild(showingForm)
    axios.get('http://localhost:3000/films/')
        .then(result => {
        let films = result.data.products
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
            document.getElementById(film.filmName).addEventListener('click', () => {
                showingForm.innerHTML = ''
                sessionStorage.setItem('filmId', film.filmId)
                axios.get('http://localhost:3000/cinemahalls').then(result => {
                    let cinemahalls = result.data
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
                                let dateTime = dato.value + ' ' + time.value
                                axios.post('http://localhost:3000/showings', {
                                    film: sessionStorage.getItem('filmId'),
                                    dateTime: dateTime,
                                    hall: sessionStorage.getItem('hallId')
                                }).then(result => {
                                    console.log(result)
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
//Thomas: laver form elementet i HTML, så jeg kan gøre brug af dets egenskaber

/*
    //Thomas: laver en entered number med input Tag, som tager imod et userinput, og har en style.margin for udseendets skyld
    let enteredNumber = document.createElement('input');
    enteredNumber.value = '';
    enteredNumber.placeholder= 'number';
    enteredNumber.id = 'enteredNumber';

    //Thomas: Laver en entered password med input tag, samme ide, som med userinputet
    let enteredPassword = document.createElement('input');
    enteredPassword.value = '';
    enteredPassword.placeholder = 'password';

    //Thomas: laver en knap, value Log in
    let logInButton = document.createElement('input');
    logInButton.type = 'button';
    logInButton.value = 'Log in';

    //Thomas: laver en knap, value Annuller
    let cancelButton = document.createElement('input');
    cancelButton.type = 'button';
    cancelButton.value = 'Annuller';

    //Thomas: Sætter det hele ind på siden
    document.body.appendChild(divLogin);
    divLogin.appendChild(divIn);
    divIn.appendChild(showingForm);
    loginForm.appendChild(enteredNumber);
    loginForm.appendChild(enteredPassword);
    loginForm.appendChild(logInButton);
    loginForm.appendChild(cancelButton);
*/
}