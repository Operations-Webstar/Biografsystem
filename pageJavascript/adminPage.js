
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
            axios.patch('http://localhost:3000/users/'+ result.data._id, [{propName:'firstName',value: 'Ole'}])
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