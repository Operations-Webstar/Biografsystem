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

    static login(){
        let divLogin = document.createElement("div");
        divLogin.id = 'popup';

        let divIn = document.createElement("div");
        divIn.className = 'bookupIndhold';

        let loginForm =  document.createElement('form');

        let enteredNumber = document.createElement('input');
        enteredNumber.value = '';
        enteredNumber.style.margin = '10px';
        enteredNumber.placeholder= 'number';
        enteredNumber.id = 'enteredNumber';

        let enteredPassword = document.createElement('input');
        enteredPassword.value = '';
        enteredPassword.style.margin = '10px';
        enteredPassword.placeholder = 'password';

        let logInButton = document.createElement('input');
        logInButton.type = 'button';
        logInButton.value = 'Log in';
        logInButton.style.margin = '10px';

        let cancelButton = document.createElement('input');
        cancelButton.type = 'button';
        cancelButton.value = 'Annuller';

        document.body.appendChild(divLogin);
        divLogin.appendChild(divIn);
        divIn.appendChild(loginForm);
        loginForm.appendChild(enteredNumber);
        loginForm.appendChild(enteredPassword);
        loginForm.appendChild(logInButton);
        loginForm.appendChild(cancelButton);

        logInButton.addEventListener('click', function () {
            let user = Tools.getUser();
            //if statement, der bruges til at tjekke om informationen er korrekt, og giver alerts alt efter hvad fejlen er.
            if (enteredNumber.value === '' || enteredPassword.value === ''){
                alert('Missing information')
            } else if(user === undefined){
                alert('No user with this number')
            } else if (enteredNumber.value !== user._tlfNumber || enteredPassword.value !== user._password) {
                alert('Wrong pass')
            }  else {
                //Sætter keyen activeUser til at være lig den user, som lige er logget ind. Så den kan tilgås senere.
                // activeUser nøglen, vil være lig at en user er logget ind.
                localStorage.setItem('activeUser', JSON.stringify(user));
                //Sender en videre til bookingsiden
                window.location.href = 'index.html';
            }
        });
        cancelButton.addEventListener('click',function () {
            divLogin.style.display = 'none'
        });
        window.onclick = function (event) {
            if(event.target === divLogin)
                divLogin.style.display = 'none'
        }

    }
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

