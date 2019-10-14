//det her er klassen, som vi skal bruge i vores user, med de tilsvarende funktioner
class user {
    constructor(password, name, tlfNumber, dateOfBirth, userID) {
        this.password = password;
        this.name = name;
        this.tlfNumber = tlfNumber;
        this.dateOfBirth = dateOfBirth;
        this.userID = userID;
    }
    function bookSeat(){};
    function cancelSeat(){};
    function logIn(){};
    function logOut(){};
    function checkMovies(){};
}