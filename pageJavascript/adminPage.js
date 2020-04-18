
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