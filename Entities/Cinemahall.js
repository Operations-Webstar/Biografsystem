class Cinemahall {
    constructor(hall_id,hallName, rows, columns ) {
        this.hall_id = hall_id
        this.hallName = hallName
        this.rows = rows
        this.columns = columns
    }

    static hallArray(rows,columns) {
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