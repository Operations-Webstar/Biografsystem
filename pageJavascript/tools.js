class Tools{
    //Thomas: Utility functions, har lavet nogle forskellige metoder, som skal bruges til at få noget info ud af localstorage
    //så vi kan arbejde med dem i andre metoder osv.
    //Thomas: Man finder den user, som lige nu er Aktiv, dvs. den user som er logget ind (lægger i activeUser), og om den user
    //er admin eller user, derved også få tilgang til deres metoder, laver en instants af den klasse, som den aktive er
    // i pågældende situation.
        /*static activeUser = Tools.getActiveUser();
*/
        static getActiveUser() {
            let active = JSON.parse(sessionStorage.getItem('activeUser'));
            if(active == null){
                return active
            }
            if (active.userType === 'admin'){
                active = new Admin(active.firstName, active.lastName, active.tlfNumber, active.dateOfBirth);
                active.userType = 'admin'
            } else {
                active = new User(active.firstName, active.lastName, active.tlfNumber, active.dateOfBirth);
                active.userType = 'standard'
            }
            return active
        };


    //Thomas: Bruges til at tjekke om man er Admin, denne bruges for at en ordinær User, kommer ind på Admin siden, vil de
    // blive sendt ud, hvis de prøver at bruge nogle funktioner.
    static checkAdminStatus(){
        if(this.getActiveUser().userType !== 'admin'){
            window.location.href = 'Index.html';
            alert('Adgang nægtet')
        }
    }

    static getAge(Birthday){

        //Rasmus: finder både idags dato, og finder userindsat date her

        let today = new Date();
        let dateOfBirth = Birthday;
        var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
        var dt = new Date(dateOfBirth.replace(pattern,'$3-$2-$1'));

        //Rasmus: Bruger new date, så at user.dateOfbirth kommer i Dato format, så vi kan bruge de næste funktioner


        //Thomas: sætter age i lige med idag årstal minus birthDate årstal og trækker dem fra hinanden

        let age = today.getFullYear() - dt.getFullYear();


        //Thomas: sætter m lig med nuværende måned - fødselsdags måned

        let m = today.getMonth() - dt.getMonth();

        //Thomas: Hvis 0 er større end M, har personen allerede haft fødselsdag, så behøves der ikke trækkes 1 fra.
        //Dog hvis m === 0 eller at idag's dag ikke er større end fødselsdags dagen, så minusser man age med 1
        // da personen ikke har nået at have haft fødselsdag

        if (m < 0 || (m === 0 && today.getDate() < dt.getDate())) {
            age - 1
        }
        return age
    }
    static hideButtons(){
        let active = this.getActiveUser()
        if (active !== null) {
            document.getElementById("logIn").style.display = "none";
            document.getElementById("signIn").style.display = "none";
            //at alle elementer med Id logOut, får en click funktionen, nav baren er på alle sider undtagen
            document.getElementById('logOut').addEventListener('click', function(){User.signOut()});
            if (active.userType === "admin"){
                document.getElementById('Admin').style.display = 'block';}
        } else {
            document.getElementById('logOut').style.display = "none";
            document.getElementById('logIn').addEventListener('click', function () {
                User.login()
            })
            return
        }
    };
   
}



//gør at hide buttons metoden kaldes når en side loader, så længe scriptet er tilknyttet. I vores tilfælde er det næsten alle sider.
window.onload = Tools.hideButtons();
//console.log(Tools.activeUser)
