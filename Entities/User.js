//det her er klassen, som vi skal bruge i vores user, med de tilsvarende funktioner
/*eslint-env browser*/


class user {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.tlfNumber = tlfNumber;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
    }
    //function bookSeat(){};
    //function cancelSeat(){};
    //function logIn(){};
    //function logOut(){};
    //function checkMovies(){};
}



function createUser() {
    let form_valid =true;
    let validation_message ="";
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let phone = document.getElementById('phoneNumber').value;
    let birthday = new Date(document.getElementById('bday').value);
    let password = document.getElementById('password').value;
    let storedUsers = [];

//tjekker om firstname har en værdi eller er tom, hvis ja, så bliver form_valid = false
    if (firstName == null || firstName=="") {
        validation_message += "First name must be filled in! \n";
        form_valid = false;
    }
//tjekker om lastName har en værdi eller er tom, hvis ja, så bliver form_valid = false
    if (lastName == null || lastName=="") {
        validation_message += "Last name must be filled in! \n";
        form_valid = false;
    }

//tjekker om phone er tom, om det ikke er et nummmer og om længden ikke er 8, hvis ja, så bliver form_valid = false
    if (phone == ""){
        validation_message += "Please enter a phone number \n";
        form_valid = false;
    } else if (isNaN(phone) ) {
        validation_message += "Phone numbers can only contain numbers! \n";
        form_valid = false
    } else if (phone.length!=8){
        validation_message += "Phone numbers can only have a length of 8 \n";
        form_valid = false;
    }

    //tjekker om birthday kommer ud som invalid date, hvis den gør, så bliver form_valid = false
    if(birthday == 'Invalid Date') {
        validation_message += "insert a real date\n"
        form_valid = false;
    }

    //tjekker om password er tom, lig null eller ikke længere end 3 karakter, hvis ja, så bliver form_valid = false
    if ((password == null || password=="") && password.length < 3) {
        validation_message += "your password must be longer than 3 characters \n";
        form_valid = false;
    }

    //Hvis users i localStorage er lig nul, så pusher man en new user(Thomas) ind i arrayet
    //ellers så henter man localstorage ned, også laver den til javascript array med objekter.
    if(localStorage.getItem("users") == null) {
        storedUsers.push(new user ('Thomas', 'Lindskov', 30110976, '19-02-1996', 'hejsa'))
    } else {
        storedUsers = JSON.parse(localStorage.getItem('users'))
    }

    //hvis form_valid == true dvs. at alle krav til sign in funktionen er blevet udfyldt, så sætter man storedUsers
    // arrayet ind i localstorage via stringify. ellers så alert den (validation_message) med tilhørende strings.
    if (form_valid === true) {
        storedUsers.push(new user(firstName, lastName, phone, birthday, password));
        localStorage.setItem('users', JSON.stringify(storedUsers));
    } else {
        alert(validation_message);
    }
}





