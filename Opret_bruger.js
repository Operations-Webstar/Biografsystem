//Rasmus
//en static funktion der laver en instans af klassen User, som man så bruger JSON, til at lagre i localStorage
//Bruger forskellige if statements, til at sørge for den indtastede info er korrekt
function createUser() {
    let form_valid = true;
    let validation_message = "";
    let storedUsers = Tools.getAllUsers();
    this.firstName = document.getElementById('firstName').value;
    this.lastName = document.getElementById('lastName').value;
    this.tlfNumber = document.getElementById('phoneNumber').value;
    this.dateOfBirth = new Date(document.getElementById('bday').value);
    this.password = document.getElementById('password').value;


//tjekker om firstname har en værdi eller er tom, hvis ja, så bliver form_valid = false, Rasmus
    if (this.firstName == null || this.firstName === "") {
        validation_message += "First name must be filled in! \n";
        form_valid = false;
    }
//tjekker om lastName har en værdi eller er tom, hvis ja, så bliver form_valid = false, Rasmus
    if (this.lastName == null || this.lastName === "") {
        validation_message += "Last name must be filled in! \n";
        form_valid = false;
    }

//tjekker om phone er tom, om det ikke er et nummmer og om længden ikke er 8, hvis ja, så bliver form_valid = false, Rasmus
    if (this.tlfNumber === "") {
        validation_message += "Please enter a phone number \n";
        form_valid = false;
    } else if (isNaN(this.tlfNumber)) {
        validation_message += "Phone numbers can only contain numbers! \n";
        form_valid = false
    } else if (this.tlfNumber.length !== 8) {
        validation_message += "Phone numbers can only have a length of 8 \n";
        form_valid = false;
    }

    //tjekker om birthday kommer ud som invalid date, hvis den gør, så bliver form_valid = false, Rasmus
    if (this.dateOfBirth === 'Invalid Date') {
        validation_message += "insert a real date\n";
        form_valid = false;
    }

    //tjekker om password er tom, lig null eller ikke længere end 3 karakter, hvis ja, så bliver form_valid = false, Rasmus
    if ((this.password == null || this.password === "") && this.password.length < 3) {
        validation_message += "your password must be longer than 3 characters \n";
        form_valid = false;
    }

    //hvis form_valid == true dvs. at alle krav til sign in funktionen er blevet udfyldt, så sætter man storedUsers
    // arrayet, nu må den nye bruger ind i localstorage via stringify.
    // ellers så alerter den (validation_message) med tilhørende strings. Rasmus/Thomas
    if (form_valid === true) {
        storedUsers.push(new User(this.firstName, this.lastName, this.tlfNumber, this.dateOfBirth, this.password));
        localStorage.setItem('users', JSON.stringify(storedUsers));
        window.location.href = 'Login.html'
    } else {
        alert(validation_message);
    }
};