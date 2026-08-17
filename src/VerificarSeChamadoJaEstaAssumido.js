import { log } from "../Config/log.js";
import { conn } from "../Config/mySql.js";

export async function VerificarSeChamadoJaEstaAssumido(id) {
    const [rows] = await conn
        .promise()
        .query(
            "SELECT Tecnico_Respo FROM Calls WHERE id = ?", 
            [id]
        );

    if (rows[0].Tecnico_Respo === null) {
        return false;
    } else {
        return true;
    }
}