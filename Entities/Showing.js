// Showingklassen oprettes så der kan laves showings for hver film
class Showing {
    constructor (Film_id, Datetime, hall_id)   {
        this.film = Film_id
        this.dateTime = Datetime
        this.hall = hall_id
    }
}