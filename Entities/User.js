//Klassen user oprettes med tilhørende metoder.
class User {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.tlfNumber = tlfNumber;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
    };

    //loginfunktion der laver en popup boks, som kan sættes på html.
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


        // sætter en eventlistener på Login knappen, så den den kan tjekke om en bruger, har rigtige login informationer
        logInButton.addEventListener('click', function () {
            // if statement, der bruges til at tjekke om informationen er korrekt, og giver en alert, hvis der mangler info i formen.
            if (enteredNumber.value === '' || enteredPassword.value === ''){
                alert('Missing information')
            }
                else {
                    // Laver en axios.post som sender login data til serveren, som derved verificerer at det er de samme informationer der er i databasen.
                axios.post('http://localhost:3000/users/login',{tlfNumber: enteredNumber.value,password: enteredPassword.value})
                    .then(result => {
                        console.log(result)
                        // Laver sessionData så lægges op i session storage således at man ikke skal hente informationen fra databasen flere gange.
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
        }});

        // gør at cancelButton knappen lukker for diven.
        cancelButton.addEventListener('click',function () {
            divLogin.style.display = 'none'
        });
        // at hvis man trykker på divLogin, så vil den lukke ned.
        window.onclick = function (event) {
            if(event.target === divLogin)
                divLogin.style.display = 'none'
        }
    }

   // Fjerner infor og activeUser fra session storage
   static signOut(){
        sessionStorage.removeItem('info')
       sessionStorage.removeItem('activeUser');
   };

}

// Adminklassen defineres som en inheritance af user-klassen.
class Admin extends User {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password){
        super(firstName, lastName, tlfNumber, dateOfBirth, password);
    }
}