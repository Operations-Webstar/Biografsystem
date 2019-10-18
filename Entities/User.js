//det her er klassen, som vi skal bruge i vores user, med de tilsvarende funktioner
/*eslint-env browser*/
class user {
    constructor(firstName, lastName, tlfNumber, dateOfBirth, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.tlfNumber = tlfNumber;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
    }
    //function bookSeat(){};
    //function cancelSeat(){};
    //function logIn(){};
    //function logOut(){};
    //function checkMovies(){};
}
 function createUser() {
     let form_valid =true;
     let validation_message ="";

     let firstName = document.getElementById('firstName').value;
     let lastName = document.getElementById('lastName').value;
     let phone = document.getElementById('phoneNumber').value;
     let birthday = new Date(document.getElementById('bday').value);
     let password = document.getElementById('password').value;

     if (firstName == null || firstName=="") {
         validation_message += "First name must be filled in! \n";
         form_valid = false;
     }

     if (lastName == null || lastName=="") {
         validation_message += "Last name must be filled in! \n";
         form_valid = false;
     }



     if (phone == ""){
         validation_message += "Please enter a phone number \n"
         form_valid = false;
     } else if (isNaN(phone) ) {
         validation_message += "Phone numbers can only contain numbers! \n"
         form_valid = false
     } else if (phone.length!=8){
         validation_message += "Phone numbers can only have a length of 8 \n"
         form_valid = false;
     }


     console.log(birthday);
     console.log(birthday==new Date());
     if(birthday == 'Invalid Date') {

         validation_message += "insert a real date\n"
         form_valid = false;
     }
     debugger

     if ((password == null || password=="") && password.length < 3) {
         validation_message += "your password must be longer than 3 characters \n";
         form_valid = false;
     }

     if (form_valid == false) {
         alert(validation_message);
     } else {

         alert("Hi " + name
             + "\nRating: " + userRating
             + "\nOrganization: " + org
             + "\nPhone: " + phone
             + "\nEmail: " + email
             + "\nYour Comment: " + addCom
             + "\nYour requested date to be contacted: " + fullDate); }
 }





let Thomas = new user('Thomas', 'Thomas', 1, '1996-02-19', 1);




