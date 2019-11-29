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

