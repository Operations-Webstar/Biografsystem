/*eslint-env browser*/
//Classes
class User {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._tlfNumber = tlfNumber;
        this._dateOfBirth = dateOfBirth;
        this._password = password;
        this._booking = [];
    };
   //Laver en get funktion til alle de forskellige parametre, så de kan bruges længere nede. -Thomas
    get firstName() {
        return this._firstName
    };

    get lastName() {
        return this._lastName
    };

    get tlfNumber() {
        return this._tlfNumber
    };

    get dateOfBirth() {
        return this._dateOfBirth
    };

    get password() {
        return this._password
    };
    get booking(){
        return this._booking
    };





    //function bookSeat(){};
    //function cancelSeat(){};
    //function logIn(){};
    //function logOut(){};
    //function checkMovies(){};

    //en static funktion der laver en instans af klassen User, som man så bruger JSON, til at lagre i localStorage
    //Bruger forskellige if statements, til at sørge for den indtastede info er korrekt
    static createUser() {
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
    //Thomas
    //en static funktion der logger ind bruger ind, dette gøres ved at kalde den statisk. Den tjekker om telefonnummer og
    // password passer sammen. Hvis Ja, så sætter den localStorage keyen 'activeUser' til at være den User
    // der prøver at logge ind
    static logIn() {
        //laver de forskellige variabler(som hentes fra HTML), som skal bruges i forbundelse med funktionen
        let enteredNumber = document.getElementById('enteredNumber').value.toString();
        let enteredPassword = document.getElementById('enteredPassword').value;
        //Henter User, ved hjælp af Tools.getUser, som finder User via telefonnummeret
        let user = Tools.getUser();
        //if statement, der bruges til at tjekke om informationen er korrekt, og giver alerts alt efter hvad fejlen er.
        if (enteredNumber === '' || enteredPassword === ''){
            alert('Missing information')
        } else if(user === undefined){
          alert('No user with this number')
        } else if (enteredNumber !== user._tlfNumber || enteredPassword !== user._password) {
            alert('Wrong pass')
        }  else {
                //Sætter keyen activeUser til at være lig den user, som lige er logget ind. Så den kan tilgås senere.
            // activeUser nøglen, vil være lig at en user er logget ind.
                localStorage.setItem('activeUser', JSON.stringify(user));
                //Sender en videre til bookingsiden
                window.location.href = 'index.html';
            }
    };
   //En funktion, der fjerner den nuværende bruger, også smider et none objekt op i localstorage Thomas
    //grunden til at none er et objekt, er at så virker JSON, bedre i andre metoder, når man parser.
    // Hvis vi bare have lavet en string 'none', vil der komme en fejl, når vi bruger JSON.parse.
   signOut(){
       let none = {none:'none'};
       localStorage.setItem('activeUser', JSON.stringify(none));
   };

}

//Thomas:
class Admin extends User {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password, adminRights){
        super(firstName, lastName, tlfNumber, dateOfBirth, password);
        this._adminRights = adminRights
    }
    get adminRights(){
        return this._adminRights
    }
    set adminRights(x){
    this._adminRights = x;
    }

    //en metode der gør at admin, kan se hvilket telefon nummer, der hører til hvilket navn.
    showUser(){
        let target = Tools.getUser();
        if(target === undefined){
            alert('User do not exist')
        }else {
      document.getElementById('navn').innerHTML = target._firstName + ' ' + target._lastName;
           document.getElementById('number').innerHTML = target._tlfNumber}
    }

    //En metode som fjerner en user fra det gemte array, som ligger i localstorage
    deleteUser(){
            let storedU = Tools.getAllUsers();
            storedU.splice(Tools.getUserIndex(), 1);
            localStorage.setItem('users', JSON.stringify(storedU))
    }
    //En metode som giver en user fra det gemte array, admin rettigheder.
    makeAdmin(){
        let target = Tools.getUser();
        let storedU = Tools.getAllUsers();
        target._adminRights = 'true';
        storedU[Tools.getUserIndex()] = target;
    localStorage.setItem('users', JSON.stringify(storedU))
}
    //en metoder, der resseter systemet, men stadig lægger en none objekt op i active user
    //dette gøres kun for synets skyld.
    clearStorage(){
        localStorage.clear();
        let none = {none:'none'};
        localStorage.setItem('activeUser', JSON.stringify(none));
    };
}


