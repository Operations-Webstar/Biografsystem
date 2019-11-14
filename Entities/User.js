
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

    //function bookSeat(){};
    //function cancelSeat(){};
    //function logIn(){};
    //function logOut(){};
    //function checkMovies(){};

    //Utility functions, har lavet nogle forskellige metoder, som skal bruges til at få noget info ud af localstorage
    // så vi kan arbejde med dem i andre metoder osv.
    //getAllUsers, bruges til at få fat i et Array med de users, som er gemt i localstorage
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

    //Bruges til at få fat i en helt bestemt user, så man f.eks. kan logge den user ind, eller finde
    //useren i systemet, baseret på userens telefonnummer, da det er vores ID til useren.
    static getUser() {
        let users = this.getAllUsers();
        let enteredNumber = document.getElementById('enteredNumber').value.toString();
        for(let i = 0; i < users.length; i++) {
            if (enteredNumber === users[i]._tlfNumber) {
                return users[i];
            }
        }
    };

    //Finder her hvad den indtastede users id er, så man kan manipulere Arrayet, i andre funktioner
    //f.eks. hvis man vil slette en specifik user eller gøre dem til admin
    static getUserIndex() {
        let users = this.getAllUsers();
        let enteredNumber = document.getElementById('enteredNumber').value.toString();
        for (let i = 0; i < users.length; i++) {
            if (enteredNumber === users[i]._tlfNumber) {
                return i;
            }
        }
    };

    //Man finder den user, som lige nu er Aktiv, dvs. den user som er logget ind, og om den user
    //er admin eller user, derved også få tilgang til deres metoder.
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

    //skal bruges til at finde ud af, hvad den aktive users index er, så man kan manipulere arrayet
    //f.eks. hvis man booker et sæde, så skal den kunne smides op i Arrayet igen, men beholder sæderne.
    static getActiveUserIndex() {
        let users = this.getAllUsers();
        let userNumber = this.getActiveUser();
        for (let i = 0; i < users.length; i++) {
            if (userNumber === users[i]._tlfNumber) {
                return i;
            }
        }
    };

    //Endnu en funktion, for a lave en instans af user klassen, som man så kan smide op i local storage
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
    //En utility funktion, der gør en bruger aktiv, så alt info omkring den bruger, bliver smidt over i et array
    //så kan man nemlig acces den user, og tjekke om den pågældende user er logget ind.
    //derudover tjekker den også om telefon nummer og kodeord passer sammen.
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
   //En funktion, der fjerner den nuværende bruger, også smider et none objekt op i localstorage Thomas
    //grunden til det er et objekt, er at så virker JSON, bedre i andre metoder.
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

    //en metode der gør at admin, kan se hvilket telefon nummer, der hører til hvilket navn.
    showUser(){
        let target = User.getUser();
        if(target === undefined){
            alert('User do not exist')
        }else {
      document.getElementById('navn').innerHTML = target._firstName + ' ' + target._lastName;
           document.getElementById('number').innerHTML = target._tlfNumber}
    }

    //En metode som fjerner en user fra det gemte array, som ligger i localstorage
    deleteUser(){
            let storedU = User.getAllUsers();
            storedU.splice(User.getUserIndex(), 1);
            localStorage.setItem('users', JSON.stringify(storedU))
    }
    //En metode som giver en user fra det gemte array, admin rettigheder.
    makeAdmin(){
        let target = User.getUser();
        let storedU = User.getAllUsers();
        target._adminRights = 'true';
        storedU[User.getUserIndex()] = target;
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
//Global Variable
let activeUser = User.getActiveUser();
//Global functions
//en funktion som hiver den aktive user ud af localstorage, og viser så hvilke knapper som er relevante
//for useren
const hideButtons = () => {
    if (activeUser !== "none") {
        document.getElementById("logIn").style.display = "none";
        document.getElementById("signIn").style.display = "none";
    } else if (activeUser === "none" || localStorage.getItem('activeUser') == null) {
        document.getElementById('logOut').style.display = "none";}
    if (activeUser._adminRights !== "true"){
        document.getElementById('Admin').style.display = "none";}
};
//gør at funktionen gør på alle loads
window.onload = hideButtons();
//Thomas
//at alle elementer med Id logOut, får en click funktionen
document.getElementById('logOut').addEventListener('click', User.signOut);


