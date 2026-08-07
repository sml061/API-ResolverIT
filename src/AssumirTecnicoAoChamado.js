import { log } from "../Config/log.js";
import { conn } from "../Config/mySql.js";
import { CheckIsAdmin } from "../mySql/CheckIsAdmin.js";

export function AssumirChamado (idChamado, Responsavel) {
    conn.query(
        "UPDATE Calls SET Tecnico_Respo = ? WHERE ID = ?",
        [Responsavel, idChamado],
        (err, result) => {
            if (err) {
                log("MySql Error", err);
            }
    }
);
}