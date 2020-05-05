/*eslint-env browser*/
//Classes
class User {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.tlfNumber = tlfNumber;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        //this.booking = [];
    };
    //function bookSeat(){};
    //function cancelSeat(){};
    //function logIn(){};
    //function logOut(){};
    //function checkMovies(){};

    static login(){
        // laver en div, som kommer til at fylde hele siden
        let divLogin = document.createElement("div");
        divLogin.id = 'popup';

        // laver endnu en div, inden i som bliver en boks, som kommer til at ligge i midten af siden
        let divIn = document.createElement("div");
        divIn.className = 'bookupIndhold';

        // laver form elementet i HTML, så jeg kan gøre brug af dets egenskaber
        let loginForm =  document.createElement('form');

        // laver en entered number med input Tag, som tager imod et userinput, og har en style.margin for udseendets skyld
        let enteredNumber = document.createElement('input');
        enteredNumber.value = '';
        enteredNumber.placeholder= 'number';
        enteredNumber.id = 'enteredNumber';

        // Laver en entered password med input tag, samme ide, som med userinputet
        let enteredPassword = document.createElement('input');
        enteredPassword.value = '';
        enteredPassword.placeholder = 'password';

        // laver en knap, value Log in
        let logInButton = document.createElement('input');
        logInButton.type = 'button';
        logInButton.value = 'Log in';

        // laver en knap, value Annuller
        let cancelButton = document.createElement('input');
        cancelButton.type = 'button';
        cancelButton.value = 'Annuller';

        // Sætter det hele ind på siden
            document.body.appendChild(divLogin);
            divLogin.appendChild(divIn);
            divIn.appendChild(loginForm);
            loginForm.appendChild(enteredNumber);
            loginForm.appendChild(enteredPassword);
            loginForm.appendChild(logInButton);
            loginForm.appendChild(cancelButton);

            //sætter en eventlistener på Login knappen, så den den kan tjekke om en bruger, har rigtige login informationer

        // sætter en eventlistener på Login knappen, så den den kan tjekke om en bruger, har rigtige login informationer
        logInButton.addEventListener('click', function () {
            // if statement, der bruges til at tjekke om informationen er korrekt, og giver alerts alt efter hvad fejlen er.
            if (enteredNumber.value === '' || enteredPassword.value === ''){
                alert('Missing information')
            }
                else {
                //Sætter keyen activeUser til at være lig den user, som lige er logget ind. Så den kan tilgås senere.
                // activeUser nøglen, vil være lig at en user er logget ind.
                axios.post('http://localhost:3000/users/login',{tlfNumber: enteredNumber.value,password: enteredPassword.value})
                    .then(result => {
                        console.log(result)
                        let sessionData = {
                            userId: result.data.userId,
                            userType: result.data.userType,
                            dateOfBirth: result.data.dateOfBirth,
                            firstName: result.data.firstName,
                            lastName: result.data.lastName
                        }
                        sessionStorage.setItem('activeUser', JSON.stringify(sessionData))
                        window.location.href = 'Index.html'
                })
                .catch(error => {
                    console.log(error)
                })
                //Sender en videre til bookingsiden
                //window.location.href = 'index.html';
        }});

        // gør at knappen lukker for diven.
        cancelButton.addEventListener('click',function () {
            divLogin.style.display = 'none'
        });
        // at hvis man trykker på divLogin, så vil den lukke ned.
        window.onclick = function (event) {
            if(event.target === divLogin)
                divLogin.style.display = 'none'
        }

    }
   // En funktion, der fjerner den nuværende bruger, også smider et none objekt op i localstorage
    //grunden til at none er et objekt, er at så virker JSON, bedre i andre metoder, når man parser.
    // Hvis vi bare have lavet en string 'none', vil der komme en fejl, når vi bruger JSON.parse.
   static signOut(){
        sessionStorage.removeItem('info')
       sessionStorage.removeItem('activeUser');
   };
}


class Admin extends User {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password){
        super(firstName, lastName, tlfNumber, dateOfBirth, password);
    }


    // En metode som fjerner en user fra det gemte array, som ligger i localstorage
   /* deleteUser(){
            Tools.allUsers.splice(Tools.getUserIndex(), 1);
            localStorage.setItem('users', JSON.stringify(Tools.allUsers))
    }*/

    // Sletning af bruger

    // En metode som giver en user fra det gemte array, admin rettigheder.
    makeAdmin(){
        let target = Tools.getUser();
        target._adminRights = 'true';
        Tools.allUsers[Tools.getUserIndex()] = target;
    localStorage.setItem('users', JSON.stringify(Tools.allUsers))
}
    // en metoder, der resseter systemet, men stadig lægger en none objekt op i active user
    //dette gøres kun sådan at JSON.parse virker, og ikke kaster en error

}

