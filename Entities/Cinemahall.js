class Cinemahall {
    constructor(hall_id,rows, columns ) {
        this.hall_id = hall_ida
        this.rows = rows
        this.columns = columns
    }

    static  hallArray(rows,columns) {
        const hallSeats = []
        for (let i = 0; i<rows;i++) {
            hallSeats[i] = []
            for(let j = 0; j<columns;j++){
                hallSeats[i][j] = null
            }
        }
        return hallSeats;
    }
}
