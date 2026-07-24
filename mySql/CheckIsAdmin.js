import { conn } from "../Config/mySql.js";
import { log } from "../Config/log.js"

export function CheckIsAdmin(nome) {
    conn.query(
        "SELECT is_admin FROM usuarios WHERE usuario = ?",
        [nome],
        (err, result) => {
            if (err) {
                log("MySql Error", );
            }

            if (result[0].is_admin == 0) {
                return false;
            } else {
                return true;
            }
        }
    )
}