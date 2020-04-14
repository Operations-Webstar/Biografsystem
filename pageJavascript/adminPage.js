
//Thomas: en metode der gør at admin, kan se hvilket telefon nummer, der hører til hvilket navn. og som så viser navnet på Useren nedeunder.
function showUser(){
    let target = Tools.getUser();
    if(target === undefined){
        alert('User do not exist')
    }else {
        document.getElementById('navn').innerHTML = target._firstName + ' ' + target._lastName;
        document.getElementById('number').innerHTML = target._tlfNumber}
}