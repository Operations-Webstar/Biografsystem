class Tools{
    //Utility functions, har lavet nogle forskellige metoder, som skal bruges til at få noget info ud af localstorage
    //så vi kan arbejde med dem i andre metoder osv.
    //getAllUsers, bruges til at få fat i et Array med de users, som er gemt i localstorage
    //Variable, som man skal manipulerer med
    static allUsers = Tools.getAllUsers();
    static activeUser = Tools.getActiveUser()

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
    //useren i systemet, baseret på userens inputtede telefonnummer, da det er vores unikke-ID til useren.
    static getUser() {
        let enteredNumber = document.getElementById('enteredNumber').value.toString();
        for(let i = 0; i < this.allUsers.length; i++) {
            if (enteredNumber === this.allUsers[i]._tlfNumber) {
                return this.allUsers[i];
            }
        }
    };

    //Finder her hvad den indtastede users id er, så man kan manipulere Arrayet, i andre funktioner
    //f.eks. hvis man vil slette en specifik user eller gøre dem til admin
    static getUserIndex() {
        let enteredNumber = document.getElementById('enteredNumber').value.toString();
        for (let i = 0; i < this.allUsers.length; i++) {
            if (enteredNumber === this.allUsers[i]._tlfNumber) {
                return i;
            }
        }
    };

    //Man finder den user, som lige nu er Aktiv, dvs. den user som er logget ind (lægger i activeUser), og om den user
    //er admin eller user, derved også få tilgang til deres metoder, laver en instants af den klasse, som den aktive er
    // i pågældende situation.
    static getActiveUser() {
        let active = JSON.parse(localStorage.getItem('activeUser'));
        if(active == null){
            active = 'none';
            return active
        }
        let booking = active._booking;
        if(active.none === 'none' ){
            active = 'none';
        } else if (active._adminRights === 'true'){
            active = new Admin(active._firstName, active._lastName, active._tlfNumber, active._dateOfBirth, active._password, active._adminRights);
            active._booking = booking
        } else {
            active = new User(active._firstName, active._lastName, active._tlfNumber, active._dateOfBirth, active._password);
            active._booking = booking
        }
        return active
    };

    //skal bruges til at finde ud af, hvad den aktive users index er, så man kan manipulere arrayet
    //f.eks. hvis man booker et sæde, så skal den kunne smides op i Arrayet igen, så man beholder bookingen.
    static getActiveUserIndex() {
        let userNumber = this.activeUser._tlfNumber;

        for (let i = 0; i < this.allUsers.length; i++) {
            if (userNumber === this.allUsers[i]._tlfNumber) {
                return i;
            }
        }
    };
    //Bruges til at tjekke om man er Admin, denne bruges for at en ordinær User, kommer ind på Admin siden, vil de
    // blive sendt ud, hvis de prøver at bruge nogle funktioner.
    static checkAdminStatus(){
        if(this.activeUser._adminRights !== 'true'){
            window.location.href = 'Index.html';
            alert('Adgang nægtet')
        }
    }
    static getBookedSeats(){
        let seatsBooked = [];
        let DateChosen = sessionStorage.getItem('choosenDate');
        let filmChosen = sessionStorage.getItem('film');
        for(let j = 0; j < this.allUsers.length;j++){
            for(let i = 0; i < this.allUsers[j]._booking.length; i++){
                if(this.allUsers[j]._booking[i].date == DateChosen && this.allUsers[j]._booking[i].film == filmChosen )
                    for(let e = 0; e < this.allUsers[j]._booking[i].seats.length; e++){
                        seatsBooked.push(this.allUsers[j]._booking[i].seats[e])
                    }
            }
        }
        return seatsBooked
    }
    static getAge(Birthday){

        //finder både idags dato, og finder userindsat date her

        let today = new Date();
        let dateOfBirth = Birthday;
        var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
        var dt = new Date(dateOfBirth.replace(pattern,'$3-$2-$1'));

        //Bruger new date, så at user.dateOfbirth kommer i Dato format, så vi kan bruge de næste funktioner


        //sætter age i lige med idag årstal minus birthDate årstal og trækker dem fra hinanden

        let age = today.getFullYear() - dt.getFullYear();


        //sætter m lig med nuværende måned - fødselsdags måned

        let m = today.getMonth() - dt.getMonth();

        //Hvis 0 er større end M, har personen allerede haft fødselsdag, så behøves der ikke trækkes 1 fra.
        //Dog hvis m === 0 eller at idag's dag ikke er større end fødselsdags dagen, så minusser man age med 1
        // da personen ikke har nået at have haft fødselsdag

        if (m < 0 || (m === 0 && today.getDate() < dt.getDate())) {
            age - 1
        }
        return age
    }
    static hideButtons(){
        if (Tools.activeUser !== "none") {
            document.getElementById("logIn").style.display = "none";
            document.getElementById("signIn").style.display = "none";
            //HJÆLP HJÆLP HJÆLP
            //at alle elementer med Id logOut, får en click funktionen
            document.getElementById('logOut').addEventListener('click', function(){Tools.activeUser.signOut()});
        } else if (Tools.activeUser === "none" || localStorage.getItem('activeUser') == null) {
            document.getElementById('logOut').style.display = "none";}
        document.getElementById('logIn').addEventListener('click', function () {User.login()});
        if (Tools.activeUser._adminRights !== "true"){
            document.getElementById('Admin').style.display = "none";}
    };
}


//gør at hide buttons metoden kaldes når en side loader, så længe scriptet er tilknyttet. I vores tilfælde er det næsten alle sider.
window.onload = Tools.hideButtons();
