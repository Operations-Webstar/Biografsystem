//det her er klassen, som vi skal bruge i vores user, med de tilsvarende funktioner
/*eslint-env browser*/
//Classes
class User {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._tlfNumber = tlfNumber;
        this._dateOfBirth = dateOfBirth;
        this._password = password;
    };

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

    //function bookSeat(){};
    //function cancelSeat(){};
    //function logIn(){};
    //function logOut(){};
    //function checkMovies(){};

    //Utility functions
    static getAllUsers(){
        let storedUsers = [];
        //Hvis users i localStorage er lig nul, så pusher man en new Admin(Thomas) ind i arrayet
        //ellers så henter man localstorage ned, også laver den til javascript array med objekter. Rasmus
        if (localStorage.getItem('users') === null) {
            storedUsers.push(new Admin('Thomas', 'Lindskov', '30110976', '19-02-1996', 'hejsa', 'true'))
        } else {
            storedUsers = JSON.parse(localStorage.getItem('users'))
        }
        return storedUsers
    };

    static getUser() {
        let users = this.getAllUsers();
        let enteredNumber = document.getElementById('enteredNumber').value.toString();
        for(let i = 0; i < users.length; i++) {
            if (enteredNumber === users[i]._tlfNumber) {
                return users[i];
            }
        }
    };

    static getUserIndex() {
        let users = this.getAllUsers();
        let enteredNumber = document.getElementById('enteredNumber').value.toString();
        for (let i = 0; i < users.length; i++) {
            if (enteredNumber === users[i]._tlfNumber) {
                return i;
            }
        }
    };

    static getActiveUser() {
        let localUser = JSON.parse(localStorage.getItem('activeUser'));
        let activeUser = '';
        if(localUser.none === 'none'){
            activeUser = 'none'
        } else if (localUser._adminRights === 'true'){
            activeUser = new Admin(localUser._firstName, localUser._lastName, localUser._tlfNumber, localUser._dateOfBirth, localUser._password, localUser._adminRights);
        } else {
            activeUser = new User(localUser._firstName, localUser._lastName, localUser._tlfNumber, localUser._dateOfBirth, localUser._password);
        }
        return activeUser
    };

    static getActiveUserIndex() {
        let users = this.getAllUsers();
        let userNumber = this.getActiveUser();
        for (let i = 0; i < users.length; i++) {
            if (userNumber === users[i]._tlfNumber) {
                return i;
            }
        }
    };

    static createUser() {
        let form_valid = true;
        let validation_message = "";
        let storedUsers = this.getAllUsers();
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
        // arrayet ind i localstorage via stringify. ellers så alert den (validation_message) med tilhørende strings. Thomas
        if (form_valid === true) {
            storedUsers.push(new User(this.firstName, this.lastName, this.tlfNumber, this.dateOfBirth, this.password));
            localStorage.setItem('users', JSON.stringify(storedUsers));
            window.location.href = 'Login.html'
        } else {
            alert(validation_message);
        }
    };
    //Thomas
    static logIn() {
        //laver de forskellige variabler(som hentes fra HTML), som skal bruges i forbundelse med funktionen
        let enteredNumber = document.getElementById('enteredNumber').value.toString();
        let enteredPassword = document.getElementById('enteredPassword').value;
        //Henter localstorage med JSON.parse, så jeg får objekterne ned i mit Script igen
        let user = this.getUser();
        // sætter et for loop igang, som kører igennem storedUsers arrayet, indtil den finder et match
        // når den finder match så sætter den login status til true, og sender en til index1.html
        // sætter også javascript variablen til true, så næste if kan virke korrekt.
        if (enteredNumber === '' || enteredPassword === ''){
            alert('Missing information')
        } else if(user === undefined){
          alert('No user with this number')
        } else if (enteredNumber !== user._tlfNumber || enteredPassword !== user._password) {
            alert('Wrong pass')
        }  else {
                let logIn = user;
                localStorage.setItem('activeUser', JSON.stringify(user));
                window.location.href = 'index.html';
                return logIn;
            }
    };
   //Thomas
   static signOut(){
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

    showUser(){
        let target = User.getUser();
        if(target === undefined){
            alert('User do not exist')
        }else {
      document.getElementById('navn').innerHTML = target._firstName + ' ' + target._lastName;
           document.getElementById('number').innerHTML = target._tlfNumber}
    }

    deleteUser(){
        let userIndex = User.getUserIndex();
            let storedU = User.getAllUsers();
            storedU.splice(userIndex, 1);
            localStorage.setItem('users', JSON.stringify(storedU))
    }

    makeAdmin(){
        let target = User.getUser();
        let index = User.getUserIndex();
        let storedU = JSON.parse(localStorage.getItem('users'));
        target._adminRights = 'true';
        storedU[index] = target;
    localStorage.setItem('users', JSON.stringify(storedU))
}
    clearStorage(){
        localStorage.clear();
        let none = {none:'none'};
        localStorage.setItem('activeUser', JSON.stringify(none));
    };
}
//Global Variable
let activeUser = User.getActiveUser();
//Global functions
const hideButtons = () => {
    let act = User.getActiveUser();
    if (act !== "none") {
        document.getElementById("logIn").style.display = "none";
        document.getElementById("signIn").style.display = "none";
    } else if (act === "none" || localStorage.getItem('activeUser') == null) {
        document.getElementById('logOut').style.display = "none";}
    if (act._adminRights !== "true"){
        document.getElementById('Admin').style.display = "none";}
};
window.onload = hideButtons();
//Thomas
document.getElementById('logOut').addEventListener('click', User.signOut);
