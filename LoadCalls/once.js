import { log } from "../Config/log.js";
import { conn } from "../Config/mySql.js";

export function oncePersonCalls (usuario) {
    conn.query(
        `SELECT * FROM Calls WHERE Usuario = ?`,
        [usuario],
        (err, result) => {
            if (err) {
                log("MySql Error", err);
            }

            console.log(result) 
        }
    )
}